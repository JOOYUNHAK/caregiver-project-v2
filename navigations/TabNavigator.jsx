import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Platform } from "react-native";
import Icon from '../components/Icon';
import FindHelper from '../screens/FindHelper'
import Writing from '../screens/Writing'
import MyInfo from "../screens/MyInfo";

const Tab = createBottomTabNavigator();

export function MyTabs() {

    return (
        <Tab.Navigator
            initialRouteName="home"
            screenOptions={{
                lazy: false,
                tabBarActiveTintColor: '#94c6ad',
                tabBarLabelStyle: {
                    fontSize: 10
                },
                tabBarItemStyle: {
                    paddingTop: 5,
                    paddingBottom: 5
                },
            }}
        >
            <Tab.Screen
                name="home"
                component={FindHelper}
                options={{
                    unmountOnBlur: true,
                    tabBarLabel: '홈',
                    title: '믿음으로',
                    headerTitleAlign: 'left',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        paddingLeft: 20,
                        color: '#94c6ad',
                        fontSize: Platform.OS === 'ios' ? 13 : 16
                    },
                    headerRightContainerStyle: {
                        right: 20
                    },
                    tabBarIcon: ({ color }) => (
                        <Icon props={['material-community', 'home', 26, color]} />
                    ),

                }}
            />

            <Tab.Screen
                name="chat"
                component={Writing}
                options={{
                    tabBarLabel: '채팅',
                    tabBarIcon: ({ color }) => (
                        <Icon props={['ionicon', 'chatbubbles-outline', 26, color]} />
                    )
                }}
            />

            <Tab.Screen
                name="myinfo"
                component={MyInfo}
                options={{
                    tabBarLabel: '내정보',
                    title: 'MY 믿음',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: Platform.OS === 'ios' ? 14 : 17,
                        left: 20
                    },
                    headerTitleAlign: 'left',
                    tabBarIcon: ({ color }) => (
                        <Icon props={['ionicon', 'person-outline', 26, color]} />
                    )
                }}
            />

        </Tab.Navigator>

    )
}