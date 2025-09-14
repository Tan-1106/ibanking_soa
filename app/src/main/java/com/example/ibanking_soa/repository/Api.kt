package com.example.ibanking_soa.repository

import com.example.ibanking_soa.response.ListUserResponse
import com.example.ibanking_soa.response.LoginRequest
import com.example.ibanking_soa.response.LoginResponse
import com.example.ibanking_soa.response.UserResponse
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.POST

interface UserApi{
    @GET("/users")
    suspend fun getUsers(): ListUserResponse
    @GET("/user/{id}" )
    suspend fun getUser(): UserResponse
    @POST("/user/login")
    suspend fun login(
        @Body request: LoginRequest
    ): LoginResponse
}

