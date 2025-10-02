package com.example.ibanking_soa.data.repository

import android.util.Log
import androidx.compose.ui.res.stringResource
import com.example.ibanking_soa.R
import com.example.ibanking_soa.data.dto.PaymentRequest
import com.example.ibanking_soa.data.retrofit.RetrofitInstance
import com.example.ibanking_soa.data.utils.ApiResult
import com.example.ibanking_soa.data.utils.safeApiCall
import com.example.ibanking_soa.uiState.Payment

class PaymentRepository {
    val token= com.example.ibanking_soa.ui.theme.token
    private val api = RetrofitInstance().paymentApi
    suspend fun isInTransaction(studentId: String): ApiResult<Payment?> {

        return safeApiCall {
            api.isInTransaction(
                 studentId = studentId,
                token = token

            )
        }
    }
    suspend fun createPayment(studentId: String): ApiResult<Payment?> {
        return safeApiCall {
            api.createPayment(
                token = token,
                paymentRequest = PaymentRequest(studentId = studentId)
            )
        }
    }
}