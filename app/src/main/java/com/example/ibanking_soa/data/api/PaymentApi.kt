package com.example.ibanking_soa.data.api

import com.example.ibanking_soa.data.dto.ApiResponse
import com.example.ibanking_soa.data.dto.PaymentRequest
import com.example.ibanking_soa.uiState.Payment
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.Header
import retrofit2.http.POST
import retrofit2.http.Path

interface PaymentApi {

    @GET("/payment-service/payments/check-in-transaction/{studentId}")
    suspend fun isInTransaction(
        @Path("studentId") studentId: String,
    ): Response<ApiResponse<Payment>>
    @POST("/payment-service/payments")
    suspend fun createPayment(
        @Body paymentRequest: PaymentRequest
    ):Response<ApiResponse<Payment>>

    @GET("/payment-service/payments/histories")
    suspend fun getPaymentHistories(): Response<ApiResponse<List<Payment>>>

}