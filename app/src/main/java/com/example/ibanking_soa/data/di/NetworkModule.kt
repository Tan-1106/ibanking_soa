package com.example.ibanking_soa.data.di

import android.content.Context
import android.content.SharedPreferences
import com.example.ibanking_soa.data.api.OtpApi
import com.example.ibanking_soa.data.api.PaymentApi
import com.example.ibanking_soa.data.api.TuitionApi
import com.example.ibanking_soa.data.api.UserApi
import com.example.ibanking_soa.data.security.AuthInterceptor
import com.example.ibanking_soa.data.security.TokenAuthenticator
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.android.qualifiers.ApplicationContext
import dagger.hilt.components.SingletonComponent
import jakarta.inject.Named
import okhttp3.OkHttpClient
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import javax.inject.Singleton

@Module
@InstallIn(SingletonComponent::class)
object NetworkModule {
    @Singleton
    @Provides
    fun provideSharedPreferences(@ApplicationContext context: Context): SharedPreferences {
        return context.getSharedPreferences("auth_preferences", Context.MODE_PRIVATE)
    }

    @Singleton
    @Provides
    fun provideOkHttpClient(
        interceptor: AuthInterceptor,
        authenticator: TokenAuthenticator
    ): OkHttpClient {
        return OkHttpClient
            .Builder()
            .addInterceptor(interceptor)
            .authenticator(authenticator)
            .build()
    }

    @Singleton
    @Provides
    @Named("AuthRetrofit")
    fun provideAuthRetrofitInstance(
        @ApplicationContext context: Context,
        sharedPreferences: SharedPreferences,
        okHttpClient: OkHttpClient
    ): Retrofit {

        return Retrofit.Builder()
            .baseUrl("http://10.72.239.178:4006/")
            .client(okHttpClient)
            .addConverterFactory(GsonConverterFactory.create())
            .build()
    }

    @Singleton
    @Provides
    @Named("NonAuthRetrofit")
    fun provideNonAuthRetrofitInstance(
        @ApplicationContext context: Context,
        sharedPreferences: SharedPreferences
    ): Retrofit {

        return Retrofit.Builder()
            .baseUrl("http://10.72.239.178:4006/")
            .addConverterFactory(GsonConverterFactory.create())
            .build()
    }

    @Singleton
    @Provides
    fun provideUserApi(@Named("AuthRetrofit") retrofit: Retrofit): UserApi {
        return retrofit.create(UserApi::class.java)
    }

    @Singleton
    @Provides
    fun provideTuitionApi(@Named("AuthRetrofit") retrofit: Retrofit): TuitionApi {
        return retrofit.create(TuitionApi::class.java)
    }

    @Singleton
    @Provides
    fun providePaymentApi(@Named("AuthRetrofit") retrofit: Retrofit): PaymentApi {
        return retrofit.create(PaymentApi::class.java)
    }

    @Singleton
    @Provides
    fun provideOtpApi(@Named("AuthRetrofit") retrofit: Retrofit): OtpApi {
        return retrofit.create(OtpApi::class.java)
    }
}



