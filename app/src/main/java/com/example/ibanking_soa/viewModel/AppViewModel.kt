package com.example.ibanking_soa.viewModel

import android.content.Context
import android.content.SharedPreferences
import android.util.Log
import android.widget.Toast
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.core.content.edit
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import androidx.navigation.NavHostController
import com.example.ibanking_soa.Screens
import com.example.ibanking_soa.data.dto.ConfirmPaymentRequest
import com.example.ibanking_soa.data.dto.LoginRequest
import com.example.ibanking_soa.data.repository.OtpRepository
import com.example.ibanking_soa.data.repository.PaymentRepository
import com.example.ibanking_soa.data.repository.TuitionRepository
import com.example.ibanking_soa.data.repository.UserRepository
import com.example.ibanking_soa.data.utils.ApiResult
import com.example.ibanking_soa.uiState.AppUiState
import com.example.ibanking_soa.uiState.Payment
import com.example.ibanking_soa.uiState.PaymentHistoryItem
import com.example.ibanking_soa.uiState.TuitionFee
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch
import java.math.BigDecimal
import java.text.NumberFormat

class AppViewModel : ViewModel() {
    private val _uiState = MutableStateFlow(AppUiState())
    val uiState: StateFlow<AppUiState> = _uiState.asStateFlow()
    private val userRepository = UserRepository()
    private val tuitionRepository = TuitionRepository()
    private val paymentRepository = PaymentRepository()
    private val otpRepository = OtpRepository()

    // LOGIN SCREEN
    var usernameValue by mutableStateOf("")
        private set
    var passwordValue by mutableStateOf("")
        private set
    var isPasswordVisible by mutableStateOf(false)
        private set
    var isPasswordRemembered by mutableStateOf(false)
        private set
    var errorMessage by mutableStateOf("")
        private set

    private fun getSharedPrefs(context: Context): SharedPreferences {
//        val masterKey = MasterKey.Builder(context)
//            .setKeyScheme(MasterKey.KeyScheme.AES256_GCM)
//            .build()
//        val sharedPrefs = EncryptedSharedPreferences.create(
//            context, "soa_midterm_credentials", masterKey,
//            EncryptedSharedPreferences.PrefKeyEncryptionScheme.AES256_SIV,
//            EncryptedSharedPreferences.PrefValueEncryptionScheme.AES256_GCM
//        )

        return context.getSharedPreferences("auth_preferences", Context.MODE_PRIVATE)
    }

    fun clearUsername() {
        usernameValue = ""
    }

    fun clearPassword() {
        passwordValue = ""
    }

    fun onUsernameChange(newValue: String) {
        usernameValue = newValue
    }

    fun onPasswordChange(newValue: String) {
        passwordValue = newValue
    }

    fun onPasswordShowingIconClick() {
        isPasswordVisible = !isPasswordVisible
    }

    fun onRememberPasswordClick() {
        isPasswordRemembered = !isPasswordRemembered
    }

    fun login(
        context: Context,
        navController: NavHostController
    ) {
        _uiState.update {
            it.copy(isLogging = true)
        }
        errorMessage = ""
        val username = usernameValue
        val password = passwordValue
        val loginRequest = LoginRequest(username, password)
        viewModelScope.launch {
            try {
                val apiResult = userRepository.login(loginRequest)
                if (apiResult is ApiResult.Error) {
                    _uiState.update {
                        it.copy(isLogging = false)
                    }
                    errorMessage = apiResult.message
                    return@launch
                }
                val loginResponse = (apiResult as ApiResult.Success).data
                val userData = loginResponse.user
                _uiState.update {
                    it.copy(
                        user = userData,
                        isLogging = false
                    )
                }
                saveCredentials(username, password, context)
                getSharedPrefs(context).edit {
                    putString("access", loginResponse.access)
                    putString("refresh", loginResponse.refresh)
                }
                Log.d("err", "Token: ${getSharedPrefs(context).getString("token", "")}")
                Log.d("Login", "Login Response: $loginResponse")

                navController.navigate(Screens.TuitionFee.name) {
                    popUpTo(Screens.Login.name) { inclusive = true }
                }
            } catch (e: Exception) {
                errorMessage = e.message ?: ""
            }
        }

    }

