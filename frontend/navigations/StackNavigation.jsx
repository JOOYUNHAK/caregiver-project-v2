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
import Email from "../screens/MyProfile/Account/Email";
import Certificate from "../screens/MyProfile/Profile/Certificate";
import RegisterCompletePage from "../screens/Register/RegisterComplete";
import FindAddress from "../components/SecondRegister/Protector/FindAddress";
import HelperProfile from "../screens/HelperProfile";
import Filter from "../screens/Filter";
import MyHeartList from "../screens//MyInfo/MyHeartList";
import SearchResult from "../screens/SearchResult";
import EachModify from "../screens/MyProfile/Profile/Modify/EachModify";
import SelectModifyPage from "../screens/MyProfile/Profile/SelectModifyPage";
import ChatRoom from "../screens/ChatRoom";
import SelectCarePeriod from "../components/SecondRegister/Protector/SelectCarePeriod";
import { TouchableHighlight } from "react-native";
import PatientInfo from "../screens/PatientInfo";
import { MyPointHistory } from "../screens/MyInfo/MyPointHistory";

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

            <Stack.Screen
                name="heartListPage"
                component={MyHeartList}
                options={({ navigation }) => ({
                    headerShown: 'true',
                    title: '찜',
                    headerTitleAlign: 'left',
                    headerTitleStyle: {
                        fontSize: Platform.OS === 'ios' ? 16 : 19,
                        marginLeft: 5
                    },
                    headerLeftContainerStyle: {
                        left: 10
                    },
                    headerLeft: () => (
                        <BackBtn navigation={navigation} type='default' />
                    )
                })}
            />

            <Stack.Screen name="searchResultPage" component={SearchResult} />
            <Stack.Screen
                name="profileModifySelectPage"
                component={SelectModifyPage}
                options={({ navigation }) => ({
                    headerShown: 'true',
                    title: '프로필 수정',
                    headerTitleAlign: 'left',
                    headerTitleStyle: {
                        fontSize: Platform.OS === 'ios' ? 16 : 19,
                        marginLeft: 5
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
                name="profileModifyPage"
                component={EachModify}
                options={({ navigation }) => ({
                    headerShown: 'true',
                    title: '',
                    headerLeftContainerStyle: {
                        left: 10
                    },
                    headerLeft: () => (
                        <CloseBtn navigation={navigation} type='secondRegisterReset' />
                    )
                })}
            />

            <Stack.Screen
                name="chatPage"
                component={ChatRoom}
                options={({ navigation }) => ({
                    headerShown: 'true',
                    title: '',
                    headerTitleAlign: 'left',
                    headerTitleStyle: {
                        fontSize: Platform.OS === 'ios' ? 14 : 18,
                        marginLeft: 5
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
                name="selectCarePeriodPage"
                component={SelectCarePeriod}
                options={({ navigation }) => ({
                    headerShown: 'true',
                    title: '기간 선택',
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        fontSize: Platform.OS === 'ios' ? 14 : 18,
                        marginLeft: 5
                    },
                    headerLeftContainerStyle: {
                        left: 10,
                    },
                    headerRightContainerStyle: {
                        right: 20,
                    },
                    headerLeft: () => (
                        <CloseBtn navigation={navigation} type='default' />
                    )
                })}
            />
            <Stack.Screen
                name="patientInfoPage"
                component={PatientInfo}
                options={({ navigation }) => ({
                    headerShown: 'true',
                    title: '기간 선택',
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        fontSize: Platform.OS === 'ios' ? 14 : 18,
                        marginLeft: 5
                    },
                    headerLeftContainerStyle: {
                        left: 10,
                    },
                    headerRightContainerStyle: {
                        right: 20,
                    },
                    headerLeft: () => (
                        <CloseBtn navigation={navigation} type='default' />
                    )
                })}
            />

            <Stack.Screen
                name="myPointPage"
                component={MyPointHistory}
                options={({ navigation }) => ({
                    headerShown: 'true',
                    title: '포인트',
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        fontSize: Platform.OS === 'ios' ? 14 : 18,
                        marginLeft: 5
                    },
                    headerLeftContainerStyle: {
                        left: 10
                    },
                    headerLeft: () => (
                        <BackBtn navigation={navigation} type='default' />
                    )
                })}
            />
        </Stack.Navigator>
    );
}
