class ApiResponse {
    constructor(
        status, message, data
    ) {
        this.success = true;
        this.status = status;
        this.message = message;
        this.data = data;
    }
}
export default ApiResponse;