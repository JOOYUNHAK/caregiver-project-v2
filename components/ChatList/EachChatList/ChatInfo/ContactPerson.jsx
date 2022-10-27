/* 대화 상대 */

import { StyleSheet, Text } from "react-native"

export default function ContactPerson() {

    return (
        <Text style={styles.contactPerson}>
            간병인 주윤학
        </Text>
    )
}

const styles = StyleSheet.create({
    contactPerson: {
        color: 'black',
        fontSize: 16,
        marginRight: 3
    }
})