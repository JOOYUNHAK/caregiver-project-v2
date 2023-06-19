/* 프로필 하단 후기 버튼 */

import { StyleSheet, Text, TouchableHighlight } from "react-native";

export default function ReviewButton() {

    return (
        <TouchableHighlight
            underlayColor='none'
            onPress={() => console.log('review')}
            style={styles.reviewButton}
        >
            <Text style={styles.reviewText}>
                후기
            </Text>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    reviewButton: {
        width: '35%',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1.2,
        height: '100%',
        borderRadius: 5,
        borderColor: 'rgba(65, 92, 118, 0.95)'
    },

    reviewText: {
        fontSize: 16,
        fontWeight: '500',
        color: 'rgba(65, 92, 118, 0.95)'
    },
})