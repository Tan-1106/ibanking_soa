package com.example.ibanking_soa.data.repository

import com.example.ibanking_soa.data.dto.ConfirmPaymentRequest
import com.example.ibanking_soa.data.dto.LoginRequest
import com.example.ibanking_soa.data.dto.LoginResponse
import com.example.ibanking_soa.data.retrofit.RetrofitInstance
import com.example.ibanking_soa.data.utils.ApiResult
import com.example.ibanking_soa.data.utils.safeApiCall
import com.example.ibanking_soa.uiState.Payment

class UserRepository {

    val token= com.example.ibanking_soa.ui.theme.token
    private val api = RetrofitInstance().userApi

    suspend fun login(loginRequest: LoginRequest): ApiResult<LoginResponse> {
        return safeApiCall { api.login(loginRequest) }
    }
    suspend fun confirmPayment(confirmPaymentRequest: ConfirmPaymentRequest): ApiResult<Payment> {
        return safeApiCall { api.confirmPayment(confirmPaymentRequest, token) }
    }
}
