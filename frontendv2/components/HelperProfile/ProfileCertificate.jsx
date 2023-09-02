/* 보조사 프로필 자격증 부분 */

import { Text } from "react-native";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { useSelector } from "react-redux"

export default function ProfileCertificate() {
    const { licenseList } = useSelector(state => ({
        licenseList: state.profile.userProfile.licenseList
    }));

    return (
        <View style={styles.certificate}>
            <View style={{ height: hp('4%'), justifyContent: 'flex-end' }}>
                <Text style={{ fontWeight: '500', fontSize: 16 }}>
                    자격증
                </Text>
            </View>
            {licenseList.length ? 
                <View style = {styles.certificateList}>
                    {(licenseList).map((license) => {
                        return(
                            <Text key={license} style = {styles.eachPart}>
                                {license}
                            </Text>
                        )
                    })}
                </View> :
                <Text style = {styles.noListText}>
                    아직 등록된 자격증이 없습니다.
                </Text>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    certificate: {
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

    certificateList: {
        flexDirection: 'row',
        marginTop: 20,
        flexWrap: 'wrap',
    },

    eachPart: {
        paddingVertical: 5,
        marginVertical: 4,
        paddingHorizontal: 15,
        fontSize: 14,
        color: '#5d5d5d',
        borderWidth: 0.5,
        borderRadius: 15,
        marginRight: 10,
    },

    noListText: {
        marginTop: 15,
        fontSize: 14,
        color: '#a1a1a1',
    }
})