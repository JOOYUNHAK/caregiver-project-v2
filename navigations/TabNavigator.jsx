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
                    tabBarLabel: '홈',
                    title: '찾고있어요',
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        fontWeight: 'bold',
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
                name="writing"
                component={Writing}
                options={{
                    tabBarLabel: '소통공간',
                    title: '소통공간',
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: Platform.OS === 'ios' ? 13 : 16
                    },
                    headerRightContainerStyle: {
                        right: 20
                    },
                    tabBarIcon: ({ color }) => (
                        <Icon props={['ionicon', 'book-outline', 26, color]} />
                    )
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
                name="play"
                component={Writing}
                options={{
                    tabBarLabel: '휴식존',
                    tabBarIcon: ({ color }) => (
                        <Icon props={['evilicon', 'user', 26, color]} />
                    )
                }}
            />

            <Tab.Screen
                name="myinfo"
                component={MyInfo}
                options={{
                    tabBarLabel: '내정보',
                    title: '나의 믿음',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: Platform.OS === 'ios' ? 14 : 17
                    },
                    headerTitleAlign: 'center',
                    tabBarIcon: ({ color }) => (
                        <Icon props={['ionicon', 'person-outline', 26, color]} />
                    )
                }}
            />

        </Tab.Navigator>

    )
}