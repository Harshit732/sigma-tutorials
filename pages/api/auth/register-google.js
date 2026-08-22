import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { getGooglePending } from "@/lib/auth";

// A "+" country code (1-3 digits) followed by exactly 10 digits, e.g. +919876543210.
const PHONE_RE = /^\+\d{1,3}\d{10}$/;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method not allowed" });
  }

  const pending = getGooglePending(req);
  if (!pending) {
    return res.status(400).json({ error: "Your Google sign-in session expired. Please try again." });
  }

  const { phone, dob } = req.body || {};
  if (!phone || !dob) {
    return res.status(400).json({ error: "Phone number and date of birth are required." });
  }
  if (!PHONE_RE.test(phone)) {
    return res.status(400).json({ error: "Enter a valid phone number." });
  }
  const dobDate = new Date(dob);
  if (Number.isNaN(dobDate.getTime()) || dobDate > new Date()) {
    return res.status(400).json({ error: "Enter a valid date of birth." });
  }

  try {
    await dbConnect();

    const existing = await User.findOne({ email: pending.email });
    if (existing) {
      return res.status(409).json({ error: "An account with this email already exists." });
    }

    await User.create({
      firstName: pending.firstName,
      lastName: pending.lastName,
      email: pending.email,
      phone,
      dob: dobDate,
      googleId: pending.googleId,
      approved: false,
    });

    return res.status(201).json({
      pending: true,
      message: "Registration submitted. You'll be able to sign in once an admin approves your account.",
    });
  } catch (err) {
    console.error("Google register error:", err);
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }
}
