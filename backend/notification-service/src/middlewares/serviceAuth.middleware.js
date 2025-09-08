export default function serviceAuth(req, res, next) {
  const token = req.header("x-service-token") || (req.header("authorization") || "").replace("Bearer ", "");
  const expected = process.env.SERVICE_AUTH_TOKEN;

  if (!expected) {
    console.warn("[serviceAuth] SERVICE_AUTH_TOKEN not set — skipping check (not recommended)");
    return next();
  }

  if (!token || token !== expected) {
    return res.status(401).json({ ok: false, error: "Unauthorized: invalid service token" });
  }

  return next();
}