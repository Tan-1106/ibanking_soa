package com.example.ibanking_soa.ui

import androidx.annotation.StringRes
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.example.ibanking_soa.ui.theme.CustomTypography

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