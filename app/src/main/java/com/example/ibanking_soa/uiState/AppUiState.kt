package com.example.ibanking_soa.uiState

import com.example.ibanking_soa.data.dto.LoginResponse
import com.example.ibanking_soa.data.dto.TuitionResponse
import com.example.ibanking_soa.data.utils.ApiResult
import org.w3c.dom.Attr
import java.math.BigDecimal
import java.time.LocalDateTime

data class AppUiState(
    var isLogging: Boolean = false,
    var isSearching: Boolean = false,
    var isCreatingPayment: Boolean = false,
    var isSendingOtp: Boolean = false,
    var payable: Boolean = false,
    val user: User = User(),
    val tuitionFee: TuitionFee? = null,
    val payment: Payment = Payment(),
    val paymentHistory: List<Payment> = emptyList<Payment>(),
    val selectedHistoryPayment: Payment? = null,
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
)


data class Payment(
    val createdAt: String = "2025-09-30T11:58:46.000Z",
    val expiresAt: String = "2025-09-30T11:58:46.000Z",
    val id: Int = -1,
    val paidAt: String? = "2025-09-30T11:58:46.000Z",
    val paymentRef: String? = null,
    val status: String = "pending",
    val studentId: String = "52200076",
    val studentFullName: String="studentFullName",
    val totalAmount: BigDecimal = BigDecimal(0),
    val updatedAt: String = "2025-09-30T11:58:46.000Z",
    val userId: Int = -1
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
    PENDING("pending"),
    SUCCESS("completed"),
    FAILED("failed")
}

val testPaymentHistory: List<PaymentHistoryItem> = listOf(
    PaymentHistoryItem(
        payment = Payment(),
        date = LocalDateTime.of(2025, 9, 1, 14, 30, 0)
    ),
    PaymentHistoryItem(
        payment = Payment(),
        date = LocalDateTime.of(2025, 8, 15, 9, 0, 0)
    ),
    PaymentHistoryItem(
        payment = Payment(),
        date = LocalDateTime.of(2025, 7, 20, 19, 45, 0)
    )
)

