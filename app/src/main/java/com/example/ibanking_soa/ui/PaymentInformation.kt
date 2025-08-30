package com.example.ibanking_soa.ui

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material3.CenterAlignedTopAppBar
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.tooling.preview.Preview
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavHostController
import androidx.navigation.compose.rememberNavController
import com.example.ibanking_soa.R
import com.example.ibanking_soa.ui.theme.BackgroundColor
import com.example.ibanking_soa.ui.theme.CustomTypography
import com.example.ibanking_soa.ui.theme.PrimaryColor
import com.example.ibanking_soa.viewModel.AppViewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun PaymentInformationScreen(
    appViewModel: AppViewModel,
    navController: NavHostController
) {
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
                    IconButton (
                        onClick = {
                            // TODO: NAV BACK
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
        }
    ) { innerPadding ->
        Column(
            modifier = Modifier
                .padding(innerPadding)
        ) {

        }
    }
}

@Preview(
    showBackground = true,
    showSystemUi = true
)
@Composable
fun PaymentInformationScreenPreview() {
    val fakeAppViewModel: AppViewModel = viewModel()
    val fakeNavController: NavHostController = rememberNavController()

    PaymentInformationScreen(
        appViewModel = fakeAppViewModel,
        navController = fakeNavController
    )
}