/* 간병이 신청 되면 전송되는 정책 안내 */

import { StyleSheet } from "react-native";
import { View } from "react-native";
import PatientProfileButton from "./Policy/PatientProfileButton";
import PolicyHeader from "./Policy/PolicyHeader";
import PolicyList from "./Policy/PolicyList";

export default function Policy({ protectorId, roomId, messageContent }) {
    return (
        <View style={styles.policyModal}>
            <PolicyHeader />
            <PolicyList />
            <PatientProfileButton 
                protectorId = {protectorId} roomId = {roomId} messageContent = {messageContent}/>
        </View>
    )
}

const styles = StyleSheet.create({
    policyModal: {
        marginHorizontal: 50,
        marginBottom: 15,
        paddingTop: 20,
        borderRadius: 20,
        backgroundColor: 'white',
        elevation: 5,
        paddingHorizontal: 5
    },
})