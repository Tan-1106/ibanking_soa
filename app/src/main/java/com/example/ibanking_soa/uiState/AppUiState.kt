package com.example.ibanking_soa.uiState

import java.math.BigDecimal

data class AppUiState(
    val user: User = User(),
    val tuitionFee: TuitionFee = TuitionFee(),
    val payment: Payment = Payment(),
    val erorMessage:String = ""
)

data class User(
    val userId: String = "",
    val username: String = "",
    val fullName: String = "Nguyen Van A",
    val phoneNumber: String = "0123 456 789",
    val email: String = "nva.example@gmail.com",
    val balance: BigDecimal = BigDecimal(50000000)
)

data class TuitionFee(
    val studentId: String = "5220000001",
    val studentFullName: String = "Nguyen Van A",
    val amount: BigDecimal = BigDecimal(20000000),
    val content: String = "5220000001_TUITION_S1Y26"
)

data class Payment(
    val referenceCode: String = "RND_PAYMENT_CODE",
    val beneficiaryAccount: String = "9876543210",
    val transferFee: BigDecimal = BigDecimal(0),
    val total: BigDecimal = BigDecimal(0)
)

