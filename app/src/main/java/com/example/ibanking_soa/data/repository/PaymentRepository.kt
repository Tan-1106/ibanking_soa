package com.example.ibanking_soa.data.repository

import android.util.Log
import androidx.compose.ui.res.stringResource
import com.example.ibanking_soa.MyApplication
import com.example.ibanking_soa.R
import com.example.ibanking_soa.data.dto.PaymentRequest
import com.example.ibanking_soa.data.retrofit.RetrofitInstance
import com.example.ibanking_soa.data.utils.ApiResult
import com.example.ibanking_soa.data.utils.safeApiCall
import com.example.ibanking_soa.uiState.Payment

class PaymentRepository {
    private val api = MyApplication.retrofitInstance.paymentApi
    suspend fun isInTransaction(studentId: String): ApiResult<Payment?> {

        return safeApiCall {
            api.isInTransaction(
                 studentId = studentId,
            )
        }
    }
    suspend fun createPayment(studentId: String): ApiResult<Payment?> {
        return safeApiCall {
            api.createPayment(
                paymentRequest = PaymentRequest(studentId = studentId)
            )
        }
    }
    suspend fun getPaymentHistories(): ApiResult<List<Payment>> {
        return safeApiCall {
            api.getPaymentHistories()
        }
    }
}