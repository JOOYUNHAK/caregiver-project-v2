/* 상세 프로필 제일 하단 리뷰보기, 채팅 버튼 */

import { Text } from "react-native";
import { View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import Icon from "../Icon";

export default function BottomButtons() {

    return(
        <View style = {{
            height: 60, 
            flexDirection: 'row', 
            alignItems:'center',
            width: wp('100%'),
            backgroundColor: 'white',
            borderTopColor: 'black',
            borderTopWidth: 0.5
            }}>
            <View style = {{
                flexDirection: 'row',
                width: '40%',
                alignItems: 'center',
                justifyContent: 'center',
                borderRightColor: 'silver',
                borderRightWidth: 0.2,
                height: '100%'

            }}>
            <Text style = {{fontSize: 18}}>
                후기
            </Text>
            <Icon props={['material', 'menu-book', 25, 'black']} />
            </View>

            <View style = {{
                flexDirection: 'row',
                width: '60%',
                alignItems: 'center',
                justifyContent: 'center'

            }}>
            <Text style = {{fontSize: 18, marginRight: 5}}>
                간병신청
            </Text>
            <Icon props={['ionicon', 'chatbubbles-outline', 26, 'black']} />

            </View>

        </View>
    )
}