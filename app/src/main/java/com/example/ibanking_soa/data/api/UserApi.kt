package com.example.ibanking_soa.data.api

import com.example.ibanking_soa.data.dto.ApiResponse
import com.example.ibanking_soa.data.dto.ConfirmPaymentRequest
import com.example.ibanking_soa.data.dto.LoginRequest
import com.example.ibanking_soa.data.dto.LoginResponse
import com.example.ibanking_soa.data.dto.RefreshTokenRequest
import com.example.ibanking_soa.data.dto.RefreshTokenResponse
import com.example.ibanking_soa.uiState.Payment
import com.example.ibanking_soa.uiState.User
import retrofit2.Call
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.Header
import retrofit2.http.POST

interface UserApi {
    @POST("/user-service/users/login")
    suspend fun login(
        @Body request: LoginRequest
    ): Response<ApiResponse<LoginResponse>>
    @GET("/user-service/users/me")
    suspend fun getMe(): Response<ApiResponse<User>>
    @POST("/user-service/users/refresh")
     fun refreshToken(
        @Body request: RefreshTokenRequest
    ): Call<ApiResponse<RefreshTokenResponse>>
    @POST("/user-service/users/confirm-payment")
    suspend fun confirmPayment(
        @Body confirmPaymentRequest: ConfirmPaymentRequest,
    ): Response<ApiResponse<Payment>>
}