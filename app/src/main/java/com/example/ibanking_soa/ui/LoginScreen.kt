package com.example.ibanking_soa.ui

import androidx.annotation.StringRes
import androidx.compose.foundation.Canvas
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
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Clear
import androidx.compose.material.icons.filled.Lock
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.Visibility
import androidx.compose.material.icons.filled.VisibilityOff
import androidx.compose.material3.Checkbox
import androidx.compose.material3.CheckboxDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.LocalMinimumInteractiveComponentSize
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.OutlinedTextFieldDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.text.input.VisualTransformation
import androidx.compose.ui.text.style.TextAlign
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
import com.example.ibanking_soa.ui.theme.TextColor
import com.example.ibanking_soa.ui.theme.ThirdColor
import com.example.ibanking_soa.viewModel.AppViewModel

@Composable
fun LoginScreen(
    appViewModel: AppViewModel,
    navController: NavHostController
) {
    // Variables
    val context = LocalContext.current

    LaunchedEffect(Unit) {
        appViewModel.loadUsernameAndPassword(context)
    }

    // UI
    LoginBackground {
        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Top,
            modifier = Modifier
                .fillMaxSize()
                .padding(horizontal = 20.dp)
        ) {
            Spacer(modifier = Modifier.height(150.dp))
            Column(
                horizontalAlignment = Alignment.Start
            ) {
                Text(
                    text = stringResource(R.string.LoginScreen_Welcome),
                    style = CustomTypography.displayMedium,
                    color = TextColor,
                    modifier = Modifier.fillMaxWidth(0.6f)
                )
                Text(
                    text = stringResource(R.string.LoginScreen_Text),
                    style = CustomTypography.titleSmall,
                    color = TextColor
                )
            }
            Spacer(modifier = Modifier.height(50.dp))
            LoginTextField(
                label = R.string.LoginScreen_UsernameLabel,
                value = appViewModel.usernameValue,
                onValueChange = { appViewModel.onUsernameChange(it) },
                leadingIcon = Icons.Default.Person,
                trailingIcon = Icons.Default.Clear,
                onTrailingIconClick = { appViewModel.clearUsername() },
                keyboardOptions = KeyboardOptions.Default.copy(
                    keyboardType = KeyboardType.Text,
                    imeAction = ImeAction.Next
                ),
                modifier = Modifier.width(300.dp)
            )
            LoginTextField(
                label = R.string.LoginScreen_PasswordLabel,
                value = appViewModel.passwordValue,
                onValueChange = { appViewModel.onPasswordChange(it) },
                leadingIcon = Icons.Default.Lock,
                trailingIcon = Icons.Default.Clear,
                onTrailingIconClick = { appViewModel.clearPassword() },
                keyboardOptions = KeyboardOptions.Default.copy(
                    keyboardType = KeyboardType.Password,
                    imeAction = ImeAction.Done
                ),
                isPasswordField = true,
                isPasswordShow = appViewModel.isPasswordVisible,
                onPasswordIconClick = { appViewModel.onPasswordShowingIconClick() },
                modifier = Modifier.width(300.dp)
            )
            Row(
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.End,
                modifier = Modifier
                    .height(40.dp)
                    .width(300.dp)
            ) {
                Text(
                    text = stringResource(R.string.LoginScreen_RememberPassword),
                    style = CustomTypography.bodySmall,
                    color = TextColor
                )
                Spacer(modifier = Modifier.width(5.dp))
                CompositionLocalProvider(LocalMinimumInteractiveComponentSize provides 0.dp) {
                    Checkbox(
                        checked = appViewModel.isPasswordRemembered,
                        onCheckedChange = { appViewModel.onRememberPasswordClick() },
                        colors = CheckboxDefaults.colors(
                            uncheckedColor = SecondaryColor,
                            checkedColor = ThirdColor,
                            checkmarkColor = BackgroundColor
                        )
                    )
                }
            }
            CustomTextButton(
                buttonText = R.string.LoginScreen_ButtonText,
                contentColor = TextColor,
                containerColor = BackgroundColor,
                borderColor = SecondaryColor,
                onClick = {
                    appViewModel.login(
                        context = context,
                        navController = navController
                    )
                },
                modifier = Modifier.width(300.dp)
            )
        }
    }
}

