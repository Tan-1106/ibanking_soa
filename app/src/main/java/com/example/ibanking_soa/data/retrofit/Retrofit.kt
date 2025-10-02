package com.example.ibanking_soa.data.retrofit

import com.example.ibanking_soa.data.api.OtpApi
import com.example.ibanking_soa.data.api.PaymentApi
import com.example.ibanking_soa.data.api.TuitionApi
import com.example.ibanking_soa.data.api.UserApi
import com.google.gson.Gson
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

val gson = Gson()

class RetrofitInstance {
    private val retrofit by lazy {
        Retrofit.Builder()
            .baseUrl("http://10.72.239.178:4006/")
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



