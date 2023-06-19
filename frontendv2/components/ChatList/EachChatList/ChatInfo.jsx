/* 채팅 상대방 마지막 메시지등 정보 */

import { StyleSheet, View } from "react-native"
import ContactPerson from './ChatInfo/ContactPerson'
import ProfileCheck from './ChatInfo/ProfileCheck';
import LastMessage from './ChatInfo/LastMessage'
export default function ChatInfo({ info }) {
    return (
        <View style={styles.chatInfo}>
            <View style={styles.contactInfo}>
                <ContactPerson members ={info.members}/>
                <ProfileCheck state = {info.state}/>
            </View>
            <LastMessage message = {info.content} messageType = {info.type}/>
        </View>
    )
}

const styles = StyleSheet.create({
    chatInfo: {
        alignItems: 'flex-start',
        flexDirection: 'column',
        paddingTop: 20,
        paddingBottom: 15,
        width: '60%',
        height: '100%',
    },

    contactInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        height: '50%'
    }
})