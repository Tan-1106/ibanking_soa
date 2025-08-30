package com.example.ibanking_soa.ui

import androidx.annotation.StringRes
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.OutlinedTextFieldDefaults
import androidx.compose.material3.Text
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
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import com.example.ibanking_soa.ui.theme.BackgroundColor
import com.example.ibanking_soa.ui.theme.CustomTypography
import com.example.ibanking_soa.ui.theme.LabelColor
import com.example.ibanking_soa.ui.theme.PrimaryColor
import com.example.ibanking_soa.ui.theme.SecondaryColor
import com.example.ibanking_soa.ui.theme.TextColor

// Custom Button
@Composable
fun CustomTextButton(
    @StringRes buttonText: Int,
    contentColor: Color,
    containerColor: Color,
    borderColor: Color,
    onClick: () -> Unit,
    modifier: Modifier = Modifier
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
        Text(
            text = stringResource(buttonText),
            fontWeight = FontWeight.Medium,
            style = CustomTypography.bodyLarge,
        )
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
){
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