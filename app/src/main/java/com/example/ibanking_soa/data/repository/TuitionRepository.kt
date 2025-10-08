package com.example.ibanking_soa.data.repository

import com.example.ibanking_soa.data.api.TuitionApi
import com.example.ibanking_soa.data.dto.TuitionResponse
import com.example.ibanking_soa.data.utils.ApiResult
import com.example.ibanking_soa.data.utils.safeApiCall
import jakarta.inject.Inject

class TuitionRepository @Inject constructor(private val api: TuitionApi) {
    suspend fun getTuitionByStudentId(studentId: String): ApiResult<TuitionResponse> {
        return safeApiCall { api.getTuitionByStudentId(studentId) }
    }
}
