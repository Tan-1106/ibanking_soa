package com.example.ibanking_soa.data.security

import android.content.SharedPreferences
import androidx.core.content.edit
import com.example.ibanking_soa.data.api.UserApi
import com.example.ibanking_soa.data.dto.RefreshTokenRequest
import com.example.ibanking_soa.data.dto.RefreshTokenResponse
import jakarta.inject.Inject
import jakarta.inject.Named
import jakarta.inject.Singleton
import okhttp3.Authenticator
import okhttp3.Request
import okhttp3.Response
import okhttp3.Route
import retrofit2.Retrofit

@Singleton
class TokenAuthenticator @Inject constructor(val sharedPreferences: SharedPreferences,@Named("NonAuthRetrofit")  val retrofit: Retrofit) : Authenticator {
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
        val response = retrofit.create(UserApi::class.java)
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
