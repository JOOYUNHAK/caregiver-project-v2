/* 채팅방 */

import { useEffect } from "react";
import { useLayoutEffect } from "react";
import { BackHandler } from "react-native";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import Policy from "../components/ChatRoom/Policy";
import SendMessage from "../components/ChatRoom/SendMessage";
import StatusBarComponent from "../components/StatusBarComponent";
import { LeaveRoomEvent } from "../module/socket";
import { saveChatProtectorId } from "../redux/action/chat/chatAction";

export default function ChatRoom({ navigation, route }) {

    const dispatch = useDispatch();
    useLayoutEffect(() => {
        navigation.setOptions({
            title: `간병인 ${route.params.name}`
        });
        dispatch(
            saveChatProtectorId(
                route.params.loginId
            )
        );
    }, []);

    useEffect(() => {
        function backAction() {
            LeaveRoomEvent( 
                route.params.loginId,
                route.params.opponentId    
            )
        }

        BackHandler.addEventListener('hardwareBackPress', backAction);
        return () => 
            BackHandler.removeEventListener('hardwareBackPress', backAction);
    }, [navigation])

    return (
        <SafeAreaView style={styles.container}>
            <StatusBarComponent />
            <FlatList
                nestedScrollEnabled={true}
                keyboardShouldPersistTaps='handled'
                style={{ marginBottom: hp('7%') }}
                inverted={true}
                contentContainerStyle={styles.contentStyle}
                ListFooterComponent={<Policy />}
                renderItem={({ item }) => {
                    return (
                        <View style={{ height: 100, borderWidth: 1 }}>
                            <Text>
                            </Text>
                        </View>
                    )
                }}
            />
            <SendMessage />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignContent: 'center',
        backgroundColor: 'white',
    },

    contentStyle: {
        flexGrow: 1,
        justifyContent: 'flex-start',
    },

});