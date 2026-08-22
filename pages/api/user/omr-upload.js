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

  const { mockNumber, image } = req.body || {};
  if (!Number.isInteger(mockNumber) || mockNumber < 1) {
    return res.status(400).json({ error: "A valid mock number is required." });
  }
  if (!image || typeof image !== "string" || !image.startsWith("data:image/")) {
    return res.status(400).json({ error: "A valid image is required." });
  }
  // Same backstop as profile-picture.js: client compresses to ~250KB, this
  // just guards against anything that slips through uncompressed.
  if (image.length > 500 * 1024) {
    return res.status(400).json({ error: "Image is too large. Please use a smaller photo." });
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
    if (current.mocks[0].status === "analyzed") {
      return res.status(409).json({ error: "This mock has already been analyzed." });
    }

    const user = await User.findOneAndUpdate(
      { _id: payload.id, "mocks.number": mockNumber },
      {
        $set: {
          "mocks.$[elem].omrImage": image,
          "mocks.$[elem].status": "uploaded",
          "mocks.$[elem].uploadedAt": new Date(),
        },
      },
      { new: true, arrayFilters: [{ "elem.number": mockNumber }] }
    ).select("-passwordHash");

    return res.status(200).json({ user });
  } catch (err) {
    console.error("OMR upload error:", err);
    return res.status(500).json({ error: "Something went wrong." });
  }
}
