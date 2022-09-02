import { createStackNavigator } from "@react-navigation/stack";
import { Platform } from "react-native";
import { MyTabs } from "./TabNavigator";
import BackBtn from "../components/Btn/BackBtn";
import CloseBtn from '../components/Btn/CloseBtn';
import FirstRegister from "../screens/Register/FirstRegister";
import LastRegister from "../screens/Register/LastRegister";
import Login from "../screens/Login";
import Search from "../screens/Search";
import SecondRegister from "../screens/Register/SecondRegister";
import ConfirmRegisterInfo from "../screens/Register/ConfirmRegisterInfo";

const Stack = createStackNavigator();

export function StackNavigation() {

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }} >
            <Stack.Screen name="tabNavigator" component={MyTabs} />
            <Stack.Screen name="searchPage" component={Search} />
            <Stack.Screen
                name="loginPage"
                component={Login}
                options={({ navigation }) => ({
                    headerShown: 'true',
                    title: '',
                    headerLeftContainerStyle: {
                        left: 10
                    },
                    headerLeft: () => (
                        <CloseBtn navigation={navigation} />
                    )
                })}
            />
            <Stack.Screen
                name='firstRegisterPage'
                component={FirstRegister}
                options={({ navigation }) => ({
                    headerShown: 'true',
                    title: '회원가입(1/3)',
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        fontSize: Platform.OS === 'ios' ? 13 : 16,
                    },
                    headerLeftContainerStyle: {
                        left: 10
                    },
                    headerLeft: () => (
                        <CloseBtn navigation={navigation} type='firstRegisterReset' />
                    )
                })}
            />
            <Stack.Screen
                name='secondRegisterPage'
                component={SecondRegister}
                options={({ navigation }) => ({
                    headerShown: 'true',
                    title: '회원가입(2/3)',
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        fontSize: Platform.OS === 'ios' ? 13 : 16,
                    },
                    headerLeftContainerStyle: {
                        left: 10
                    },
                    headerLeft: () => (
                        <BackBtn navigation={navigation} type = 'secondRegisterReset' />
                    ),
                })}
            />
            <Stack.Screen
                name="lastRegisterPage"
                component={LastRegister}
                options = {({ navigation }) => ({
                    headerShown: 'true',
                    title: '회원가입(3/3)',
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        fontSize: Platform.OS === 'ios' ? 13 :16
                    },
                    headerLeftContainerStyle: {
                        left: 10
                    },
                    headerLeft: () => (
                        <BackBtn navigation={navigation} type = 'lastRegisterReset'/>
                    )
                })}
            />
            <Stack.Screen
                name="confirmRegisterInfoPage"
                component={ConfirmRegisterInfo}
                options = {({ navigation }) => ({
                    headerShown: 'true',
                    title: '',
                    headerLeftContainerStyle: {
                        left: 10
                    },
                    headerLeft: () => (
                        <BackBtn navigation={navigation} type = 'confirmRegisterInfoReset'/>
                    )
                })}
            /> 
        </Stack.Navigator>
    );
}
