package com.example.ibanking_soa.ui

import androidx.annotation.StringRes
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.wrapContentHeight
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.Icon
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.OutlinedTextFieldDefaults
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.PathEffect
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import androidx.compose.ui.window.Dialog
import com.example.ibanking_soa.R
import com.example.ibanking_soa.ui.theme.AcceptColor
import com.example.ibanking_soa.ui.theme.BackgroundColor
import com.example.ibanking_soa.ui.theme.CustomTypography
import com.example.ibanking_soa.ui.theme.LabelColor
import com.example.ibanking_soa.ui.theme.PrimaryColor
import com.example.ibanking_soa.ui.theme.SecondaryColor
import com.example.ibanking_soa.ui.theme.TextColor
import com.example.ibanking_soa.ui.theme.WarningColor

// Custom Button
@Composable
fun CustomTextButton(
    @StringRes buttonText: Int,
    contentColor: Color,
    containerColor: Color,
    borderColor: Color,
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    isLoading: Boolean = false
) {
    Button(
        onClick = onClick,
        shape = RoundedCornerShape(8.dp),
        elevation = ButtonDefaults.buttonElevation(4.dp),
        colors = ButtonDefaults.buttonColors(
            contentColor = contentColor,
            containerColor = containerColor
        ),
        border = BorderStroke(
            width = 1.dp,
            color = borderColor
        ),
        modifier = modifier
    ) {
        if (isLoading) {
            CircularProgressIndicator(
                color = Color.Black,
                modifier = Modifier.size(20.dp)
            )
        } else {

            Text(
                text = stringResource(buttonText),
                fontWeight = FontWeight.Medium,
                style = CustomTypography.bodyLarge,
            )
        }
    }
}

// Custom Information Text Field
@Composable
fun CustomInformationTextField(
    placeholder: String,
    leadingIcon: ImageVector,
    value: String,
    onValueChange: (String) -> Unit,
    modifier: Modifier = Modifier,
    isEnable: Boolean = true,
    keyboardOptions: KeyboardOptions = KeyboardOptions.Default
) {
    OutlinedTextField(
        placeholder = {
            Text(
                text = placeholder,
                style = CustomTypography.labelMedium,
                color = LabelColor
            )
        },
        value = value,
        onValueChange = onValueChange,
        textStyle = CustomTypography.bodyMedium,
        singleLine = true,
        enabled = isEnable,
        leadingIcon = {
            Icon(
                imageVector = leadingIcon,
                tint = TextColor,
                contentDescription = null
            )
        },
        colors = OutlinedTextFieldDefaults.colors(
            unfocusedContainerColor = BackgroundColor,
            unfocusedTextColor = TextColor,
            unfocusedLabelColor = if (value.isEmpty()) LabelColor else PrimaryColor,
            unfocusedBorderColor = PrimaryColor,

            focusedContainerColor = BackgroundColor,
            focusedTextColor = TextColor,
            focusedLabelColor = SecondaryColor,
            focusedBorderColor = SecondaryColor
        ),
        keyboardOptions = keyboardOptions,
        modifier = modifier
    )
}

// Dash Divider
@Composable
fun DashedDivider(
    modifier: Modifier = Modifier,
    color: Color = Color.Gray,
    thickness: Dp = 1.dp,
    dashLength: Dp = 6.dp,
    gapLength: Dp = 4.dp
) {
    val density = LocalDensity.current
    val strokeWidth = with(density) { thickness.toPx() }
    val dashPx = with(density) { dashLength.toPx() }
    val gapPx = with(density) { gapLength.toPx() }

    Canvas(
        modifier = modifier
            .fillMaxWidth()
            .height(thickness)
    ) {
        drawLine(
            color = color,
            start = Offset(0f, size.height / 2),
            end = Offset(size.width, size.height / 2),
            strokeWidth = strokeWidth,
            cap = StrokeCap.Round,
            pathEffect = PathEffect.dashPathEffect(floatArrayOf(dashPx, gapPx), 0f)
        )
    }
}

// Payment Information Line
@Composable
fun PaymentInfLine(
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
            modifier = Modifier.fillMaxWidth(0.4f)
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

// Custom Dialog
@Composable
fun CustomDialog(
    onDismiss: () -> Unit,
    title: String,
    content: @Composable () -> Unit,
    confirmText: String = "OK",
    onConfirm: () -> Unit = {}
) {
    Dialog(onDismissRequest = onDismiss) {
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .wrapContentHeight()
                .background(Color.White, shape = RoundedCornerShape(16.dp))
                .padding(8.dp)
        ) {
            Column(
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.Top
            ) {
                // Title
                Box(
                    contentAlignment = Alignment.Center,
                    modifier = Modifier
                        .fillMaxWidth()
                        .background(color = SecondaryColor, shape = RoundedCornerShape(16.dp))
                        .padding(4.dp)
                ) {
                    Text(
                        text = title,
                        style = CustomTypography.titleMedium,
                        color = BackgroundColor
                    )
                }
                content()
                Row(
                    horizontalArrangement = Arrangement.End,
                    modifier = Modifier.fillMaxWidth()
                ) {
                    TextButton(onClick = onDismiss) {
                        Text(
                            text = stringResource(R.string.CustomDialog_CancelButton),
                            style = CustomTypography.labelMedium,
                            color = WarningColor
                        )
                    }
                    Button(
                        onClick = {
                            onConfirm()
                            onDismiss()
                        },
                        colors = ButtonDefaults.buttonColors(
                            containerColor = AcceptColor
                        )
                    ) {
                        Text(
                            text = confirmText,
                            style = CustomTypography.labelMedium,
                        )
                    }
                }
            }
        }
    }
}