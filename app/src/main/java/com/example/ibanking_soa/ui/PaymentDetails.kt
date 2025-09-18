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
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.DoneOutline
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
import com.example.ibanking_soa.ui.theme.AcceptColor
import com.example.ibanking_soa.ui.theme.BackgroundColor
import com.example.ibanking_soa.ui.theme.CustomTypography
import com.example.ibanking_soa.ui.theme.LabelColor
import com.example.ibanking_soa.ui.theme.PrimaryColor
import com.example.ibanking_soa.ui.theme.SecondaryColor
import com.example.ibanking_soa.viewModel.AppViewModel
import java.time.format.DateTimeFormatter

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun PaymentDetails(
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
                        text = stringResource(R.string.PaymentHistory),
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
                    .background(color = SecondaryColor)
                    .padding(20.dp)
            ) {
                Icon(
                    imageVector = Icons.Default.DoneOutline,
                    contentDescription = null,
                    tint = BackgroundColor,
                    modifier = Modifier
                        .size(50.dp)
                )
            }
            Spacer(modifier = Modifier.height(10.dp))
            Text(
                text = stringResource(R.string.PaymentDetails_Success),
                style = CustomTypography.titleLarge,
                color = SecondaryColor
            )
            HorizontalDivider(
                thickness = 1.dp,
                color = LabelColor,
                modifier = Modifier.padding(vertical = 20.dp)
            )
            PaymentInfLine(
                lineText = R.string.PaymentDetails_ReferenceCode,
                content = appUiState.selectedPayment.payment.referenceCode,
                modifier = Modifier.fillMaxWidth()
            )
            PaymentInfLine(
                lineText = R.string.PaymentDetails_Date,
                content = appUiState.selectedPayment.date.format(formatter),
                modifier = Modifier.fillMaxWidth()
            )
            PaymentInfLine(
                lineText = R.string.PaymentDetails_BeneficiaryAccount,
                content = appUiState.selectedPayment.payment.beneficiaryAccount,
                modifier = Modifier.fillMaxWidth()
            )
            PaymentInfLine(
                lineText = R.string.PaymentDetails_Amount,
                content = "${appViewModel.formatCurrency(appUiState.selectedPayment.payment.total)} VND",
                modifier = Modifier.fillMaxWidth()
            )
            PaymentInfLine(
                lineText = R.string.PaymentDetails_Content,
                content = appUiState.selectedPayment.tuitionFee.content,
                modifier = Modifier.fillMaxWidth()

            )
        }
    }
}

@Preview(
    showBackground = true,
    showSystemUi = true
)
@Composable
fun PaymentDetailsPreview() {
    val fakeAppViewModel: AppViewModel = viewModel()
    val fakeNavController: NavHostController = rememberNavController()

    PaymentDetails(
        appViewModel = fakeAppViewModel,
        navController = fakeNavController
    )
}