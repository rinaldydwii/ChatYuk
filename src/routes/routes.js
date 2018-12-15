import SplashScreen from "../views/SplashScreen";
import ChatScreen from "../views/ChatScreen";
import WelcomeScreen from "../views/WelcomeScreen";
import JoinScreen from "../views/JoinScreen";

export const SwitchRoutes = {
    Splash: { screen: SplashScreen },
}

export const AuthRoutes = {
    Welcome: { screen: WelcomeScreen},
    Join: { screen: JoinScreen }
}

export const AppRoutes = {
    Chat: { screen: ChatScreen }
}
