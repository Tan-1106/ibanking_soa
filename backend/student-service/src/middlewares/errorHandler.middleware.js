import ApiError from "../utils/ApiError.js";
const errorHandler = (err, req, res, next) => {
    if (err instanceof ApiError) {
        res.status(err.status || 500).json(err.json())
    }
    else {
        res.status(500).json({
            success: false,
            status: 500,
            title: "Internal Server Error",
            message: err.message,
            stack: err.stack
        });
    }
}
export default errorHandler;