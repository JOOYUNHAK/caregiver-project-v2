import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import StatusBarComponent from "../components/StatusBarComponent";
import EachChatList from "../components/ChatList/EachChatList";
import NoChatList from '../components/ChatList/NoChatList'
import { useEffect } from "react";
import { socket, socketEvent } from "../module/socket";
import { useDispatch, useSelector } from "react-redux";
import { getRoomList } from "../api/Chat";
import { saveLookUp } from "../../frontendv2/redux/action/chat/chatAction";

export default function ChatList({ navigation }) {
    const { isLookUped, roomList, render } = useSelector(state => ({
        isLookUped: state.chat.isLookUpedList,
        roomList: state.chat.roomList,
        render: state.chat.render
    }))
    const dispatch = useDispatch();

    useEffect(() => {
        async function getRooms() {
            await getRoomList(navigation);
        }
        //한번 조회했으면 다시 조회 하지 않음
        if( isLookUped ) 
            return;
        getRooms();
        //소켓 리스너 다시 등록
        //방에 들어오면 해당 방안에서만 새로운 메세지 이벤트 구독
        dispatch(saveLookUp(true));
    }, [])

    return (
        <SafeAreaView style={styles.container} >
            <StatusBarComponent />
            <FlatList
                ListEmptyComponent={ <NoChatList /> }
                data = { roomList }
                extraData = {render}
                renderItem={({ item, index }) => <EachChatList item = {item} key = {index}/>}
            /> 
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