    // CREDENTIALS
    fun loadUsernameAndPassword(context: Context) {
        val (savedUsername, savedPassword) = loadSavedCredentials(context)

        usernameValue = savedUsername
        passwordValue = savedPassword
        isPasswordRemembered = savedUsername.isNotEmpty()
    }

    private fun saveCredentials(
        identifier: String,
        password: String,
        context: Context
    ) {


        getSharedPrefs(context).edit {
            putString("username", identifier)
            putString("password", password)
        }
    }

    private fun loadSavedCredentials(context: Context): Pair<String, String> {
        return try {
            val sharedPrefs = getSharedPrefs(context)
            val identifier = sharedPrefs.getString("username", "") ?: ""
            val password = sharedPrefs.getString("password", "") ?: ""
            Pair(identifier, password)
        } catch (e: Exception) {
            Pair("", "")
        }
    }

    // TUITION FEE SCREEN
    var studentIdValue by mutableStateOf("")
        private set

    fun clearId() {
        studentIdValue = ""
    }

    fun onSearchStudentId(
        navController: NavHostController

    ) {
        _uiState.update {
            it.copy(isSearching = true)
        }
        viewModelScope.launch {
            val apiResultPayment = paymentRepository.isInTransaction(studentIdValue)
            when (apiResultPayment) {
                is ApiResult.Success -> {
                    if (apiResultPayment.data == null) {
                        val apiResultTuition =
                            tuitionRepository.getTuitionByStudentId(studentIdValue)
                        when (apiResultTuition) {
                            is ApiResult.Success -> {
                                if (apiResultTuition.data.totalPending > BigDecimal(0)) {

                                    _uiState.update {
                                        it.copy(
                                            isSearching = false,
                                            payable = apiResultTuition.data.isPayable,
                                            tuitionFee = TuitionFee(
                                                studentId = apiResultTuition.data.studentId,
                                                studentFullName = apiResultTuition.data.fullName,
                                                amount = apiResultTuition.data.totalPending
                                            ),
                                        )
                                    }
                                } else {
                                    _uiState.update {
                                        it.copy(
                                            isSearching = false,
                                            payable = false,

                                            )
                                    }
                                    errorMessage = "No tuition fee due for this student ID"
                                }
                            }

                            is ApiResult.Error -> {
                                _uiState.update {
                                    it.copy(
                                        isSearching = false,
                                        payable = false,
                                        tuitionFee = null
                                    )
                                }
                                studentIdValue=""
                                errorMessage = apiResultTuition.message
                            }
                        }


                    } else {
                        _uiState.update {
                            it.copy(
                                isSearching = false,
                                payable = false,
                                payment = apiResultPayment.data
                            )
                        }
                        navController.navigate(Screens.PaymentDetails.name)

                    }

                }

                is ApiResult.Error -> {
                    _uiState.update {
                        it.copy(
                            isSearching = false,
                            payable = false,
                            tuitionFee = null
                        )
                    }
                    errorMessage = apiResultPayment.message

                }

            }
        }
        Log.d("err", errorMessage)
    }

    fun onStudentIdChange(newValue: String) {
        studentIdValue = newValue
    }

    fun formatCurrency(value: BigDecimal): String {
        val formatter = NumberFormat.getInstance()
        return formatter.format(value)
    }

    fun processToPaymentInf(
        context: Context,
        navController: NavHostController
    ) {
        _uiState.update {
            it.copy(isCreatingPayment = true)
        }
        viewModelScope.launch {
            val apiResult = paymentRepository.createPayment(studentIdValue)
            when (apiResult) {
                is ApiResult.Success -> {
                    if (apiResult.data != null) {
                        _uiState.update {
                            it.copy(
                                isCreatingPayment = false,
                                payment = apiResult.data,
                                tuitionFee = null,
                                payable = false
                            )
                        }
                        navController.navigate(Screens.PaymentDetails.name)
                    } else {
                        _uiState.update {
                            it.copy(
                                isCreatingPayment = false,
                            )
                        }
                        Toast.makeText(context, "Failed to create payment", Toast.LENGTH_SHORT)
                            .show()
                    }
                }

                is ApiResult.Error -> {
                    _uiState.update {
                        it.copy(
                            isCreatingPayment = false,
                            payable = false
                        )
                    }
                    Toast.makeText(context, apiResult.message, Toast.LENGTH_SHORT).show()
                }
            }

        }
    }

