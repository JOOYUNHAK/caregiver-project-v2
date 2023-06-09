/* 환자 분 정보 확인하는 버튼 */

import { useState } from "react";
import { Text } from "react-native";
import { ScrollView } from "react-native";
import { StyleSheet } from "react-native";
import { TouchableHighlight } from "react-native";
import { View } from "react-native";
import Modal from 'react-native-modal';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import requestPatientProfile from "../../../api/Profile/requestPatientProfile";
import { socket, socketEvent } from "../../../module/socket";
import { saveMessage, stateUpdate } from "../../../redux/action/chat/chatAction";
import Icon from "../../Icon";

export default function PatientProfileButton({ protectorId, roomId, messageContent }) {
    const dispatch = useDispatch();
    let { patientProfile, id } = useSelector(state => ({
        id: state.user.id,
        patientProfile: state.chat.patientProfile,
    }),
        shallowEqual
    )
    const [visible, setVisible] = useState(false);
    const [header, setHeader] = useState('');

    const pressPatientInfo = () => {
        setVisible(true);

        requestPatientProfile(protectorId);
        //간병인이 프로필을 확인했을 경우에만 업데이트
        if( protectorId === id || messageContent )
            return;
        socket.emit('check_application', {
            protectorId,
            roomId,
            state: 1
        });
        dispatch(
            stateUpdate([roomId, 1])
        );
    }

    const responseApplication = (response) => {
        setVisible(false);
        const responseMessage = {
            roomId,
            sendId: id,
            content: response,
            visible: null,
            type: response === 'reject' ? -1 : 2,
            time: new Date(),
        }
        //응답 거절일경우
        if (response === 'reject') {
            dispatch(
                saveMessage(responseMessage)
            )
            dispatch(
                stateUpdate([roomId, -1, response])
            );

            socket.emit('response_application', {
                responseMessage,
                protectorId,
                state: -1,
                response
            },)

            return;
        }

        //응답 수락일경우
        dispatch(
            saveMessage(responseMessage)
        )
        dispatch(
            stateUpdate([roomId, 2, response])
        );

        socket.emit('response_application', {
            responseMessage,
            protectorId,
            state: 2,
            response
        })

    }

    const onScrollHandler = (e) => {
        if (e.nativeEvent.contentOffset.y > 50) {
            setHeader('환자분 정보')
        } else
            setHeader('')
    }

    return (
        <View style={styles.patientProfileButton}>
            <TouchableHighlight
                onPress={() => pressPatientInfo()}
                underlayColor='none'
                style={styles.buttonStyle}
            >
                <Text style={styles.buttonText}>
                    환자분 정보 확인
                </Text>
            </TouchableHighlight>

            <Modal
                isVisible={visible}
                onBackdropPress={() => setVisible(false)}
                onBackButtonPress={() => setVisible(false)}
                backdropTransitionOutTiming={0}
                style={{
                    justifyContent: 'flex-end',
                    margin: 0
                }}
                swipeDirection='down'
                onSwipeComplete={() => setVisible(false)}
                propagateSwipe={true}
            >
                <View style={{
                    backgroundColor: 'white',
                    height: hp('80%'),
                    width: wp('100%'),
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15,
                }}>

                    <View
                        onStartShouldSetResponder={() => true}
                        style={{

                            width: '100%',
                            height: '100%'
                        }}
                    >
                        <View style={{
                            paddingHorizontal: 20,
                            flexDirection: 'row',
                            alignItems: 'flex-end',
                            marginBottom: 15
                        }}>

                            <Text style={{
                                width: '50%',
                                fontSize: 18,
                                fontWeight: '500'
                            }}>
                                {header}
                            </Text>

                            <View style={{
                                width: '50%',
                            }}>
                                <TouchableHighlight
                                    underlayColor='none'
                                    onPress={() => setVisible(false)}
                                    style={{
                                        alignSelf: 'flex-end',
                                        marginTop: '5%',
                                    }}>
                                    <Icon props={['material', 'close', 28, 'black']} />
                                </TouchableHighlight>
                            </View>
                        </View>

                        <ScrollView
                            onScroll={onScrollHandler}
                            showsVerticalScrollIndicator={false}
                            style={{
                                paddingHorizontal: 20,
                            }}
                        >
                            <View style={{

                                marginTop: '3%'
                            }}>
                                <Text style={{
                                    fontSize: 18,
                                    fontWeight: '500',
                                    borderBottomColor: 'darkgray',
                                    borderBottomWidth: 0.5,
                                    paddingBottom: 10
                                }}>
                                    간병 신청해주신 보호자분께서 {'\n'}
                                    작성하신 환자분 정보에요
                                </Text>
                            </View>

                            <View style={{
                                marginTop: '5%',
                            }}>
                                <View style={styles.eachContent}>
                                    <Text style={styles.title}>
                                        기본정보
                                    </Text>

                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        marginTop: '2%',
                                        paddingRight: 30
                                    }}>
                                        <View style={{
                                            flexDirection: 'row',
                                        }}>
                                            <Text style={styles.content}>
                                                성별
                                            </Text>
                                            <View style={styles.verticalLine} />
                                            <Text style={styles.userValue}>
                                                {patientProfile.sex}
                                            </Text>

                                        </View>

                                        <View style={{
                                            flexDirection: 'row',
                                        }}>
                                            <Text style={styles.content}>
                                                몸무게
                                            </Text>
                                            <View style={styles.verticalLine} />
                                            <Text style={styles.userValue}>
                                                {patientProfile.weight}kg
                                            </Text>

                                        </View>

                                        <View style={{
                                            flexDirection: 'row',
                                        }}>
                                            <Text style={styles.content}>
                                                다음 병원
                                            </Text>
                                            <View style={styles.verticalLine} />
                                            <Text style={styles.userValue}>
                                                {patientProfile.next}
                                            </Text>

                                        </View>

                                    </View>
                                </View>

                                <View style={styles.eachContent}>
                                    <Text style={styles.title}>
                                        기간
                                    </Text>

                                    <View style={{ marginTop: '2%' }}>
                                        {
                                            !!patientProfile.end ?
                                                <Text style={styles.userValue}>
                                                    {patientProfile.start} ~ {patientProfile.end}
                                                </Text>
                                                :
                                                <Text style={styles.userValue}>
                                                    {patientProfile.start} (총 1일)
                                                </Text>
                                        }
                                    </View>
                                </View>

                                <View style={styles.eachContent}>
                                    <Text style={styles.title}>
                                        장소
                                    </Text>
                                    <View style={{ marginTop: '2%' }}>
                                        <Text style={styles.userValue}>
                                            {patientProfile.place}
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.eachContent}>
                                    <Text style={styles.title}>
                                        진단명
                                    </Text>
                                    <View style={{ marginTop: '2%' }}>
                                        <Text style={styles.userValue}>
                                            {patientProfile.diagnosis}
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.eachContent}>
                                    <Text style={styles.title}>
                                        현재 환자분 상태
                                    </Text>
                                    <View style={{ marginTop: '2%', paddingRight: 10 }}>
                                        <Text style={styles.userValue}>
                                            {patientProfile.state}
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.lastContent}>
                                    <Text style={styles.title}>
                                        이런 부분에선 도움이 필요해요
                                    </Text>
                                    <View style={{ marginTop: '2%' }}>

                                        {
                                            !!patientProfile.suction ?
                                                <View style={styles.eachQuestion}>
                                                    <Text style={styles.question}>
                                                        Q. 기침이 잦으시고 가래가 많으신가요?
                                                    </Text>
                                                    <Text style={styles.answer}>
                                                        {patientProfile.suction}
                                                    </Text>
                                                </View>
                                                : null
                                        }
                                        {
                                            !!patientProfile.toilet ?
                                                <View style={styles.eachQuestion}>
                                                    <Text style={styles.question}>
                                                        Q. 용변을 해결하는데 도움이 필요하신가요?
                                                    </Text>
                                                    <Text style={styles.answer}>
                                                        {patientProfile.toilet}
                                                    </Text>
                                                </View>
                                                : null
                                        }
                                        {
                                            !!patientProfile.bedSore ?
                                                <View style={styles.eachQuestion}>
                                                    <Text style={styles.question}>
                                                        Q. 환자분 스스로 움직이시는게 불편하신가요?
                                                    </Text>
                                                    <Text style={styles.answer}>
                                                        {patientProfile.bedSore}
                                                    </Text>
                                                </View>
                                                : null
                                        }
                                        {
                                            !!patientProfile.meal ?
                                                <View style={styles.eachQuestion}>
                                                    <Text style={styles.question}>
                                                        Q. 식사하실 때 도움이 필요하신가요?
                                                    </Text>
                                                    <Text style={styles.answer}>
                                                        {patientProfile.meal}
                                                    </Text>
                                                </View>
                                                : null
                                        }
                                        {
                                            !!patientProfile.washing ?
                                                <View style={styles.eachQuestion}>
                                                    <Text style={styles.question}>
                                                        Q. 환자분 스스로 씻는게 많이 어려우신가요?
                                                    </Text>
                                                    <Text style={styles.answer}>
                                                        {patientProfile.washing}
                                                    </Text>
                                                </View>
                                                : null
                                        }
                                        {
                                            !!patientProfile.bathChair ?
                                                <View style={styles.eachQuestion}>
                                                    <Text style={styles.question}>
                                                        Q. 환자분이 휠체어를 이용하고 계신가요?
                                                    </Text>
                                                    <Text style={styles.answer}>
                                                        {patientProfile.bathChair}
                                                    </Text>
                                                </View>
                                                : null
                                        }
                                    </View>
                                </View>

                            </View>
                        </ScrollView>
                        {
                            messageContent ?
                                <View style={styles.bottomButtons}>
                                    <TouchableHighlight
                                        underlayColor='none'
                                        disabled={true}
                                        style={styles.protectorButton}
                                    >
                                        <Text style={styles.protectorText}>
                                            이미 마감된 신청이에요.
                                        </Text>
                                    </TouchableHighlight>
                                </View>
                                :

                                (protectorId === id ?
                                <View style={styles.bottomButtons}>
                                    <TouchableHighlight
                                        underlayColor='none'
                                        disabled={true}
                                        style={styles.protectorButton}
                                    >
                                        <Text style={styles.protectorText}>
                                            응답을 기다리는 중이에요
                                        </Text>
                                    </TouchableHighlight>
                                </View>

                                :
                                <View style={styles.bottomButtons}>

                                    <TouchableHighlight
                                        underlayColor='none'
                                        onPress={() => responseApplication('reject')}
                                        style={styles.reviewButton}
                                    >
                                        <Text style={styles.reviewText}>
                                            거절할게요
                                        </Text>
                                    </TouchableHighlight>

                                    <TouchableHighlight
                                        underlayColor='none'
                                        onPress={() => responseApplication('accept')}
                                        style={styles.chatButton}
                                    >
                                        <Text style={styles.chatText}>
                                            수락할게요
                                        </Text>
                                    </TouchableHighlight>

                                </View>
                                )
                        }

                    </View>
                </View>
            </Modal>

        </View>
    )
}