// Components
@Composable
fun LoginBackground(
    content: @Composable () -> Unit
) {
    Box(modifier = Modifier.fillMaxSize()) {
        Canvas(modifier = Modifier.fillMaxSize()) {
            drawCircle(
                color = PrimaryColor,
                radius = 500f,
                center = Offset(size.width, 0f)
            )
            drawCircle(
                color = SecondaryColor,
                radius = 150f,
                center = Offset(size.width , 500f)
            )
            drawCircle(
                color = PrimaryColor,
                radius = 1000f,
                center = Offset(150f, size.height)
            )
            drawCircle(
                color = SecondaryColor,
                radius = 700f,
                center = Offset(300f , size.height)
            )
        }
        content()
    }
}

@Composable
fun LoginTextField(
    @StringRes label: Int,
    value: String,
    onValueChange: (String) -> Unit,
    leadingIcon: ImageVector,
    trailingIcon: ImageVector,
    onTrailingIconClick: () -> Unit,
    modifier: Modifier = Modifier,
    isPasswordField: Boolean = false,
    isPasswordShow: Boolean = false,
    onPasswordIconClick: () -> Unit = { },
    keyboardOptions: KeyboardOptions = KeyboardOptions.Default,
    errorMessage: String = "",
) {

    Column(
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        OutlinedTextField(
            label = {
                Text(
                    text = stringResource(label),
                    style = CustomTypography.labelMedium
                )
            },
            value = value,
            onValueChange = onValueChange,
            textStyle = CustomTypography.bodyMedium,
            visualTransformation = if (isPasswordField && !isPasswordShow) PasswordVisualTransformation() else VisualTransformation.None,
            singleLine = true,
            leadingIcon = {
                Icon(
                    imageVector = leadingIcon,
                    tint = TextColor,
                    contentDescription = null
                )
            },
            trailingIcon = {
                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.End
                ) {
                    if (isPasswordField) {
                        Icon(
                            imageVector = if (isPasswordShow) Icons.Default.Visibility else Icons.Default.VisibilityOff,
                            contentDescription = null,
                            tint = TextColor,
                            modifier = Modifier
                                .clickable(onClick = onPasswordIconClick)
                                .padding(end = 4.dp)
                        )
                    }
                    Icon(
                        imageVector = trailingIcon,
                        contentDescription = null,
                        tint = TextColor,
                        modifier = Modifier
                            .clickable(onClick = onTrailingIconClick)
                            .padding(end = if (isPasswordField) 12.dp else 0.dp)
                    )
                }
            },
            isError = (errorMessage != ""),
            colors = OutlinedTextFieldDefaults.colors(
                unfocusedContainerColor = BackgroundColor,
                unfocusedBorderColor = SecondaryColor,
                unfocusedTextColor = TextColor,
                unfocusedLabelColor = if (value.isEmpty()) LabelColor else PrimaryColor,

                focusedContainerColor = BackgroundColor,
                focusedBorderColor = ThirdColor,
                focusedTextColor = TextColor,
                focusedLabelColor = ThirdColor,

                errorContainerColor = BackgroundColor,
                errorBorderColor = AlertColor,
                errorTextColor = TextColor,
                errorLabelColor = if (value.isEmpty()) LabelColor else AlertColor,
            ),
            keyboardOptions = keyboardOptions,
            modifier = modifier
                .fillMaxWidth()
                .height(60.dp)
        )
        Spacer(modifier = Modifier.height(5.dp))
        Text(
            text = errorMessage,
            style = CustomTypography.labelMedium,
            textAlign = TextAlign.End,
            modifier = modifier.fillMaxWidth()
        )
    }
}



@Preview(
    showSystemUi = true,
    showBackground = true
)
@Composable
fun LoginScreenPreview() {
    val fakeAppViewModel: AppViewModel = viewModel()
    val fakeNavController: NavHostController = rememberNavController()

    LoginScreen(
        appViewModel = fakeAppViewModel,
        navController = fakeNavController
    )
}

