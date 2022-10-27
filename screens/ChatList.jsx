import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import StatusBarComponent from "../components/StatusBarComponent";
import EachChatList from "../components/ChatList/EachChatList";
import { useEffect } from "react";
import { socket } from "../module/socket";
import { useSelector } from "react-redux";

export default function ChatList() {
    const { userId } = useSelector(state => ({
        userId: state.user.id
    }))

    return (
        <SafeAreaView style={styles.container} >
            <StatusBarComponent />
            <EachChatList />
            
            {/*  <FlatList
                contentContainerStyle ={{height: '80%'}}
                ListEmptyComponent={ <NoChatList />}
            

            /> */}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
})