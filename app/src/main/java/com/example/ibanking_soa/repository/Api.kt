package com.example.ibanking_soa.repository

import com.example.ibanking_soa.dto.ApiResponse
import com.example.ibanking_soa.dto.ListUserResponse
import com.example.ibanking_soa.dto.LoginRequest
import com.example.ibanking_soa.dto.LoginResponse
import com.example.ibanking_soa.dto.UserResponse
import com.example.ibanking_soa.uiState.TuitionFee
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.POST

interface UserApi{
    @GET("/user-service/users" )
    suspend fun getUsers(): ApiResponse<ListUserResponse>

    @GET("/user-service/users/{id}" )
    suspend fun getUser(): ApiResponse<UserResponse>

    @POST("/user-service/users/login")
    suspend fun login(
        @Body request: LoginRequest
    ): ApiResponse<LoginResponse>
}

interface TuitionApi{
    @GET("/<<url>>" )
    suspend fun getTuitionByStudentId(sID: String): ApiResponse<TuitionFee>
}


