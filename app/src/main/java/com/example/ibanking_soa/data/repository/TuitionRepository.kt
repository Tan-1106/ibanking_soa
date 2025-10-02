package com.example.ibanking_soa.data.repository

import com.example.ibanking_soa.data.dto.TuitionResponse
import com.example.ibanking_soa.data.retrofit.RetrofitInstance
import com.example.ibanking_soa.data.utils.ApiResult
import com.example.ibanking_soa.data.utils.safeApiCall

class TuitionRepository {
    private val api = RetrofitInstance().tuitionApi
    suspend fun getTuitionByStudentId(studentId: String): ApiResult<TuitionResponse> {
        return safeApiCall { api.getTuitionByStudentId(studentId) }
    }
}
