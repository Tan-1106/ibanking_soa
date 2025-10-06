package com.example.ibanking_soa

import android.app.Application
import com.example.ibanking_soa.data.retrofit.RetrofitInstance

class MyApplication: Application() {
    companion object {
        lateinit var retrofitInstance: RetrofitInstance
            private set
    }
    override fun onCreate() {
        super.onCreate()
        retrofitInstance = RetrofitInstance(this)
    }
}