import ApiError from "../utils/ApiError.js";

const validate = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body, { abortEarly: false });
    next();
  } catch (err) {
    throw new ApiError(400, "Validation error", err.errors.join(", "));
  }
};

export default validate;