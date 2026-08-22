import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { getTokenFromReq, verifyToken } from "@/lib/auth";
import {
  QUESTIONS_PER_MOCK,
  ERROR_CODES,
  MENTOR_ALERT_SINGLE_THRESHOLD,
  MENTOR_ALERT_COMBINED_THRESHOLD,
} from "@/lib/errorCodes";

const VALID_CODES = new Set(ERROR_CODES.map((c) => c.code));

function validateAnswers(answers) {
  if (!Array.isArray(answers) || answers.length !== QUESTIONS_PER_MOCK) {
    return { valid: false, missing: [] };
  }
  const seen = new Set();
  for (const a of answers) {
    if (!a || !Number.isInteger(a.q) || a.q < 1 || a.q > QUESTIONS_PER_MOCK) {
      return { valid: false, missing: [] };
    }
    if (a.right === true) {
      if (a.code) return { valid: false, missing: [] };
    } else if (a.right === false) {
      if (!VALID_CODES.has(a.code)) return { valid: false, missing: [] };
    } else {
      return { valid: false, missing: [] };
    }
    seen.add(a.q);
  }
  const missing = [];
  for (let q = 1; q <= QUESTIONS_PER_MOCK; q++) {
    if (!seen.has(q)) missing.push(q);
  }
  return { valid: missing.length === 0, missing };
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method not allowed" });
  }

  const token = getTokenFromReq(req);
  const payload = token && verifyToken(token);
  if (!payload) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { mockNumber, answers } = req.body || {};
  if (!Number.isInteger(mockNumber) || mockNumber < 1) {
    return res.status(400).json({ error: "A valid mock number is required." });
  }
  const { valid, missing } = validateAnswers(answers);
  if (!valid) {
    return res.status(400).json({ error: "All 120 questions must be answered before submitting.", missing });
  }

  try {
    await dbConnect();

    const current = await User.findOne(
      { _id: payload.id, "mocks.number": mockNumber },
      { "mocks.$": 1 }
    );
    if (!current || !current.mocks?.[0]) {
      return res.status(404).json({ error: "Mock not found." });
    }
    if (current.mocks[0].status === "pending") {
      return res.status(409).json({ error: "Upload the OMR photo before submitting the checklist." });
    }
    if (current.mocks[0].status === "analyzed") {
      return res.status(409).json({ error: "This mock has already been analyzed." });
    }

    const counts = Object.fromEntries(ERROR_CODES.map((c) => [c.code, 0]));
    for (const a of answers) if (a.code) counts[a.code]++;

    const combined = counts.E + counts.F;
    const triggered =
      counts.E >= MENTOR_ALERT_SINGLE_THRESHOLD ||
      counts.F >= MENTOR_ALERT_SINGLE_THRESHOLD ||
      combined >= MENTOR_ALERT_COMBINED_THRESHOLD;
    const reason = triggered
      ? `${counts.E} Ego Sink + ${counts.F} Fatigue Drop (${combined} combined) out of ${answers.length}`
      : "";

    const user = await User.findOneAndUpdate(
      { _id: payload.id, "mocks.number": mockNumber },
      {
        $set: {
          "mocks.$[elem].answers": answers,
          "mocks.$[elem].status": "analyzed",
          "mocks.$[elem].analyzedAt": new Date(),
          "mocks.$[elem].mentorAlert": { triggered, reason },
        },
      },
      { new: true, arrayFilters: [{ "elem.number": mockNumber }], runValidators: true }
    ).select("-passwordHash");

    return res.status(200).json({ user });
  } catch (err) {
    console.error("Mock checklist submission error:", err);
    return res.status(500).json({ error: "Something went wrong." });
  }
}
