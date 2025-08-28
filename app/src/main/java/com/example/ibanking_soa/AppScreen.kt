package com.example.ibanking_soa

import androidx.compose.runtime.Composable
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.example.ibanking_soa.ui.LoginScreen
import com.example.ibanking_soa.viewModel.AppViewModel

enum class Screens {
    Login, TuitionFee, Otp
}

@Composable
fun AppScreen(
    appViewModel: AppViewModel = viewModel(),
    navController: NavHostController = rememberNavController()
) {
    NavHost(
        navController = navController,
        startDestination = Screens.Login.name
    ) {
        composable(route = Screens.Login.name) {
            LoginScreen(
                appViewModel = appViewModel,
                navController = navController
            )
        }

        composable(route = Screens.TuitionFee.name) {

        }

        composable(route = Screens.Otp.name) {

        }
    }
}