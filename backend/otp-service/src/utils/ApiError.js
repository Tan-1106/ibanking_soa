class ApiError extends Error {
    constructor(status, title, message, stack = undefined) {
        super(message);
        this.title = title;
        this.status = status;
        this.service = "OTP-SERVICE";
        if (stack) {
            this.stack = stack + this.stack;
        }
    }
    json() {
        return {
            service: this.service,
            success: false,
            title: this.title,
            status: this.status,
            message: this.message,
            stack: this.stack
        }
    }
}
export default ApiError;
