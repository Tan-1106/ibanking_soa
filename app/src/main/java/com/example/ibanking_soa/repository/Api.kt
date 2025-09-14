package com.example.ibanking_soa.repository

import com.example.ibanking_soa.response.ApiResponse
import com.example.ibanking_soa.response.ListUserResponse
import com.example.ibanking_soa.response.LoginRequest
import com.example.ibanking_soa.response.LoginResponse
import com.example.ibanking_soa.response.UserResponse
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
    suspend fun getTuitionByStudentId(mssv: String): ApiResponse<TuitionFee>
}


