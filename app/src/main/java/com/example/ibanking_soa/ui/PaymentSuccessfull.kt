package com.example.ibanking_soa.ui


import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.DoneOutline
import androidx.compose.material.icons.filled.ErrorOutline
import androidx.compose.material.icons.filled.QuestionMark
import androidx.compose.material.icons.filled.Timelapse
import androidx.compose.material3.CenterAlignedTopAppBar
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavHostController
import androidx.navigation.compose.rememberNavController
import com.example.ibanking_soa.R
import com.example.ibanking_soa.ui.theme.AlertColor
import com.example.ibanking_soa.ui.theme.BackgroundColor
import com.example.ibanking_soa.ui.theme.CustomTypography
import com.example.ibanking_soa.ui.theme.LabelColor
import com.example.ibanking_soa.ui.theme.PrimaryColor
import com.example.ibanking_soa.ui.theme.SecondaryColor
import com.example.ibanking_soa.ui.theme.WarningColor
import com.example.ibanking_soa.uiState.PaymentHistoryStatus
import com.example.ibanking_soa.viewModel.AppViewModel
import java.time.format.DateTimeFormatter

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun PaymentSuccessful(
    appViewModel: AppViewModel,
    navController: NavHostController
) {
    val appUiState by appViewModel.uiState.collectAsState()
    val formatter = DateTimeFormatter.ofPattern("HH:mm:ss | yyyy-MM-dd")

    Scaffold(
        topBar = {
            CenterAlignedTopAppBar(
                title = {
                    Text(
                        text = stringResource(R.string.PaymentSuccessful),
                        style = CustomTypography.titleLarge
                    )
                },
                navigationIcon = {
                    IconButton (
                        onClick = {
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
        containerColor = BackgroundColor
    ) { innerPadding ->
        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Top,
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
                .padding(20.dp)
        ) {
            Box(
                modifier = Modifier
                    .clip(shape = CircleShape)
                    .background(
                        color = when (appUiState.selectedHistoryPayment.status) {
                            PaymentHistoryStatus.SUCCESS.status -> SecondaryColor
                            PaymentHistoryStatus.FAILED.status -> AlertColor
                            PaymentHistoryStatus.PENDING.status -> WarningColor
                            else -> WarningColor
                        }
                    )
                    .padding(20.dp)
            ) {
                Icon(
                    imageVector = when (appUiState.selectedHistoryPayment.status) {
                        PaymentHistoryStatus.SUCCESS.status -> Icons.Default.DoneOutline
                        PaymentHistoryStatus.FAILED.status -> Icons.Default.ErrorOutline
                        PaymentHistoryStatus.PENDING.status -> Icons.Default.Timelapse
                        else -> Icons.Default.QuestionMark
                    },
                    contentDescription = null,
                    tint = BackgroundColor,
                    modifier = Modifier
                        .size(50.dp)
                )
            }
            Spacer(modifier = Modifier.height(10.dp))
            Text(
                text = appUiState.selectedHistoryPayment.status,
                style = CustomTypography.titleLarge,
                color = when (appUiState.selectedHistoryPayment.status) {
                    PaymentHistoryStatus.SUCCESS.status -> SecondaryColor
                    PaymentHistoryStatus.FAILED.status -> AlertColor
                    PaymentHistoryStatus.PENDING.status -> WarningColor
                    else -> WarningColor
                }
            )
            HorizontalDivider(
                thickness = 1.dp,
                color = LabelColor,
                modifier = Modifier.padding(vertical = 20.dp)
            )
            PaymentInfLine(
                lineText = R.string.PaymentDetails_ReferenceCode,
                content = appUiState.selectedHistoryPayment.payment.paymentRef?:"",
                modifier = Modifier.fillMaxWidth()
            )
            PaymentInfLine(
                lineText = R.string.PaymentDetails_Date,
                content = appUiState.selectedHistoryPayment.date.format(formatter),
                modifier = Modifier.fillMaxWidth()
            )
            PaymentInfLine(
                lineText = R.string.PaymentDetails_BeneficiaryAccount,
                content = appUiState.selectedHistoryPayment.payment.studentId,
                modifier = Modifier.fillMaxWidth()
            )
            PaymentInfLine(
                lineText = R.string.PaymentDetails_Amount,
                content = "${appViewModel.formatCurrency(appUiState.selectedHistoryPayment.payment.totalAmount)} VND",
                modifier = Modifier.fillMaxWidth()
            )
//            PaymentInfLine(
//                lineText = R.string.PaymentDetails_Content,
//                content = appUiState.selectedHistoryPayment.tuitionFee.content,
//                modifier = Modifier.fillMaxWidth()
//            )
        }
    }
}

@Preview(
    showBackground = true,
    showSystemUi = true
)
@Composable
fun PaymentSuccessfulPreview() {
    val fakeAppViewModel: AppViewModel = viewModel()
    val fakeNavController: NavHostController = rememberNavController()

    PaymentHistoryDetails(
        appViewModel = fakeAppViewModel,
        navController = fakeNavController
    )
}