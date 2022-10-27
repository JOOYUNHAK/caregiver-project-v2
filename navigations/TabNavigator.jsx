import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Platform } from "react-native";
import Icon from '../components/Icon';
import FindHelper from '../screens/FindHelper'
import SearchBtn from "../components/Btn/SearchBtn";
import MyInfo from "../screens/MyInfo";
import ChatList from "../screens/ChatList";

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
                options={({ navigation }) => ({
                    tabBarLabel: '홈',
                    title: '케어초이스',
                    headerTitleAlign: 'left',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        paddingLeft: 20,
                        color: 'black',
                        fontSize: Platform.OS === 'ios' ? 13 : 17
                    },
                    headerRightContainerStyle: {
                        right: 20
                    },
                    headerRight: () => (
                        <SearchBtn />
                    ),
                    tabBarIcon: ({ color }) => (
                        <Icon props={['material-community', 'home', 26, color]} />
                    ),

                })}
            />

            <Tab.Screen
                name="chat"
                component={ChatList}
                options={{
                    unmountOnBlur: true,
                    title: '채팅',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: Platform.OS === 'ios' ? 14 : 17,
                        left: 5
                    },
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
                    unmountOnBlur: true,
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