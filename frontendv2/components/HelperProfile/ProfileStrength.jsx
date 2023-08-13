/* 보조사 프로필 강점 */

import { StyleSheet } from "react-native";
import { Text, View } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useSelector } from "react-redux";

export default function ProfileStrength() {
    const { strengthList } = useSelector(state => ({
        strengthList: state.profile.userProfile.profile.strengthList
    }));

    return (
        <View style={styles.strength}>
            <View style={{ height: hp('4%'), justifyContent: 'flex-end' }}>
                <Text style={{ fontWeight: '500', fontSize: 16 }}>
                    나만의 강점
                </Text>
            </View>

            <View style = {{marginBottom: 5}}>
                {strengthList.length ?
                    (strengthList.map((strength, index) => {
                       return(
                        <Text key={index} style = {styles.strengthText}>
                            {index+1}. {strength}
                        </Text>
                       )
                    })) : 
                    <Text style = {styles.noListText}>
                        아직 등록한 강점이 없어요.
                    </Text>
                }
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    strength: {
        justifyContent: 'center',
        borderTopColor: '#e3e3e3',
        backgroundColor: "white",
        width: wp('100%'),
        height: 'auto',
        paddingLeft: 18,
        marginTop: 8,
        borderTopWidth: 0.2,
        paddingVertical: 15
    },

    strengthText: {
        fontSize: 15, 
        paddingLeft: 5, 
        marginTop: 15, 
        color: '#4d4d4d'
    },

    noListText: {
        marginTop: 15,
        fontSize: 14,
        color: '#a1a1a1',
    }
})