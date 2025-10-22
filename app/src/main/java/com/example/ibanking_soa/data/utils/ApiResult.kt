package com.example.ibanking_soa.data.utils

sealed class ApiResult<out T>{
    data class Success<out T>(val data: T): ApiResult<T>()
    data class Error(val message: String): ApiResult<Nothing>()
}