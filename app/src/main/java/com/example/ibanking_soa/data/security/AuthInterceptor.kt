package com.example.ibanking_soa.data.security

import android.content.SharedPreferences
import jakarta.inject.Inject
import jakarta.inject.Singleton
import okhttp3.Interceptor

@Singleton
class AuthInterceptor @Inject constructor(val sharedPreferences: SharedPreferences): Interceptor {
    override fun intercept(chain: Interceptor.Chain): okhttp3.Response {
        val token = sharedPreferences.getString("access", null)
        val request = chain.request().newBuilder().apply {
            if (token != null) {
                header("Authorization", "Bearer $token")
            }
        }.build()
        return chain.proceed(request)
    }
}