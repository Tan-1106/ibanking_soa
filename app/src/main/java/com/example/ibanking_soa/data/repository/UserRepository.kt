package com.example.ibanking_soa.data.repository

import com.example.ibanking_soa.data.api.UserApi
import com.example.ibanking_soa.data.dto.ConfirmPaymentRequest
import com.example.ibanking_soa.data.dto.LoginRequest
import com.example.ibanking_soa.data.dto.LoginResponse
import com.example.ibanking_soa.data.utils.ApiResult
import com.example.ibanking_soa.data.utils.safeApiCall
import com.example.ibanking_soa.uiState.Payment
import com.example.ibanking_soa.uiState.User
import jakarta.inject.Inject

class UserRepository @Inject constructor(private val api: UserApi) {

    suspend fun login(loginRequest: LoginRequest): ApiResult<LoginResponse> {
        return safeApiCall { api.login(loginRequest) }
    }
    suspend fun confirmPayment(confirmPaymentRequest: ConfirmPaymentRequest): ApiResult<Payment> {
        return safeApiCall { api.confirmPayment(confirmPaymentRequest) }
    }
    suspend fun getMyInformation():ApiResult<User> {
        return safeApiCall { api.getMe() }
    }
}
