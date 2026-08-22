import jwt from "jsonwebtoken";
import { serialize, parse } from "cookie";

const JWT_SECRET = process.env.JWT_SECRET;
const COOKIE_NAME = "project101_token";
const GOOGLE_PENDING_COOKIE = "google_pending";

export function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

export function setAuthCookie(res, token) {
  const cookie = serialize(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  res.setHeader("Set-Cookie", cookie);
}

export function clearAuthCookie(res) {
  const cookie = serialize(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  res.setHeader("Set-Cookie", cookie);
}

export function getTokenFromReq(req) {
  const cookies = parse(req.headers.cookie || "");
  return cookies[COOKIE_NAME];
}

// Short-lived cookie bridging the Google OAuth callback to the
// "finish your profile" step (register.js needs phone/DOB before a User
// can be created), without trusting client-supplied identity claims.
export function setGooglePendingCookie(res, payload) {
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "10m" });
  const cookie = serialize(GOOGLE_PENDING_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 10,
  });
  res.setHeader("Set-Cookie", cookie);
}

export function getGooglePending(req) {
  const cookies = parse(req.headers.cookie || "");
  const token = cookies[GOOGLE_PENDING_COOKIE];
  if (!token) return null;
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}
