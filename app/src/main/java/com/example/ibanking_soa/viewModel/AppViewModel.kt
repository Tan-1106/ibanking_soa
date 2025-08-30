package com.example.ibanking_soa.viewModel

import android.content.Context
import android.widget.Toast
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.core.content.edit
import androidx.lifecycle.ViewModel
import androidx.navigation.NavController
import androidx.navigation.NavHostController
import androidx.security.crypto.EncryptedSharedPreferences
import androidx.security.crypto.MasterKey
import com.example.ibanking_soa.Screens
import com.example.ibanking_soa.uiState.AppUiState
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import java.math.BigDecimal
import java.text.NumberFormat
import java.util.Locale

class AppViewModel: ViewModel() {
    private val _uiState = MutableStateFlow(AppUiState())
    val uiState: StateFlow<AppUiState> = _uiState.asStateFlow()

    // LOGIN SCREEN
    var usernameValue by mutableStateOf("")
        private set
    var passwordValue by mutableStateOf("")
        private set
    var isPasswordVisible by mutableStateOf(false)
        private set
    var isPasswordRemembered by mutableStateOf(false)
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
        val username = usernameValue
        val password = passwordValue

        // TODO: AUTH nếu cần
        var success = false


        if (success) {
            saveCredentials(username, password, context)
            navController.navigate(Screens.TuitionFee.name)
        } else {
            saveCredentials("", "", context)
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
            navController.navigate(Screens.Otp.name)
        } else {
            Toast.makeText(context, "", Toast.LENGTH_SHORT).show()
        }
    }

    // OTP

}