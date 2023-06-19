/* 프로필 수정 헤더 부분 */

import { StyleSheet } from "react-native"
import { Text } from "react-native"

export default function ModifyHeader() {

    return (
        <Text style={styles.headerText}>
            회원가입 때 작성했던 페이지 중 {"\n"}
            수정을 원하시는 페이지를 선택해주세요
        </Text>
    )
}

const styles = StyleSheet.create({
    headerText: {
        textAlign: 'center',
        color: 'black',
        fontSize: 18,
    },
})