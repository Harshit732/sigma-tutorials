import { getGooglePending } from "@/lib/auth";

export default function handler(req, res) {
  const pending = getGooglePending(req);
  if (!pending) {
    return res.status(200).json({ pending: null });
  }
  return res.status(200).json({
    pending: {
      email: pending.email,
      firstName: pending.firstName,
      lastName: pending.lastName,
    },
  });
}
