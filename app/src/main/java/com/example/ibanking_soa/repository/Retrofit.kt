package com.example.ibanking_soa.repository

import android.util.Log
import com.example.ibanking_soa.dto.ListUserResponse
import com.example.ibanking_soa.dto.LoginRequest
import com.example.ibanking_soa.dto.LoginResponse
import com.example.ibanking_soa.uiState.TuitionFee
import retrofit2.converter.gson.GsonConverterFactory

class RetrofitInstance {
    private val retrofit by lazy {
        retrofit2.Retrofit.Builder()
            .baseUrl("http://192.168.1.52:4006/")
            .addConverterFactory(GsonConverterFactory.create())
            .build()
    }
    val userApi: UserApi by lazy {
        retrofit.create(UserApi::class.java)
    }
    val tuitionApi: TuitionApi by lazy {
        retrofit.create(TuitionApi::class.java)
    }
}
class UserRepository() {
    private val api = RetrofitInstance().userApi
    suspend fun getUsers() : ListUserResponse{
        return try {
            api.getUsers().data
        } catch (error: Exception) {
            ListUserResponse(emptyList())
        }
    }

    suspend fun login(loginRequest: LoginRequest): LoginResponse? {
        try {
            val response= api.login(loginRequest)
            Log.d("err","Response: $response")

            if(response.success){
                return response.data
            }
            else{
                Log.d("err", response.message)
                return null
            }

        }catch (error: Exception) {
            error.printStackTrace()
            return null
        }
    }
}
class  TuitionRepository() {
    private val api = RetrofitInstance().tuitionApi
    suspend fun getTuitionByStudentId(mssv: String) : TuitionFee?{
        return try {
            api.getTuitionByStudentId(mssv=mssv).data
        }
        catch (error: Exception) {
            error.printStackTrace()
            null
        }
    }
}

