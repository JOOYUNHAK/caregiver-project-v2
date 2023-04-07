import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Text } from "react-native";
import HelperList from "../components/FindHelper/HelperList";
import Loading from "../screens/Loading";

const TopTabs = createMaterialTopTabNavigator();

export function MyTopTabs() {
    return (
        <TopTabs.Navigator
            initialRouteName='careGiver'
            screenOptions={{
                tabBarActiveTintColor: 'black',
                tabBarLabelStyle: { fontSize: 16, fontWeight: '700' },
                tabBarStyle: { backgroundColor: 'white',  },
                tabBarPressColor: 'white',
                tabBarIndicatorStyle: { backgroundColor: 'black', height: 1.5}
            }}
        >

            <TopTabs.Screen
                name="careGiver"
                children={() => <HelperList purpose = 'careGiver'/>}
                options={{ 
                    tabBarLabel: '간병인', 
                    lazy: true,
                    lazyPlaceholder: () => {
                        <Loading />
                    }
                }}
            />

            <TopTabs.Screen
                name="assistant"
                children={() => <HelperList purpose = 'assistant'/>}
                options={{ 
                    tabBarLabel: '활동보조사', 
                    lazy: true,
                    lazyPlaceholder: () => {
                        <Loading />
                    }
                }}
            />

        </TopTabs.Navigator>
    )
}