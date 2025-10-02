package com.example.ibanking_soa.data.api

import com.example.ibanking_soa.data.dto.ApiResponse
import com.example.ibanking_soa.data.dto.TuitionResponse
import retrofit2.Response
import retrofit2.http.GET
import retrofit2.http.Path


interface TuitionApi {
    @GET("/student-service/students/tuition/{studentId}")
    suspend fun getTuitionByStudentId(
        @Path("studentId") studentId: String
    ): Response<ApiResponse<TuitionResponse>>
}
