/* 프로필 상세보기 경고 내용*/

import { Text } from "react-native";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { useSelector } from "react-redux";

export default function ProfileWarning() {
    const { warningList } = useSelector((state) => ({
        warningList: state.profile.userProfile.warningList
    }))

    return (
        <View style={styles.warning}>
            <View style={{
                height: hp('4%'),
                justifyContent: 'flex-end'
            }}>
                <Text style={{
                    fontWeight: '500',
                    fontSize: 16
                }}>
                    신고내역
                </Text>
            </View>
            
            <View style = {{marginBottom: 5}}>
                <Text style = {styles.noListText}>
                    현재까지 신고받은 이력이 없어요.
                </Text>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    warning: {
        height: 'auto',
        borderTopColor: '#e3e3e3',
        backgroundColor: 'white',
        width: wp('100%'),
        marginTop: 8,
        borderTopWidth: 0.2,
        paddingVertical: 15,
        paddingLeft: 18
    },

    noListText: {
        marginTop: 15,
        fontSize: 14,
        color: '#a1a1a1'
    }

})



