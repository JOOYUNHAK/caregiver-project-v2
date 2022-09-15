
import { Text } from "react-native";
import { TouchableHighlight } from "react-native";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useSelector } from "react-redux";
import { getAge } from "../../functions/Profile/profileFunctions";
import Icon from "../../components/Icon";


export default function ProfileHeader() {
    const { userProfile } = useSelector(state => ({
        userProfile: state.profile.userProfile
    }));

    const age = getAge(userProfile.user.birth);
    return (
        <View style={{
            height: hp('20%'),
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 18,
            width: wp('100%'),
            backgroundColor: 'white',
        }}>
            <View style={{
                flexDirection: 'column',
                height: '90%',
                width: '100%',
                justifyContent: 'flex-end',
            }}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontWeight: '500', fontSize: 15, marginBottom: 3 }}>
                        {userProfile.user.sex},
                    </Text>
                    <Text style={{ fontWeight: '500', fontSize: 15, marginLeft: 3 }}>
                        {age}세
                    </Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <Text style={{
                        fontSize: 20,
                        fontWeight: '600'
                    }}>
                        믿음의 {userProfile.user.purpose} {userProfile.user.name}님
                    </Text>
                    <View style={{ position: 'absolute', right: 15, paddingTop: 3 }}>
                        <Icon props={['material', 'favorite-border', 22, 'black']} />
                    </View>
                </View>

                <View style={{
                    flexDirection: 'row',
                    marginLeft: -2,
                    marginTop: 8
                }}>

                    <Icon props={['material-community', 'star', 19, 'gold']} />
                    <Text style={{
                        fontSize: 15,
                        fontWeight: '500',
                        marginLeft: 2
                    }}>
                        4.5
                    </Text>

                    <TouchableHighlight style={{ marginLeft: 12 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 15 }}>
                                후기 30개
                            </Text>

                            <View>
                                <Icon props={['material', 'chevron-right', 20, 'black']} />
                            </View>
                        </View>
                    </TouchableHighlight>
                </View>

                <View style={styles.profileHelperAppeal}>
                    <Icon props={['material', 'campaign', 21, 'silver']} />
                    <Text style={styles.profileHelperAppealText}>
                        {userProfile.notice}
                    </Text>
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