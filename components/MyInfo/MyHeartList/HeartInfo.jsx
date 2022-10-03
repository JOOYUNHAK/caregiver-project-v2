/* 내 정보 찜 부분 상단 찜 정보 */

import { useNavigation } from "@react-navigation/native";
import { TouchableHighlight } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import { useSelector } from "react-redux";
import deleteHeartList from "../../../api/MyInfo/deleteHeartList";

export default function HeartInfo() {
    const navigation = useNavigation();
    const { heartProfileList } = useSelector(state => ({
        heartProfileList: state.profile.heartProfileList
    }));

    const pressResetHeartList = async () => {
        await deleteHeartList(navigation);
    }
    return (
        <View style={{
            height: 50,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#f8f8f8',
            paddingHorizontal: 30,
            borderTopColor: 'silver',
            borderTopWidth: 0.5,
            marginBottom: 10
        }}>
            <Text style={{ fontSize: 12, fontWeight: '400', width: '50%', fontWeight: '500' }}>
                총 {heartProfileList.length}명
            </Text>

            <TouchableHighlight
                style={{ width: '50%', alignItems: 'flex-end' }}
                underlayColor='none'
                onPress={() => pressResetHeartList()}
            >
                <Text style={{ fontSize: 12, textAlign: 'right' }}>
                    찜 목록 초기화
                </Text>
            </TouchableHighlight>
        </View>
    )

}