class ApiError extends Error {
    constructor(status, title, message) {
        super(message);
        this.title = title;
        this.status = status;
    }
    json() {
        return {
            success: false,
            title: this.title,
            status: this.status,
            message: this.message,
            stack: this.stack
        }
    }
}
export default ApiError;
