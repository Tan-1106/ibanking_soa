package com.example.ibanking_soa.uiState

import java.math.BigDecimal
import java.time.LocalDateTime

data class AppUiState(
    val user: User = User(),
    val tuitionFee: TuitionFee = TuitionFee(),
    val payment: Payment = Payment(),
    val paymentHistory: List<PaymentHistoryItem> = testPaymentHistory,
    val selectedHistoryPayment: PaymentHistoryItem = PaymentHistoryItem(),
    val errorMessage:String = ""
)

data class User(
    val userId: String = "userId",
    val username: String = "username",
    val fullName: String = "fullName",
    val phoneNumber: String = "phoneNumber",
    val email: String = "email",
    val balance: BigDecimal = BigDecimal.ZERO
)

data class TuitionFee(
    val studentId: String = "studentId",
    val studentFullName: String = "studentFullName",
    val amount: BigDecimal = BigDecimal.ZERO,
    val content: String = "content"
)

data class Payment(
    val referenceCode: String = "RefCode",
    val beneficiaryAccount: String = "BeneficiaryAccount",
    val transferFee: BigDecimal = BigDecimal.ZERO,
    val total: BigDecimal = BigDecimal.ZERO
)

data class PaymentHistoryItem(
    val status: String = PaymentHistoryStatus.SUCCESS.status,
    val tuitionFee: TuitionFee = TuitionFee(),
    val payment: Payment = Payment(),
    val date: LocalDateTime = LocalDateTime.now()
)

enum class PaymentHistoryStatus(
    val status: String
) {
    PENDING("Pending"),
    SUCCESS("Success"),
    FAILED("Failed")
}

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

