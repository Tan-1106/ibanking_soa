package com.example.ibanking_soa.uiState

import java.math.BigDecimal
import java.time.LocalDateTime

data class AppUiState(
    val user: User = User(),
    val tuitionFee: TuitionFee = TuitionFee(),
    val payment: Payment = Payment(),
    val paymentHistory: List<PaymentHistoryItem> = testPaymentHistory,
    val selectedPayment: PaymentHistoryItem = PaymentHistoryItem(),
    val errorMessage:String = ""
)

data class User(
    val userId: String = "",
    val username: String = "",
    val fullName: String = "",
    val phoneNumber: String = "",
    val email: String = "",
    val balance: BigDecimal = BigDecimal.ZERO
)

data class TuitionFee(
    val studentId: String = "",
    val studentFullName: String = "",
    val amount: BigDecimal = BigDecimal.ZERO,
    val content: String = "abcd"
)

data class Payment(
    val referenceCode: String = "abcd",
    val beneficiaryAccount: String = "abcd",
    val transferFee: BigDecimal = BigDecimal.ZERO,
    val total: BigDecimal = BigDecimal.ZERO
)

data class PaymentHistoryItem(
    val tuitionFee: TuitionFee = TuitionFee(),
    val payment: Payment = Payment(),
    val date: LocalDateTime = LocalDateTime.now()
)

val testPaymentHistory: List<PaymentHistoryItem> = listOf(
    PaymentHistoryItem(
        payment = Payment(
            referenceCode = "PAY20250901001",
            beneficiaryAccount = "9876543210",
            transferFee = BigDecimal(0),
            total = BigDecimal(5_000_000)
        ),
        date = LocalDateTime.of(2025, 9, 1, 14, 30, 0)
    ),
    PaymentHistoryItem(
        payment = Payment(
            referenceCode = "PAY20250815002",
            beneficiaryAccount = "9876543210",
            transferFee = BigDecimal(0),
            total = BigDecimal(10_000_000)
        ),
        date = LocalDateTime.of(2025, 8, 15, 9, 0, 0)
    ),
    PaymentHistoryItem(
        payment = Payment(
            referenceCode = "PAY20250720003",
            beneficiaryAccount = "9876543210",
            transferFee = BigDecimal(0),
            total = BigDecimal(3_000_000)
        ),
        date = LocalDateTime.of(2025, 7, 20, 19, 45, 0)
    )
)

