package com.example.ibanking_soa.data.utils

import android.util.Log
import com.example.ibanking_soa.data.dto.ApiResponse
import com.example.ibanking_soa.data.dto.ErrorResponse
import com.google.gson.Gson
import retrofit2.Response


suspend fun <T> safeApiCall(apiCall: suspend () -> Response<ApiResponse<T>>): ApiResult<T> {
    return try {
        val response = apiCall()
        if (response.isSuccessful) {
            val apiResponse = response.body()
            if (apiResponse != null) {
                ApiResult.Success(apiResponse.data)
            } else {
                ApiResult.Error("Response body is null")
            }
        } else {
            response.errorBody()?.let {
                val errorResponse = Gson().fromJson(it.string(), ErrorResponse::class.java)
                var errorStr = "${errorResponse.message}: ${errorResponse.stack}, ${errorResponse.status}"
                Log.e("err", errorStr)
                ApiResult.Error(errorResponse.message)
            } ?: ApiResult.Error("Unknown error")
        }
    } catch (e: Exception) {
        e.printStackTrace()
        ApiResult.Error("Unexpected error: ${e.message}")
    }
}