package com.example.ibanking_soa.data.dto

import com.example.ibanking_soa.uiState.User
import java.math.BigDecimal

data class ApiResponse<T>(
    val success: Boolean,
    val status: Int,
    val message: String,
    val data: T
)

data class ErrorResponse(
    val message: String,
    val service: String,
    val stack: String,
    val status: Int,
    val success: Boolean,
    val title: String
)
data class UserResponse(
    val data: User
)

data class ListUserResponse(
    val data: List<User>
)

data class LoginResponse(
    val access:String,
    val refresh:String,
    val user: User
)
data class RefreshTokenResponse(
    val access:String,
    val refresh:String,
)
data class TuitionResponse(
    val isPayable: Boolean,
    val studentId: String,
    val fullName: String,
    val totalPending: BigDecimal,
)
