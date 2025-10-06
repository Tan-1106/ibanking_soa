package com.example.ibanking_soa.data.api

import com.example.ibanking_soa.data.dto.ApiResponse
import com.example.ibanking_soa.data.dto.SendOtpRequest
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.Header
import retrofit2.http.POST

interface OtpApi {
    @POST("/otp-service/otps/send")
    suspend fun sendOtp(
        @Body data: SendOtpRequest,
    ): Response<ApiResponse<Boolean>>
}