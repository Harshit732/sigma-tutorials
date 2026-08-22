import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { getTokenFromReq, verifyToken } from "@/lib/auth";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "1mb",
    },
  },
};

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

  const { image } = req.body || {};
  if (!image || typeof image !== "string" || !image.startsWith("data:image/")) {
    return res.status(400).json({ error: "A valid image is required." });
  }
  // Client compresses to ~250KB before upload; this is a generous backstop
  // (base64 inflates ~33%, so ~350KB decoded) against anything that slips
  // through uncompressed.
  if (image.length > 500 * 1024) {
    return res.status(400).json({ error: "Image is too large. Please use a smaller photo." });
  }

  try {
    await dbConnect();
    const user = await User.findByIdAndUpdate(
      payload.id,
      { profilePicture: image },
      { new: true }
    ).select("-passwordHash");

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    return res.status(200).json({ user });
  } catch (err) {
    console.error("Profile picture upload error:", err);
    return res.status(500).json({ error: "Something went wrong." });
  }
}
