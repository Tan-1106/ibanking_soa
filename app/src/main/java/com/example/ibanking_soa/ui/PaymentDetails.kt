package com.example.ibanking_soa.ui

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.imePadding
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.systemBarsPadding
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.BasicTextField
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.CenterAlignedTopAppBar
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavHostController
import androidx.navigation.compose.rememberNavController
import com.example.ibanking_soa.R
import com.example.ibanking_soa.ui.theme.AcceptColor
import com.example.ibanking_soa.ui.theme.AlertColor
import com.example.ibanking_soa.ui.theme.BackgroundColor
import com.example.ibanking_soa.ui.theme.CustomTypography
import com.example.ibanking_soa.ui.theme.LabelColor
import com.example.ibanking_soa.ui.theme.PrimaryColor
import com.example.ibanking_soa.ui.theme.SecondaryColor
import com.example.ibanking_soa.ui.theme.TextColor
import com.example.ibanking_soa.ui.theme.WarningColor
import com.example.ibanking_soa.viewModel.AppViewModel
import java.math.BigDecimal

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun PaymentDetails(
    appViewModel: AppViewModel,
    navController: NavHostController
) {
    val context = LocalContext.current
    val appUiState by appViewModel.uiState.collectAsState()
    val payment = appUiState.payment
    Scaffold(
        topBar = {
            CenterAlignedTopAppBar(
                title = {
                    Text(
                        text = stringResource(R.string.PaymentInformation),
                        style = CustomTypography.titleLarge
                    )
                },
                navigationIcon = {
                    IconButton(
                        onClick = {
                            // TODO: NAV BACK EVENT HANDLING
                            navController.navigateUp()
                        }
                    ) {
                        Icon(
                            imageVector = Icons.AutoMirrored.Filled.ArrowBack,
                            contentDescription = null
                        )
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = PrimaryColor,
                    titleContentColor = BackgroundColor,
                    navigationIconContentColor = BackgroundColor
                )
            )
        },
        bottomBar = {
            if (!appViewModel.isOtpBoxVisible) {
                Column(
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.Top,
                    modifier = Modifier
                        .fillMaxWidth()
                        .clip(RoundedCornerShape(topStart = 20.dp, topEnd = 20.dp))
                        .background(color = BackgroundColor)
                        .padding(20.dp)
                ) {
                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Text(
                            text = stringResource(R.string.PaymentInformation_Balance),
                            style = CustomTypography.titleSmall
                        )
                        Spacer(modifier = Modifier.weight(1f))
                        Text(
                            text = "${appViewModel.formatCurrency(appUiState.user.balance)} VND",
                            style = CustomTypography.bodyMedium,
                            fontWeight = FontWeight.Bold,
                            color = if (payment.totalAmount <= appUiState.user.balance) AcceptColor else WarningColor,
                            textAlign = TextAlign.End,
                        )
                    }
                    Button(
                        onClick = { appViewModel.sendOTP(context = context) },
                        shape = RoundedCornerShape(8.dp),
                        elevation = ButtonDefaults.buttonElevation(4.dp),
                        colors = ButtonDefaults.buttonColors(
                            containerColor = PrimaryColor,
                            contentColor = BackgroundColor
                        ),
                        enabled = payment.totalAmount <= appUiState.user.balance,
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        if (appUiState.isSendingOtp) {
                            CircularProgressIndicator(
                                color = Color.White,
                                modifier = Modifier.size(20.dp)
                            )
                        } else {

                            Text(
                                text = stringResource(R.string.PaymentInformation_Transfer),
                                fontWeight = FontWeight.Medium,
                                style = CustomTypography.bodyLarge,
                            )
                        }
                    }
                }
            }
        },
        containerColor = SecondaryColor,
        modifier = Modifier.systemBarsPadding()
    ) { innerPadding ->
        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Top,
            modifier = Modifier
                .fillMaxWidth()
                .padding(20.dp)
                .padding(innerPadding)
        ) {
            Surface(
                shape = RoundedCornerShape(20.dp),
                shadowElevation = 4.dp,
                tonalElevation = 4.dp
            ) {
                Column(
                    horizontalAlignment = Alignment.Start,
                    verticalArrangement = Arrangement.Top,
                    modifier = Modifier
                        .fillMaxWidth()
                        .clip(shape = RoundedCornerShape(20.dp))
                        .background(BackgroundColor)
                        .padding(20.dp)
                ) {
                    Text(
                        text = stringResource(R.string.PaymentInformation_DetailInformation),
                        style = CustomTypography.titleSmall
                    )
                    Spacer(modifier = Modifier.height(10.dp))
                    HorizontalDivider(
                        thickness = 1.dp,
                        color = LabelColor
                    )
                    PaymentInfLine(
                        lineText = R.string.PaymentInformation_ReferenceCode,
                        content = payment.paymentRef ?: "",
                        modifier = Modifier.fillMaxWidth()
                    )
                    PaymentInfLine(
                        lineText = R.string.PaymentInformation_StudentName,
                        content = payment.studentFullName,
                        modifier = Modifier.fillMaxWidth()
                    )
                    PaymentInfLine(
                        lineText = R.string.PaymentInformation_StudentID,
                        content = appUiState.payment.studentId,
                        modifier = Modifier.fillMaxWidth()
                    )
                    PaymentInfLine(
                        lineText = R.string.PaymentInformation_TuitionFee,
                        content = "${appViewModel.formatCurrency(payment.totalAmount)} VND",
                        contentColor = AlertColor,
                        modifier = Modifier.fillMaxWidth()
                    )
                    PaymentInfLine(
                        lineText = R.string.PaymentInformation_TransferFee,
                        content = "Free",
                        modifier = Modifier.fillMaxWidth()
                    )
                    Spacer(modifier = Modifier.height(10.dp))
                    HorizontalDivider(
                        thickness = 1.dp,
                        color = LabelColor
                    )
                    PaymentInfLine(
                        lineText = R.string.PaymentInformation_Total,
                        content = "${appViewModel.formatCurrency(payment.totalAmount)} VND",
                        contentColor = AlertColor,
                        modifier = Modifier.fillMaxWidth()
                    )
                }
            }
        }
        if (appViewModel.isOtpBoxVisible) {
            OtpDialogCustom(
                otpLength = 6,
                otpValue = appViewModel.otpValue,
                onOtpChange = { appViewModel.onOtpChange(it, context, navController) },
                onDismiss = { appViewModel.onOtpDismiss() }
            )
        }
    }
}

