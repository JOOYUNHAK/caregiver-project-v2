/* 상세 프로필 제일 하단 리뷰보기, 채팅 버튼 */

import { Text } from "react-native";
import { TouchableHighlight } from "react-native";
import { View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

export default function BottomButtons() {

    return (
            <View style={{
                height: 65,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
                width: wp('100%'),
                backgroundColor: 'white',
                borderTopColor: 'silver',
                borderTopWidth: 0.3,
                paddingVertical:10,
                paddingHorizontal: 10
            }}>

                <TouchableHighlight
                    underlayColor='none'
                    onPress={() => console.log('review')}
                    style = {{
                    width: '35%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 1.2,
                    height: '100%',
                    borderRadius: 5,
                    borderColor: 'rgba(65, 92, 118, 0.95)'}}
                >
                    <Text style={{  fontSize: 16,
        fontWeight:  '500' ,
        color: 'rgba(65, 92, 118, 0.95)' }}>
                        후기
                    </Text>
                </TouchableHighlight>

                <TouchableHighlight
                    underlayColor='none'
                    onPress={() => console.log('review')}
                    style = {{
                        flexDirection: 'row',
                        width: '55%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(65, 92, 118, 0.95)',
                        height: '100%',
                        borderRadius: 5}}
                >
                    <Text style={{ fontSize: 16,
        fontWeight: '500',
        color: 'white' }}>
                        간병신청
                    </Text>
                </TouchableHighlight>

            </View>
    )
}