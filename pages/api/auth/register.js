import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { signToken, setAuthCookie } from "@/lib/auth";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[0-9+\-\s()]{7,20}$/;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { firstName, lastName, email, phone, dob, password } = req.body || {};

  if (!firstName || !lastName || !email || !phone || !dob || !password) {
    return res.status(400).json({ error: "All fields are required." });
  }
  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ error: "Enter a valid email address." });
  }
  if (!PHONE_RE.test(phone)) {
    return res.status(400).json({ error: "Enter a valid phone number." });
  }
  const dobDate = new Date(dob);
  if (Number.isNaN(dobDate.getTime()) || dobDate > new Date()) {
    return res.status(400).json({ error: "Enter a valid date of birth." });
  }
  if (String(password).length < 8) {
    return res.status(400).json({ error: "Password must be at least 8 characters." });
  }

  try {
    await dbConnect();

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ error: "An account with this email already exists." });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      email: email.toLowerCase(),
      phone,
      dob: dobDate,
      passwordHash,
    });

    const token = signToken({ id: user._id.toString() });
    setAuthCookie(res, token);

    return res.status(201).json({
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        dob: user.dob,
      },
    });
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }
}
