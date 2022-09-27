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
import MyProfile from "../screens/MyProfile";
import { Text } from "react-native";
import Email from "../screens/MyProfile/Account/Email";
import Certificate from "../screens/MyProfile/Profile/Certificate";
import RegisterCompletePage from "../screens/Register/RegisterComplete";
import FindAddress from "../components/SecondRegister/Protector/FindAddress";
import HelperProfile from "../screens/HelperProfile";
import Filter from "../screens/Filter";

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
                        <BackBtn navigation={navigation} type='secondRegisterReset' />
                    ),
                })}
            />
            <Stack.Screen
                name="lastRegisterPage"
                component={LastRegister}
                options={({ navigation }) => ({
                    headerShown: 'true',
                    title: '회원가입(3/3)',
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        fontSize: Platform.OS === 'ios' ? 13 : 16
                    },
                    headerLeftContainerStyle: {
                        left: 10
                    },
                    headerLeft: () => (
                        <BackBtn navigation={navigation} type='lastRegisterReset' />
                    )
                })}
            />

            <Stack.Screen
                name='findAddressPage'
                component={FindAddress}
                options={({ navigation }) => ({
                    headerShown: 'true',
                    title: '주소검색',
                    headerTitleAlign: 'left',
                    headerTitleStyle: {
                        fontSize: Platform.OS === 'ios' ? 16 : 19,
                        marginLeft: 15
                    },
                    headerLeftContainerStyle: {
                        left: 10
                    },
                    headerLeft: () => (
                        <BackBtn navigation={navigation} type='findAddress' />
                    )
                })}
            />
            <Stack.Screen
                name="confirmRegisterInfoPage"
                component={ConfirmRegisterInfo}
                options={({ navigation }) => ({
                    headerShown: 'true',
                    title: '',
                    headerLeftContainerStyle: {
                        left: 10
                    },
                    headerLeft: () => (
                        <BackBtn navigation={navigation} type='confirmRegisterInfoReset' />
                    )
                })}
            />
            <Stack.Screen
                name="myProfilePage"
                component={MyProfile}
                options={({ navigation }) => ({
                    headerShown: 'true',
                    title: '내 계정 관리',
                    headerTitleAlign: 'left',
                    headerTitleStyle: {
                        fontSize: Platform.OS === 'ios' ? 16 : 19,
                        marginLeft: 15
                    },
                    headerLeftContainerStyle: {
                        left: 10
                    },
                    headerLeft: () => (
                        <BackBtn navigation={navigation} type='default' />
                    ),
                })}
            />

            <Stack.Screen
                name="emailPage"
                component={Email}
                options={({ navigation }) => ({
                    headerShown: 'true',
                })}
            />

            <Stack.Screen
                name="certificatePage"
                component={Certificate}
                options={({ navigation }) => ({
                    headerShown: 'true',
                    title: '자격증',
                    headerTitleAlign: 'left',
                    headerTitleStyle: {
                        fontSize: Platform.OS === 'ios' ? 16 : 19,
                        marginLeft: 15
                    },
                    headerLeftContainerStyle: {
                        left: 10
                    },
                    headerLeft: () => (
                        <BackBtn navigation={navigation} type='default' />
                    )
                })}
            />

            <Stack.Screen
                name='registerCompletePage'
                component={RegisterCompletePage}
            />

            <Stack.Screen
                name="helperProfilePage"
                component={HelperProfile}
                options={({ navigation }) => ({
                    headerShown: 'true',
                    title: '',
                    headerTitleAlign: 'left',
                    headerTitleStyle: {
                        fontSize: Platform.OS === 'ios' ? 13 : 17,
                        marginLeft: 15
                    },
                    headerLeftContainerStyle: {
                        left: 10,
                    },
                    headerLeft: () => (
                        <BackBtn navigation={navigation} type='default' />
                    )
                })}
            />

            <Stack.Screen
                name='filterPage'
                component={Filter}
                options={({ navigation }) => ({
                    headerShown: 'true',
                    title: '필터',
                    headerTitleAlign: 'left',
                    headerTitleStyle: {
                        fontSize: Platform.OS === 'ios' ? 16 : 19,
                        marginLeft: 5
                    },
                    headerLeftContainerStyle: {
                        left: 10
                    },
                    headerLeft: () => (
                        <CloseBtn navigation={navigation} type='filter' />
                    )
                })}
            />
        </Stack.Navigator>
    );
}
