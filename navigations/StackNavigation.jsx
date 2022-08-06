import { createStackNavigator } from "@react-navigation/stack";
import { TouchableHighlight } from "react-native";
import Icon from "../components/Icon";
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
                        <TouchableHighlight
                            underlayColor = 'none'
                            onPress = {() => navigation.pop()}
                        >
                            <Icon props={['materail', 'close', 30, '#94c6ad']} />
                        </TouchableHighlight>
                    )
                })}
            />
        </Stack.Navigator>
    );
}
