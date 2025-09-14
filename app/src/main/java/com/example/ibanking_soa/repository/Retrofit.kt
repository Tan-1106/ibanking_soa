package com.example.ibanking_soa.repository

import com.example.ibanking_soa.dtos.UserDTO
import com.example.ibanking_soa.response.ListUserResponse
import com.example.ibanking_soa.response.LoginRequest
import com.example.ibanking_soa.response.LoginResponse
import retrofit2.converter.gson.GsonConverterFactory

class RetrofitInstance {
    private val retrofit by lazy {
        retrofit2.Retrofit.Builder()
            .baseUrl("http://localhost:4006/")
            .addConverterFactory(GsonConverterFactory.create())
            .build()
    }
    val userApi: UserApi by lazy {
        retrofit.create(UserApi::class.java)
    }
}
class UserRepository() {
    private val api = RetrofitInstance().userApi
    suspend fun getUsers() : ListUserResponse{
        return try {
            api.getUsers().data
        }
        catch (error: Exception) {
            emptyList()
        }
    }

    suspend fun getUser() : UserDTO? {
        return try {
            api.getUser().data
        } catch (error: Exception) {
            null
        }
    }
    suspend fun login(request: LoginRequest) : LoginResponse {
        return api.login(request)
    }
}
