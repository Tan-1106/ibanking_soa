const SERVICE_TOKEN = process.env.SERVICE_TOKEN || "your_service_token";

const ServiceAuthMiddleware = (req, res, next) => {
  const token = req.headers["x-service-token"];
  if (!token || token !== SERVICE_TOKEN) {
    return res.status(403).json({ message: "Forbidden: Invalid service token" });
  }
  next();
};

export default ServiceAuthMiddleware;