/* 내 프로필 휴대폰 부분 */

import { View } from "react-native";
import { useSelector } from "react-redux"

export default function ExistHp() {
    const { id, email } = useSelector(state => ({
        id: state.user.id,
        email: state.user.email
    }));

    return(
        <View>
            
        </View>

    )
}