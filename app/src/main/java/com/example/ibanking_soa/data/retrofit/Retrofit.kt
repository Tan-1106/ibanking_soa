package com.example.ibanking_soa.data.retrofit

import android.content.Context
import com.example.ibanking_soa.data.api.OtpApi
import com.example.ibanking_soa.data.api.PaymentApi
import com.example.ibanking_soa.data.api.TuitionApi
import com.example.ibanking_soa.data.api.UserApi
import com.example.ibanking_soa.data.security.AuthInterceptor
import com.example.ibanking_soa.data.security.TokenAuthenticator
import com.google.gson.Gson
import kotlinx.serialization.Contextual
import okhttp3.OkHttpClient
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory


class RetrofitInstance (context: Context){
    private val sharedPreferences = context.getSharedPreferences("auth_preferences", Context.MODE_PRIVATE)
    private val retrofit by lazy {
        val client = OkHttpClient
            .Builder()
            .addInterceptor (AuthInterceptor(sharedPreferences =sharedPreferences ))
            .authenticator (TokenAuthenticator(sharedPreferences = sharedPreferences))
            .build()

        Retrofit.Builder()
            .baseUrl("http://10.72.239.178:4006/")
            .client(client)
            .addConverterFactory(GsonConverterFactory.create())
            .build()
    }
    val userApi: UserApi by lazy {
        retrofit.create(UserApi::class.java)
    }
    val tuitionApi: TuitionApi by lazy {
        retrofit.create(TuitionApi::class.java)
    }
    val paymentApi: PaymentApi by lazy {
        retrofit.create(PaymentApi::class.java)
    }
    val otpApi: OtpApi by lazy {
        retrofit.create(OtpApi::class.java)
    }
}