    // OTP
    var isOtpBoxVisible by mutableStateOf(false)

    fun sendOTP(context: Context) {
        _uiState.update {
            it.copy(isSendingOtp = true)
        }
        viewModelScope.launch {
            val apiResult = otpRepository.sendOtp(_uiState.value.payment.id)
            if (apiResult is ApiResult.Error) {
                Toast.makeText(context, apiResult.message, Toast.LENGTH_SHORT).show()
                return@launch
            }
            val isSent = (apiResult as ApiResult.Success).data
            if (isSent) {
                Toast.makeText(context, "OTP Sent", Toast.LENGTH_SHORT).show()
                isOtpBoxVisible = true
                _uiState.update {
                    it.copy(isSendingOtp = false)
                }
            } else {
                Toast.makeText(context, "Failed to send OTP", Toast.LENGTH_SHORT).show()
            }
        }
    }


    fun onOtpDismiss() {
        isOtpBoxVisible = false

        // TODO: More BackEnd Logic
    }

    var otpValue by mutableStateOf("")
        private set

    fun onOtpChange(newValue: String, context: Context, navController: NavHostController) {
        otpValue = newValue
        if (otpValue.length == 6) {
            viewModelScope.launch {
                val apiResult = userRepository.confirmPayment(
                    ConfirmPaymentRequest(
                        otp = otpValue,
                        paymentId = _uiState.value.payment.id
                    )
                )
                when (apiResult) {
                    is ApiResult.Success -> {
                        _uiState.update {
                            it.copy(
                                payment = apiResult.data
                            )
                        }
                        isOtpBoxVisible = false
                        Toast.makeText(context, "Payment Successful", Toast.LENGTH_SHORT).show()
                        reloadUser(context,navController)
                        navController.navigate(Screens.PaymentSuccessful.name){
                            popUpTo(Screens.PaymentDetails.name) { inclusive = true }
                        }
                    }

                    is ApiResult.Error -> {
                        Toast.makeText(context, apiResult.message, Toast.LENGTH_SHORT).show()
                        otpValue = ""
                        return@launch
                    }
                }

            }

        }
    }

    // HISTORY
    fun onViewHistoryClick(
        navController: NavHostController
    ) {
        viewModelScope.launch {
            val apiResult = paymentRepository.getPaymentHistories()
            when (apiResult) {
                is ApiResult.Success -> {
                    _uiState.update {
                        it.copy(
                            paymentHistory = apiResult.data
                        )
                    }
                    Log.e("paymentHistories", apiResult.data.toString())
                    navController.navigate(Screens.HistoryList.name)

                }

                is ApiResult.Error -> {
                    Log.d("err", "Get Payment Histories Error: ${apiResult.message}")
                    _uiState.update {
                        it.copy(
                            paymentHistory = emptyList()
                        )
                    }
                }
            }
        }

    }

    // PAYMENT DETAILS
    fun onViewPaymentDetailsClick(
        selectedPayment: Payment,
        navController: NavHostController
    ) {
        _uiState.update {
            it.copy(
                selectedHistoryPayment = selectedPayment
            )
        }

        navController.navigate(Screens.HistoryDetails.name)
    }
    fun reloadUser(context: Context,navController: NavHostController) {
        viewModelScope.launch {
            val apiResult= userRepository.getMyInformation()
            when(apiResult){
                is ApiResult.Success -> {
                    _uiState.update {
                        it.copy(
                            user = apiResult.data
                        )
                    }
                }
                is ApiResult.Error -> {
                    Toast.makeText(context, "Session Expired", Toast.LENGTH_SHORT).show()
                    navController.navigate(Screens.Login.name)
                }
            }
        }
    }
}