/* 대화 상대 */

import { StyleSheet, Text } from "react-native"
import { useSelector } from "react-redux"

export default function ContactPerson({ members }) {
    let { name } = useSelector(state => ({
        name: state.user.name
    }))

    name = _getMember();

    function _getMember() {
        const [_member1, _member2] = members.split(',');
        return name === _member1 ? _member2 : _member1
    }

    return (
        <Text style={styles.contactPerson}>
            {name}
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