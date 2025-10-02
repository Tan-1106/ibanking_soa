package com.example.ibanking_soa.ui

import androidx.annotation.StringRes
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.systemBarsPadding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ExitToApp
import androidx.compose.material.icons.filled.History
import androidx.compose.material.icons.filled.PersonSearch
import androidx.compose.material.icons.filled.Search
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.CenterAlignedTopAppBar
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavHostController
import androidx.navigation.compose.rememberNavController
import com.example.ibanking_soa.R
import com.example.ibanking_soa.Screens
import com.example.ibanking_soa.ui.theme.AcceptColor
import com.example.ibanking_soa.ui.theme.AlertColor
import com.example.ibanking_soa.ui.theme.BackgroundColor
import com.example.ibanking_soa.ui.theme.CustomTypography
import com.example.ibanking_soa.ui.theme.LabelColor
import com.example.ibanking_soa.ui.theme.PrimaryColor
import com.example.ibanking_soa.ui.theme.TextColor
import com.example.ibanking_soa.ui.theme.WarningColor
import com.example.ibanking_soa.viewModel.AppViewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun TuitionFeeScreen(
    appViewModel: AppViewModel,
    navController: NavHostController
) {
    val context = LocalContext.current
    val appUiState by appViewModel.uiState.collectAsState()

    Scaffold(
        topBar = {
            CenterAlignedTopAppBar(
                title = {
                    Text(
                        text = stringResource(R.string.TuitionFee),
                        style = CustomTypography.titleLarge
                    )
                },
                actions = {
                    Icon(
                        imageVector = Icons.Default.History,
                        contentDescription = null,
                        modifier = Modifier
                            .clickable {
                                appViewModel.onViewHistoryClick(navController = navController)
                            }
                    )
                    Spacer(modifier = Modifier.width(10.dp))
                    Icon(
                        imageVector = Icons.AutoMirrored.Filled.ExitToApp,
                        contentDescription = null,
                        modifier = Modifier
                            .clickable {
                                navController.navigate(Screens.Login.name) {
                                    popUpTo(Screens.TuitionFee.name) { inclusive = true }
                                }
                            }
                    )
                },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = PrimaryColor,
                    titleContentColor = BackgroundColor,
                    actionIconContentColor = BackgroundColor
                )
            )
        },
        bottomBar = {
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(1.dp)
                    .background(color = PrimaryColor)
            )
        },
        modifier = Modifier.systemBarsPadding(),
    ) { innerPadding ->
        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Top,
            modifier = Modifier
                .fillMaxSize()
                .padding(top = 10.dp)
                .padding(innerPadding)
        ) {
            Image(
                painter = painterResource(R.drawable.avatar),
                contentDescription = "Avatar",
                modifier = Modifier.size(125.dp)
            )
            Spacer(modifier = Modifier.height(5.dp))
            Text(
                text = appUiState.user.fullName,
                style = CustomTypography.headlineSmall,
                color = TextColor,
                fontWeight = FontWeight.Bold
            )
            Spacer(modifier = Modifier.height(5.dp))
            Text(
                text = appUiState.user.phoneNumber,
                style = CustomTypography.labelLarge,
                color = LabelColor
            )
            Text(
                text = appUiState.user.email,
                style = CustomTypography.labelLarge,
                color = LabelColor
            )
            Spacer(modifier = Modifier.height(20.dp))
            HorizontalDivider(
                thickness = 1.dp,
                color = PrimaryColor
            )

            Column(
                horizontalAlignment = Alignment.Start,
                verticalArrangement = Arrangement.Top,
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = 10.dp, horizontal = 20.dp)
            ) {
                Text(
                    text = stringResource(R.string.TuitionFee_StudentID),
                    style = CustomTypography.titleSmall
                )
                Spacer(modifier = Modifier.height(5.dp))
                Row(
                    horizontalArrangement = Arrangement.Start,
                    verticalAlignment = Alignment.CenterVertically,
                    modifier = Modifier.fillMaxWidth()
                ) {
                    CustomInformationTextField(
                        placeholder = stringResource(R.string.TuitionFee_IDPlaceHolder),
                        leadingIcon = Icons.Default.PersonSearch,
                        value = appViewModel.studentIdValue,
                        onValueChange = { appViewModel.onStudentIdChange(it) },
                        keyboardOptions = KeyboardOptions.Default.copy(
                            keyboardType = KeyboardType.Text,
                            imeAction = ImeAction.Done
                        ),
                        modifier = Modifier
                            .height(60.dp)
                            .fillMaxWidth(0.8f)
                    )
                    Spacer(modifier = Modifier.width(5.dp))
                    if (appUiState.isLoading) {
                        CircularProgressIndicator(
                            color = PrimaryColor,
                            strokeWidth = 3.dp,
                            modifier = Modifier
                                .size(40.dp)
                        )
                    } else {
                        Button(
                            onClick = {
                                appViewModel.onSearchStudentId(navController)
                            },
                            shape = RoundedCornerShape(8.dp),
                            elevation = ButtonDefaults.buttonElevation(4.dp),
                            colors = ButtonDefaults.buttonColors(
                                containerColor = PrimaryColor,
                                contentColor = BackgroundColor
                            ),
                            modifier = Modifier
                                .height(60.dp)
                                .fillMaxWidth()
                        ) {
                            Icon(
                                imageVector = Icons.Default.Search,
                                contentDescription = null
                            )
                        }

                    }
                }
            }
            DashedDivider(
                thickness = 1.dp,
                color = PrimaryColor,
            )

            Column(
                horizontalAlignment = Alignment.Start,
                verticalArrangement = Arrangement.Top,
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = 10.dp, horizontal = 20.dp)
            ) {
                if (appUiState.tuitionFee == null) {
                    Row (
                        horizontalArrangement = Arrangement.Center,
                        verticalAlignment = Alignment.CenterVertically,
                        modifier = Modifier.fillMaxWidth()
                    ){
                        Text(
                            text = "No Information Found",
                            style = CustomTypography.titleSmall
                        )
                    }
                } else {
                    Text(
                        text = stringResource(R.string.TuitionFee_TuitionInformation),
                        style = CustomTypography.titleSmall
                    )
                    TuitionInfLine(
                        lineText = R.string.TuitionFee_StudentName,
                        content = appUiState.tuitionFee!!.studentFullName,
                        modifier = Modifier.fillMaxWidth()
                    )
                    TuitionInfLine(
                        lineText = R.string.TuitionFee_Amount,
                        content = "${appViewModel.formatCurrency(appUiState.tuitionFee!!.amount)} VND",
                        contentColor = AlertColor,
                        modifier = Modifier.fillMaxWidth()
                    )
                }
            }
            Spacer(modifier = Modifier.weight(1f))

            Column(
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.Top,
                modifier = Modifier
                    .fillMaxWidth()
                    .border(
                        width = 1.dp,
                        color = PrimaryColor,
                        shape = RoundedCornerShape(topStart = 20.dp, topEnd = 20.dp)
                    )
            ) {
                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(vertical = 10.dp, horizontal = 20.dp)
                ) {
                    Text(
                        text = stringResource(R.string.TuitionFee_Balance),
                        style = CustomTypography.titleSmall
                    )
                    Spacer(modifier = Modifier.weight(1f))
                    Text(
                        text = "${appViewModel.formatCurrency(appUiState.user.balance)} VND",
                        style = CustomTypography.bodyMedium,
                        fontWeight = FontWeight.Bold,
                        color = if (appUiState.tuitionFee?.let {
                                it.amount <= appUiState.user.balance
                            } ?: false) AcceptColor else WarningColor,

                        textAlign = TextAlign.End,
                    )
                }
                Button(
                    onClick = {
                        appViewModel.processToPaymentInf(
                            context = context,
                            navController = navController
                        )
                    },
                    shape = RoundedCornerShape(8.dp),
                    elevation = ButtonDefaults.buttonElevation(4.dp),
                    colors = ButtonDefaults.buttonColors(
                        containerColor = PrimaryColor,
                        contentColor = BackgroundColor
                    ),
                    enabled = appUiState.tuitionFee?.let {
                        appUiState.payable && (it.amount <= appUiState.user.balance)
                    } ?: false,
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(bottom = 10.dp)
                        .padding(horizontal = 20.dp)
                ) {
                    Text(
                        text = stringResource(R.string.TuitionFee_ButtonText),
                        fontWeight = FontWeight.Medium,
                        style = CustomTypography.bodyLarge,
                    )
                }
            }
        }
    }
}

@Composable
fun TuitionInfLine(
    @StringRes lineText: Int,
    content: String,
    modifier: Modifier = Modifier,
    contentColor: Color = TextColor
) {
    Row(
        horizontalArrangement = Arrangement.Start,
        verticalAlignment = Alignment.Top,
        modifier = modifier
            .fillMaxWidth()
            .padding(top = 10.dp)
    ) {
        Text(
            text = stringResource(lineText),
            style = CustomTypography.bodySmall,
            color = TextColor,
            modifier = Modifier.fillMaxWidth(0.3f)
        )
        Text(
            text = content,
            style = CustomTypography.bodyMedium,
            fontWeight = FontWeight.Bold,
            color = contentColor,
            textAlign = TextAlign.End,
            modifier = Modifier.fillMaxWidth()
        )
    }
}

@Preview(
    showBackground = true,
    showSystemUi = true
)
@Composable
fun TuitionFeeScreenPreview() {
    val fakeAppViewModel: AppViewModel = viewModel()
    val fakeNavController: NavHostController = rememberNavController()

    TuitionFeeScreen(
        appViewModel = fakeAppViewModel,
        navController = fakeNavController
    )
}