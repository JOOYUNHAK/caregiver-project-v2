import { createStackNavigator } from "@react-navigation/stack";
import { Platform} from "react-native";
import CloseBtn from '../components/Btn/CloseBtn';
import FirstRegister from "../screens/FirstRegister";
import Login from "../screens/Login";
import Search from "../screens/Search";
import { MyTabs } from "./TabNavigator";

const Stack = createStackNavigator();

export function StackNavigation() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name = "tabNavigator" component = {MyTabs} />
            <Stack.Screen name = "searchPage" component = {Search} />
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
                        <CloseBtn navigation = {navigation} />
                    )
                })}
            />
            <Stack.Screen 
                name = 'firstRegisterPage' 
                component = {FirstRegister} 
                options = {({ navigation }) => ({
                    headerShown: 'true',
                    title: '회원가입',
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        fontSize: Platform.OS === 'ios' ? 13 :16,
                    },
                    headerLeftContainerStyle: {
                        left: 10
                    },
                    headerLeft: () => (
                       <CloseBtn navigation = {navigation} />
                    )
                })}
                />
        </Stack.Navigator>
    );
}
