package com.example.ibanking_soa.viewModel

import android.content.Context
import android.util.Log
import android.widget.Toast
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.core.content.edit
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import androidx.navigation.NavHostController
import androidx.security.crypto.EncryptedSharedPreferences
import androidx.security.crypto.MasterKey
import com.example.ibanking_soa.Screens
import com.example.ibanking_soa.repository.UserRepository
import com.example.ibanking_soa.dto.LoginRequest
import com.example.ibanking_soa.dto.LoginResponse
import com.example.ibanking_soa.uiState.AppUiState
import com.example.ibanking_soa.uiState.PaymentHistoryItem
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
        errorMessage = ""
        val username = usernameValue
        val password = passwordValue
        val loginRequest = LoginRequest(username, password)
        viewModelScope.launch {
            val loginResponse: LoginResponse? = userRepository.login(loginRequest)
            Log.d("Login", "Login Response: $loginResponse")
            if (loginResponse != null) {
                val userData = loginResponse.user
                _uiState.update {
                    it.copy(user = userData)
                }
                saveCredentials(username, password, context)

                navController.navigate(Screens.TuitionFee.name) {
                    popUpTo(Screens.Login.name) {  inclusive = true }
                }
            } else {
                errorMessage = "Invalid username or password"
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
        val masterKey = MasterKey.Builder(context)
            .setKeyScheme(MasterKey.KeyScheme.AES256_GCM)
            .build()
        val sharedPrefs = EncryptedSharedPreferences.create(
            context, "soa_midterm_credentials", masterKey,
            EncryptedSharedPreferences.PrefKeyEncryptionScheme.AES256_SIV,
            EncryptedSharedPreferences.PrefValueEncryptionScheme.AES256_GCM
        )

        sharedPrefs.edit {
            putString("username", identifier)
            putString("password", password)
        }
    }

    private fun loadSavedCredentials(context: Context): Pair<String, String> {
        return try {
            val masterKey = MasterKey.Builder(context)
                .setKeyScheme(MasterKey.KeyScheme.AES256_GCM)
                .build()

            val sharedPrefs = EncryptedSharedPreferences.create(
                context, "soa_midterm_credentials", masterKey,
                EncryptedSharedPreferences.PrefKeyEncryptionScheme.AES256_SIV,
                EncryptedSharedPreferences.PrefValueEncryptionScheme.AES256_GCM
            )

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
        // TODO: EVENT & BACKEND HANDLING
        var success = false

        if (success) {
            navController.navigate(Screens.PaymentDetails.name)
        } else {
            // TODO: ERROR MESSAGE FOR TOAST
            Toast.makeText(context, "", Toast.LENGTH_SHORT).show()
        }
    }

    // OTP
    var isOtpBoxVisible by mutableStateOf(false)

    fun verifyBeforeSendOTP(context: Context) {
        // TODO: DATA VERIFY BEFORE SENDING OTP
        var success = false

        if (success) {
            isOtpBoxVisible = true
        } else {
            // TODO: ERROR MESSAGE FOR TOAST
            Toast.makeText(context, "", Toast.LENGTH_SHORT).show()
        }
    }

    fun onOtpDismiss() {
        isOtpBoxVisible = false

        // TODO: More BackEnd Logic
    }

    var otpValue by mutableStateOf("")
        private set

    fun onOtpChange(newValue: String) {
        otpValue = newValue
    }

    // HISTORY
    fun onViewHistoryClick(
        navController: NavHostController
    ) {
        // TODO: GET DATA FOR UI STATE

        navController.navigate(Screens.HistoryList.name)
    }

    // PAYMENT DETAILS
    fun onViewPaymentDetailsClick(
        selectedPayment: PaymentHistoryItem,
        navController: NavHostController
    ) {
        _uiState.update {
            it.copy(
                selectedHistoryPayment = selectedPayment
            )
        }

        navController.navigate(Screens.HistoryDetails.name)
    }
}