package com.example.ibanking_soa.data.api

import com.example.ibanking_soa.data.dto.ApiResponse
import com.example.ibanking_soa.data.dto.ConfirmPaymentRequest
import com.example.ibanking_soa.data.dto.LoginRequest
import com.example.ibanking_soa.data.dto.LoginResponse
import com.example.ibanking_soa.uiState.Payment
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.Header
import retrofit2.http.POST

interface UserApi {
    @POST("/user-service/users/login")
    suspend fun login(
        @Body request: LoginRequest
    ): Response<ApiResponse<LoginResponse>>
    @POST("/user-service/users/confirm-payment")
    suspend fun confirmPayment(
        @Body confirmPaymentRequest: ConfirmPaymentRequest,
        @Header("Authorization") token: String
    ): Response<ApiResponse<Payment>>
}