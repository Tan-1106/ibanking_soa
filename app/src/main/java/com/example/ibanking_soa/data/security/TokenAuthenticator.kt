package com.example.ibanking_soa.data.security

import android.content.SharedPreferences
import androidx.core.content.edit
import com.example.ibanking_soa.MyApplication
import com.example.ibanking_soa.data.dto.RefreshTokenRequest
import com.example.ibanking_soa.data.dto.RefreshTokenResponse
import okhttp3.Authenticator
import okhttp3.Request
import okhttp3.Response
import okhttp3.Route

class TokenAuthenticator(val sharedPreferences: SharedPreferences) : Authenticator {
    override fun authenticate(route: Route?, response: Response): Request? {
        synchronized(this) {
            val refreshToken = sharedPreferences.getString("refresh", null) ?: return null
            val newTokenResponse = refreshAccessToken(refreshToken) ?: return null
            sharedPreferences.edit {
                putString("access", newTokenResponse.access)
                putString("refresh", newTokenResponse.refresh)
            }
            return response.request().newBuilder()
                .header("Authorization", "Bearer ${newTokenResponse.access}")
                .build()
        }
    }

    private fun refreshAccessToken(refreshToken: String): RefreshTokenResponse? {
        val response = MyApplication.retrofitInstance.userApi
            .refreshToken(request = RefreshTokenRequest(refreshToken))
            .execute()
        if (!response.isSuccessful) {
            return null
        }
        val apiResponse=response.body()
        if(apiResponse==null){
            return null
        }
        return apiResponse.data
    }

}
