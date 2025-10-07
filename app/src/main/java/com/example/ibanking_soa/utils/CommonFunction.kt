package com.example.ibanking_soa.utils

import java.time.OffsetDateTime
import java.time.format.DateTimeFormatter

fun  formatterDate(date: String?): String {
    val formatter = DateTimeFormatter.ofPattern("HH:mm:ss | yyyy-MM-dd")
    return date?.let { OffsetDateTime.parse(date).format(formatter) }?:""
}