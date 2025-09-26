import axios from "axios";
import ApiError from "./ApiError.js";
const fetchApi = async (url, { method = "GET", params = {}, body = {}, headers = {} }) => {
    const response = await axios({
        url,
        method,
        params,
        data: body,
        headers
    });
    const result = response.data;
    if (response.status < 200 || response.status >= 300) {
        throw new ApiError(result.status, result.title, result.message, result.stack);
    }
    return result;
};
export default fetchApi;