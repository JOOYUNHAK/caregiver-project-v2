import { Text } from "react-native";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useSelector } from "react-redux";
import { getCareer, isEqualPay } from "../../functions/Profile/profileFunctions";

export default function ProfileBasicInfo() {

    const { userProfile } = useSelector(state => ({
        userProfile: state.profile.userProfile
    }));
    
    let career = userProfile.career;
    if (career >= 12)
        career = getCareer(career);
    const equalPay = isEqualPay(userProfile.pay);

    return (
        <View style={{
            height: hp('20%'),
            paddingHorizontal: 18,
            backgroundColor: 'white',
            marginTop: 8
        }}>

            <View style={{
                height: '30%',
                justifyContent: 'flex-end',
                borderTopColor: '#e3e3e3',
                borderTopWidth: 0.2,
            }}>
                <Text style={{
                    fontSize: 16,
                    fontWeight: '500',
                }}>
                    기본정보
                </Text>
            </View>

            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                height: '70%',
                paddingVertical: 15
            }}>
                <View style={{
                    width: '45%',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.title}>
                            경력
                        </Text>
                        <View style={styles.verticalLine} />
                        <Text style={styles.userValue}>
                            {career}
                        </Text>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.title}>
                            일당
                        </Text>
                        <View style={styles.verticalLine} />
                        <Text style={styles.userValue}>
                            {equalPay ?
                                `${equalPay}만원` :
                                (userProfile.pay)
                            }
                        </Text>
                    </View>
                </View>



                <View style={{
                    width: '55%',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                }}>
                    <View style={{ flexDirection: 'row', marginRight: 10 }}>
                        <Text style={styles.title}>
                            지역
                        </Text>
                        <View style={styles.verticalLine} />
                        <Text style={[styles.userValue, { flexWrap: 'wrap' }]}>
                            {userProfile.possibleArea}
                        </Text>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.title}>
                            시작 가능 날짜
                        </Text>
                        <View style={styles.verticalLine} />
                        <Text style={styles.userValue}>
                            {userProfile.startDate}
                        </Text>
                    </View>
                </View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: 'whitesmoke'
    },

    profileHelperAppeal: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingLeft: 5
    },

    profileHelperAppealText: {
        fontSize: 14,
        paddingLeft: 3,
        color: 'darkgray',
    },

    title: {
        color: 'darkgray',
        fontWeight: '400',
        fontSize: 15,
    },

    verticalLine: {
        borderWidth: 0.3,
        height: '50%',
        marginTop: 6,
        borderColor: 'silver',
        marginHorizontal: 5
    },

    userValue: {
        color: '#545454',
        fontSize: 15
    },
});