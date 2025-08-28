package com.example.ibanking_soa.uiState

import java.math.BigDecimal

data class AppUiState(
    val user: User = User(),
    val tuitionFee: TuitionFee = TuitionFee()
)

data class User(
    val username: String = "",
    val fullName: String = "",
    val phoneNumber: String = "",
    val email: String = "",
    val balance: BigDecimal = BigDecimal(0)
)

data class TuitionFee(
    val studentId: String = "",
    val studentFullName: String = "",
    val tuitionFee: BigDecimal = BigDecimal(0)
)

