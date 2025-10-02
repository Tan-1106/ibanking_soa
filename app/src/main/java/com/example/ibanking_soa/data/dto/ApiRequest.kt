package com.example.ibanking_soa.data.dto

data class LoginRequest(
    val email: String,
    val password: String
)

data class ConfirmPaymentRequest(
    val paymentId: Int,
    val otp: String
)

data class  PaymentRequest(
    val studentId: String,
)
data class SendOtpRequest(
    val paymentId: Int
)
