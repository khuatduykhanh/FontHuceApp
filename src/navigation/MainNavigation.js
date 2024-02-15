import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Intro from "../screens/Intro"
import Welcome from "../screens/Welcome"
import Login from "../screens/Login"
import HomeNavigation from "./HomeNavigation"
import Signin from "../screens/Signin"
import ConfirmEmail from "../screens/ConfirmEmail"
import ForgotPassword from "../screens/ForgotPassword"
import NewPassword from "../screens/NewPassword"
import ConfirmForgotPassword from "../screens/ConfirmForgotPassword"
import Avatar from "../screens/Avatar"
import Setup from '../screens/Setup';
const Stack = createNativeStackNavigator(); 

export const NonAuthenticated = () => {
    return (
        <Stack.Navigator initialRouteName="Intro" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Intro" component={Intro} />
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signin" component={Signin} />
            <Stack.Screen name="ConfirmEmail" component={ConfirmEmail} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="ConfirmForgotPassword" component={ConfirmForgotPassword} />
            <Stack.Screen name="NewPassword" component={NewPassword} />
        </Stack.Navigator>
    )
}
export const Authenticated = () => {
    return (
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeNavigation} />
        </Stack.Navigator>
    )
}
export const SetupLogin = () => {
    return (
        <Stack.Navigator initialRouteName="Setup" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Setup" component={Setup} />
            <Stack.Screen name="Avatar" component={Avatar} />
        </Stack.Navigator>
    )
}