const styles = StyleSheet.create({
    patientProfileButton: {
        marginVertical: 25,
        alignItems: 'center',
        marginHorizontal: 25,
    },

    buttonStyle: {
        marginLeft: 10,
        width: '100%',
        paddingVertical: 14,
        borderColor: 'white',
        borderRadius: 20,
        backgroundColor: 'rgba(65, 92, 118, 0.85)'
    },

    buttonText: {
        textAlign: 'center',
        color: 'white',
    },

    eachContent: {
        marginTop: '5%',
        borderBottomColor: 'lightgray',
        borderBottomWidth: 0.3,
        paddingBottom: 10
    },

    title: {
        fontSize: 16,
        fontWeight: '500'
    },

    content: {
        color: 'darkgray',
    },

    userValue: {
        color: '#545454',
    },

    verticalLine: {
        borderWidth: 0.3,
        height: '50%',
        marginTop: 6,
        borderColor: 'silver',
        marginHorizontal: 5
    },

    eachQuestion: {
        marginTop: '5%',
        paddingLeft: 5,
    },

    question: {
        fontSize: 15
    },

    answer: {
        color: '#545454',
        paddingLeft: 2,
        marginTop: '2%',
        fontSize: 14,
        paddingLeft: 20
    },

    lastContent: {
        marginTop: '5%',
        paddingBottom: 30
    },

    bottomButtons: {

        borderTopColor: 'lightgray',
        borderTopWidth: 0.2,
        elevation: 5,
        paddingHorizontal: 15,
        height: 65,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        backgroundColor: 'white',
        paddingVertical: 10,
    },

    protectorButton: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(65, 92, 118, 0.25)',
        height: '100%',
        borderRadius: 5,
    },

    protectorText: {
        fontSize: 16,
        fontWeight: '500',
        color: 'white'
    },

    chatButton: {
        flexDirection: 'row',
        width: '45%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(65, 92, 118, 0.95)',
        height: '100%',
        borderRadius: 5,
    },

    chatText: {
        fontSize: 16,
        fontWeight: '500',
        color: 'white'
    },

    reviewButton: {
        width: '45%',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1.2,
        height: '100%',
        borderRadius: 5,
        borderColor: 'rgba(65, 92, 118, 0.95)'
    },

    reviewText: {
        fontSize: 16,
        fontWeight: '500',
        color: 'rgba(65, 92, 118, 0.95)'
    },

})