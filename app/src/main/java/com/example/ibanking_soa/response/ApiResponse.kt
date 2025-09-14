package com.example.ibanking_soa.response

import com.example.ibanking_soa.uiState.User

data class ApiResponse<T>(
    val success: Boolean,
    val status: Int,
    val message: String,
    val data:T
)

data class UserResponse(
    val data: User
)

data class ListUserResponse(
    val data: List<User>
)

data class LoginResponse(
    val token: String,
    val user: User
)
