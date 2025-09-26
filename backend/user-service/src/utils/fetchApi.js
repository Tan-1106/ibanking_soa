import axios from "axios";
import ApiError from "./ApiError.js";
const fetchApi = async (url, { method = "GET", params = {}, body = {}, headers = {} }) => {
    try {

        const response = await axios({
            url,
            method,
            params,
            data: body,
            headers
        });
        const result = response.data;
        return result;
    } catch (error) {
        const data = error.response.data;

        throw new ApiError(data.status, data.title, data.message, data.stack);
    }
};
export default fetchApi;