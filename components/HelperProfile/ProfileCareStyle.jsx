
import { Text } from "react-native";
import { TouchableHighlight } from "react-native";
import { StyleSheet } from "react-native";
import { View } from "react-native";

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useSelector } from "react-redux";
import Icon from "../Icon";



export default function ProfileCareStyle() {

    const { userProfile } = useSelector(state => ({
        userProfile: state.profile.userProfile
    }));

    return (
        <>
            <View style={styles.careStyle}>
                <View style={{ height: hp('5%'), justifyContent: 'flex-end' }}>
                    <Text style={{ fontWeight: '500', fontSize: 16 }}>
                        케어스타일
                    </Text>
                </View>

                <View style={styles.eachCareStyle}>
                    <TouchableHighlight
                        style={styles.questionTouch}
                    >
                        <View style={styles.question}>
                            <Text style={{
                                fontSize: 15,
                                paddingLeft: 2
                            }}>
                                Q. 용변처리는 어떻게 하시나요?
                            </Text>
                            <View style={{ position: 'absolute', right: 10 }}>
                                <Icon props={['material', 'expand-more', 25, 'black']} />
                            </View>
                        </View>
                    </TouchableHighlight>


                    <View style={styles.answer}>
                        <Text style={{
                            fontSize: 14,
                            color: '#808080',
                        }}>
                            {userProfile.toilet}
                        </Text>
                    </View>

                    <TouchableHighlight
                        style={styles.questionTouch}
                    >
                        <View style={styles.question}>
                            <Text style={{
                                fontSize: 15,
                                paddingLeft: 2
                            }}>
                                Q. 석션은 어떻게 하시나요?
                            </Text>
                            <View style={{ position: 'absolute', right: 10 }}>
                                <Icon props={['material', 'expand-more', 25, 'black']} />
                            </View>
                        </View>
                    </TouchableHighlight>


                    <View style={styles.answer}>
                        <Text style={{
                            fontSize: 14,
                            color: '#808080',
                            paddingLeft: 4
                        }}>
                            {userProfile.suction}
                        </Text>
                    </View>

                    <TouchableHighlight
                        style={styles.questionTouch}
                    >
                        <View style={styles.question}>
                            <Text style={{
                                fontSize: 15,
                                paddingLeft: 2
                            }}>
                                Q. 환자분의 청결은 어떻게 하시나요?
                            </Text>
                            <View style={{ position: 'absolute', right: 10 }}>
                                <Icon props={['material', 'expand-more', 25, 'black']} />
                            </View>
                        </View>
                    </TouchableHighlight>


                    <View style={styles.answer}>
                        <Text style={{
                            fontSize: 14,
                            color: '#808080',
                            paddingLeft: 4
                        }}>
                            {userProfile.washing}
                        </Text>
                    </View>

                    <TouchableHighlight
                        style={styles.questionTouch}
                    >
                        <View style={styles.question}>

                            <Text style={{
                                fontSize: 15,
                                paddingLeft: 2
                            }}>
                                Q. 욕창 관리는 어떻게 하시나요?
                            </Text>
                            <View style={{ position: 'absolute', right: 10 }}>
                                <Icon props={['material', 'expand-more', 25, 'black']} />
                            </View>
                        </View>
                    </TouchableHighlight>


                    <View style={styles.answer}>
                        <Text style={{
                            fontSize: 14,
                            color: '#808080',
                            paddingLeft: 4
                        }}>
                            {userProfile.bedsore}
                        </Text>
                    </View>
                </View>

            </View>

            <View style={{ borderWidth: 1, height: hp('10%') }}>

            </View>
        </>
    )
}

const styles = StyleSheet.create({
    careStyle: {
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

    eachCareStyle: {
        height: 'auto',
        paddingTop: 15,
        paddingBottom: 20
    },

    questionTouch: {
        height: hp('7%'),
        borderBottomWidth: 0.2,
        borderRadius: 3,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 20,
    },

    question: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
    },

    answer: {
        height: hp('7%'),
        borderBottomWidth: 0.2,
        borderRadius: 3,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 20,
        paddingLeft: 20
    }
})