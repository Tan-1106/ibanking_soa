package com.example.ibanking_soa.response

import com.example.ibanking_soa.dtos.UserDTO

data class UserResponse(
    val data : UserDTO
)
data class  ListUserResponse(
    val data : List<UserDTO>
)
data class LoginResponse(
    val message: String,
    val token: String,
)
