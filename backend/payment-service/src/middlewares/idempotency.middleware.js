// Simple in-memory idempotency key store (for demo, use Redis in production)
const idempotencyStore = new Map();

const idempotencyMiddleware = (req, res, next) => {
  const key = req.headers["idempotency-key"];
  if (!key) return next();

  if (idempotencyStore.has(key)) {
    return res.status(409).json({ message: "Duplicate request", result: idempotencyStore.get(key) });
  }

  // Capture response for future requests
  const originalJson = res.json.bind(res);
  res.json = (body) => {
    idempotencyStore.set(key, body);
    return originalJson(body);
  };

  next();
};

export default idempotencyMiddleware;