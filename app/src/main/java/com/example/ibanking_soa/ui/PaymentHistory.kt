package com.example.ibanking_soa.ui

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.automirrored.filled.MenuBook
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
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavHostController
import androidx.navigation.compose.rememberNavController
import com.example.ibanking_soa.R
import com.example.ibanking_soa.ui.theme.BackgroundColor
import com.example.ibanking_soa.ui.theme.CustomTypography
import com.example.ibanking_soa.ui.theme.LabelColor
import com.example.ibanking_soa.ui.theme.PrimaryColor
import com.example.ibanking_soa.ui.theme.SecondaryColor
import com.example.ibanking_soa.ui.theme.TextColor
import com.example.ibanking_soa.utils.formatterDate
import com.example.ibanking_soa.viewModel.AppViewModel
import java.time.LocalDateTime
import java.time.OffsetDateTime
import java.time.format.DateTimeFormatter

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun PaymentHistory(
    appViewModel: AppViewModel,
    navController: NavHostController
) {
    val appUiState by appViewModel.uiState.collectAsState()

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
        if(appUiState.paymentHistory.isEmpty()){
            Row (modifier = Modifier.fillMaxSize().padding(20.dp),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.Center){
                Text(text = "No Payment History",)
            }
        }
        else{
            LazyColumn(
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.Top,
                modifier = Modifier
                    .fillMaxSize()
                    .padding(innerPadding)
                    .padding(20.dp)
            ) {
                items(appUiState.paymentHistory) {
                    HistoryItem(
                        paymentDate = it.createdAt,
                        amount = "${appViewModel.formatCurrency(it.totalAmount)} VND",
                        onTitleClick = {
                            appViewModel.onViewPaymentDetailsClick(
                                selectedPayment = it,
                                navController = navController
                            )
                        },
                        modifier = Modifier.fillMaxWidth()
                    )
                    HorizontalDivider(
                        thickness = 1.dp,
                        color = LabelColor,
                        modifier = Modifier.padding(vertical = 10.dp)
                    )
                }
            }


        }
    }
}

@Composable
fun HistoryItem(
    modifier: Modifier = Modifier,
    title: String = stringResource(R.string.PaymentHistory_TuitionPayment),
    paymentDate: String,
    amount: String,
    onTitleClick: () -> Unit
) {

    Row(
        horizontalArrangement = Arrangement.Start,
        verticalAlignment = Alignment.CenterVertically,
        modifier = modifier
    ) {
        Icon(
            imageVector = Icons.AutoMirrored.Filled.MenuBook,
            contentDescription = null,
            tint = SecondaryColor
        )
        Spacer(modifier = Modifier.width(20.dp))
        Column(
            horizontalAlignment = Alignment.Start,
            verticalArrangement = Arrangement.Center,
            modifier = Modifier.width(175.dp)
        ) {
            Text(
                text = title,
                style = CustomTypography.titleMedium,
                color = TextColor,
                modifier = Modifier.clickable { onTitleClick() }
            )
            Spacer(modifier = Modifier.height(5.dp))
            Text(
                text = formatterDate(paymentDate),
                style = CustomTypography.labelMedium,
                color = LabelColor
            )
        }
        Spacer(modifier = Modifier.width(20.dp))
        Text(
            text = amount,
            style = CustomTypography.bodyMedium,
            color = TextColor
        )
    }
}

@Preview(
    showBackground = true,
    showSystemUi = true
)
@Composable
fun PaymentHistoryPreview() {
    val fakeAppViewModel: AppViewModel = viewModel()
    val fakeNavController: NavHostController = rememberNavController()
    PaymentHistory(
        appViewModel = fakeAppViewModel,
        navController = fakeNavController
    )
}