@Composable
fun OtpDialogCustom(
    otpLength: Int,
    otpValue: String,
    onOtpChange: (String) -> Unit,
    onDismiss: () -> Unit,
    modifier: Modifier = Modifier
) {
    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(Color.Black.copy(alpha = 0.5f))
            .clickable(
                onClick = onDismiss,
                indication = null,
                interactionSource = remember { MutableInteractionSource() }
            )
            .imePadding(),
        contentAlignment = Alignment.BottomCenter
    ) {
        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            modifier = Modifier
                .fillMaxWidth()
                .background(
                    color = SecondaryColor,
                    shape = RoundedCornerShape(topStart = 20.dp, topEnd = 20.dp)
                )
                .clickable(
                    interactionSource = remember { MutableInteractionSource() },
                    indication = null
                ) {}
        ) {
            Surface(
                shadowElevation = 8.dp,
                color = Color.Transparent
            ) {
                Box(
                    contentAlignment = Alignment.Center,
                    modifier = Modifier
                        .fillMaxWidth()
                        .background(
                            color = PrimaryColor,
                            shape = RoundedCornerShape(topStart = 20.dp, topEnd = 20.dp)
                        )
                        .padding(10.dp)
                ) {
                    Text(
                        text = stringResource(R.string.PaymentInformation_OTP),
                        style = CustomTypography.titleMedium,
                        color = BackgroundColor
                    )
                }
            }
            Column(
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.Top,
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(20.dp)
            ) {
                Box(
                    contentAlignment = Alignment.Center,
                    modifier = modifier
                        .fillMaxWidth()
                        .clip(shape = RoundedCornerShape(20.dp))
                        .background(color = BackgroundColor)
                        .padding(vertical = 10.dp)
                ) {
                    BasicTextField(
                        value = otpValue,
                        onValueChange = {
                            if (it.length <= otpLength && it.all { c -> c.isDigit() }) {
                                onOtpChange(it)
                            }
                        },
                        keyboardOptions = KeyboardOptions(
                            keyboardType = KeyboardType.NumberPassword
                        ),
                        decorationBox = {
                            Row(
                                horizontalArrangement = Arrangement.SpaceEvenly,
                                verticalAlignment = Alignment.CenterVertically,
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .clip(shape = RoundedCornerShape(20.dp))
                                    .background(color = BackgroundColor)
                            ) {
                                repeat(otpLength) { index ->
                                    val isFilled = index < otpValue.length
                                    Box(
                                        modifier = Modifier
                                            .size(30.dp)
                                            .clip(CircleShape)
                                            .background(if (isFilled) TextColor else LabelColor)
                                            .border(
                                                width = 2.dp,
                                                color = if (isFilled) TextColor else LabelColor,
                                                shape = CircleShape
                                            )
                                    )
                                }
                            }
                        }
                    )
                }
                Box(
                    contentAlignment = Alignment.Center,
                    modifier = Modifier.padding(vertical = 10.dp)
                ) {
                    Text(
                        text = "",
                        style = CustomTypography.labelLarge,
                        color = BackgroundColor
                    )
                }
            }
        }
    }
}

@Preview(
    showBackground = true,
    showSystemUi = true
)
@Composable
fun PaymentDetailsScreenPreview() {
    val fakeAppViewModel: AppViewModel = viewModel()
    val fakeNavController: NavHostController = rememberNavController()

    PaymentDetails(
        appViewModel = fakeAppViewModel,
        navController = fakeNavController
    )
}