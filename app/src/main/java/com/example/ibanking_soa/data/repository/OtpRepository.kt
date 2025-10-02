package com.example.ibanking_soa.data.repository

import com.example.ibanking_soa.data.dto.SendOtpRequest
import com.example.ibanking_soa.data.retrofit.RetrofitInstance
import com.example.ibanking_soa.data.utils.ApiResult
import com.example.ibanking_soa.data.utils.safeApiCall

class OtpRepository {
    val token = com.example.ibanking_soa.ui.theme.token
    private val api = RetrofitInstance().otpApi
    suspend fun sendOtp(paymentId: Int): ApiResult<Boolean> {
        return safeApiCall { api.sendOtp(data=SendOtpRequest(paymentId), token =token ) }
    }
}