package com.example.ibanking_soa.data.repository

import com.example.ibanking_soa.MyApplication
import com.example.ibanking_soa.data.dto.SendOtpRequest
import com.example.ibanking_soa.data.retrofit.RetrofitInstance
import com.example.ibanking_soa.data.utils.ApiResult
import com.example.ibanking_soa.data.utils.safeApiCall

class OtpRepository {
    private val api = MyApplication.retrofitInstance.otpApi
    suspend fun sendOtp(paymentId: Int): ApiResult<Boolean> {
        return safeApiCall { api.sendOtp(data=SendOtpRequest(paymentId)) }
    }
}