import jwt from "jsonwebtoken";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { signToken, setAuthCookie, setGooglePendingCookie } from "@/lib/auth";

function getBaseUrl(req) {
  const proto = req.headers["x-forwarded-proto"] || "http";
  return `${proto}://${req.headers.host}`;
}

export default async function handler(req, res) {
  const { code, error } = req.query;
  if (error || !code) {
    return res.redirect("/login?error=google");
  }

  try {
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: `${getBaseUrl(req)}/api/auth/callback/google`,
        grant_type: "authorization_code",
      }),
    });

    if (!tokenRes.ok) {
      return res.redirect("/login?error=google");
    }

    const { id_token } = await tokenRes.json();
    // Decoded, not re-verified: id_token came straight from Google's token
    // endpoint over a server-to-server HTTPS call authenticated with our
    // client secret, so its signature is already trustworthy here.
    const claims = jwt.decode(id_token);

    if (!claims?.email || !claims.email_verified) {
      return res.redirect("/login?error=google");
    }

    const email = claims.email.toLowerCase();
    await dbConnect();
    const user = await User.findOne({ email });

    if (!user) {
      setGooglePendingCookie(res, {
        googleId: claims.sub,
        email,
        firstName: claims.given_name || claims.name || "Student",
        lastName: claims.family_name || "",
      });
      return res.redirect("/register?google=1");
    }

    if (!user.googleId) {
      user.googleId = claims.sub;
      await user.save();
    }

    if (!user.approved) {
      return res.redirect("/login?error=pending");
    }

    const token = signToken({ id: user._id.toString() });
    setAuthCookie(res, token);
    return res.redirect("/dashboard");
  } catch (err) {
    console.error("Google OAuth callback error:", err);
    return res.redirect("/login?error=google");
  }
}
