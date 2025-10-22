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
import jakarta.inject.Named

class UserRepository @Inject constructor(
    @Named("AuthUser")private val authApi: UserApi,
    @Named("NonAuthUser")private val nonAuthApi: UserApi,
) {

    suspend fun login(loginRequest: LoginRequest): ApiResult<LoginResponse> {
        return safeApiCall { nonAuthApi.login(loginRequest) }
    }
    suspend fun confirmPayment(confirmPaymentRequest: ConfirmPaymentRequest): ApiResult<Payment> {
        return safeApiCall { authApi.confirmPayment(confirmPaymentRequest) }
    }
    suspend fun getMyInformation():ApiResult<User> {
        return safeApiCall { authApi.getMe() }
    }
}
