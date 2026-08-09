import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { getTokenFromReq, verifyToken } from "@/lib/auth";

export default async function handler(req, res) {
  const token = getTokenFromReq(req);
  if (!token) {
    return res.status(200).json({ user: null });
  }

  const payload = verifyToken(token);
  if (!payload) {
    return res.status(200).json({ user: null });
  }

  try {
    await dbConnect();
    const user = await User.findById(payload.id).select("-passwordHash");
    if (!user) {
      return res.status(200).json({ user: null });
    }
    return res.status(200).json({ user });
  } catch (err) {
    console.error("Me error:", err);
    return res.status(200).json({ user: null });
  }
}
