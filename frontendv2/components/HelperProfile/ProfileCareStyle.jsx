
import { useState } from "react";
import { Text } from "react-native";
import { TouchableHighlight } from "react-native";
import { StyleSheet } from "react-native";
import { View } from "react-native";

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useSelector } from "react-redux";
import Icon from "../Icon";

export default function ProfileCareStyle() {

    const [toilet, setToilet] = useState(true);
    const [suction, setSuction] = useState(true);
    const [washing, setWashing] = useState(true);
    const [movement, setMovement] = useState(true);

    const { helpExperience } = useSelector(state => ({
        helpExperience: state.profile.userProfile.profile.helpExperience
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
                        underlayColor='none'
                        onPress={() => setToilet(!toilet)}
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
                                <Icon props={['material', toilet ? 'expand-less' : 'expand-more', 25, 'black']} />
                            </View>
                        </View>
                    </TouchableHighlight>

                    {toilet ?
                        <View style={styles.answer}>
                            <Text style={{
                                fontSize: 14,
                                color: '#808080',
                            }}>
                                {helpExperience.toilet}
                            </Text>
                        </View> : null
                    }

                    <TouchableHighlight
                        underlayColor='none'
                        onPress={() => setSuction(!suction)}
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
                                <Icon props={['material', suction ? 'expand-less' : 'expand-more', 25, 'black']} />
                            </View>
                        </View>
                    </TouchableHighlight>

                    {suction ?
                        <View style={styles.answer}>
                            <Text style={{
                                fontSize: 14,
                                color: '#808080',
                            }}>
                                {helpExperience.suction}
                            </Text>
                        </View> : null
                    }

                    <TouchableHighlight
                        underlayColor='none'
                        onPress={() => setWashing(!washing)}
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
                                <Icon props={['material', washing ? 'expand-less' : 'expand-more', 25, 'black']} />
                            </View>
                        </View>
                    </TouchableHighlight>

                    {washing ?
                    <View style={styles.answer}>
                        <Text style={{
                            fontSize: 14,
                            color: '#808080',
                            paddingLeft: 4
                        }}>
                            {helpExperience.washing}
                        </Text>
                    </View> : null
                    }

                    <TouchableHighlight
                        underlayColor='none'
                        onPress={() => setMovement(!movement)}
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
                                <Icon props={['material', movement ? 'expand-less' : 'expand-more', 25, 'black']} />
                            </View>
                        </View>
                    </TouchableHighlight>

                    {movement ?
                    <View style={styles.answer}>
                        <Text style={{
                            fontSize: 14,
                            color: '#808080',
                            paddingLeft: 4
                        }}>
                            {helpExperience.movement}
                        </Text>
                    </View> : null 
                    }
                </View>

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