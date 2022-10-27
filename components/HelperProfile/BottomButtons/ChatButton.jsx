/* 프로필 하단 간병신청 버튼 */

import { StackActions, useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import Dialog from "react-native-dialog";
import { useSelector } from "react-redux";
import careApplication from "../../../api/Profile/careApplicationApi";
import { socket } from "../../../module/socket";

export default function ChatButton() {

    const { loginId, opponentId, profileId, name } = useSelector(state => ({
        loginId: state.user.id,
        opponentId: state.profile.userProfile.user.id,
        profileId: state.profile.userProfile.id,
        name: state.profile.userProfile.user.name
    }))

    const navigation = useNavigation();
    const [visible, setVisible] = useState(false);
    const [errMessage, setErrMessage] = useState('');

    //로그인 되어 있는지 아닌지
    const validateId = () => {
        if ( !loginId.length ) {
            navigation.dispatch(
                StackActions.push(
                    'loginPage'
                )
            )
            return;
        }
        setVisible(true)
    }

    const pressApplication = async () => {

        setVisible(false)
        const response = await careApplication(navigation);

        if (response?.message) {
            setTimeout(() => {
                setErrMessage(response.message);
                setVisible(true);
            }, 300);
            return;
        }

        navigation.dispatch(
            StackActions.push(
                'ChatPage',
                {
                    loginId,
                    opponentId,
                    profileId,
                    name
                }
            )
        )
        socket.emit('NEW_ROOM', `${loginId}:${opponentId}`);
    }

    const pressConfirm = () => {
        setVisible(false);
        setTimeout(() => {
            setErrMessage('');
        }, 300);
    }

    return (
        <>
            <TouchableHighlight
                underlayColor='none'
                onPress={() => validateId()}
                style={styles.chatButton}
            >
                <Text style={styles.chatText}>
                    간병신청
                </Text>
            </TouchableHighlight>

            <Dialog.Container
                contentStyle={styles.dialogContainer}
                onBackdropPress={() => setVisible(false)}
                onRequestClose={() => setVisible(false)}
                useNativeDriver={true}
                visible={visible}
            >
                <Dialog.Description
                    style={styles.dialogDescription}
                >
                    {
                        errMessage ? errMessage :
                            `환자분의 프로필이 채팅방 내로 바로 전송됩니다.\n간병 신청할까요?`
                    }


                </Dialog.Description>
                {
                    errMessage ?
                        <Dialog.Button
                            label='확인'
                            onPress={() => pressConfirm()}
                            style={styles.confirmButton}
                        />
                        :
                        <View style={{ flexDirection: 'row' }}>
                            <Dialog.Button
                                label='아니요'
                                onPress={() => setVisible(false)}
                                style={styles.cancelButton}
                            />
                            <Dialog.Button
                                label='신청할게요'
                                onPress={() => pressApplication()}
                                style={styles.applicationButton}
                            />
                        </View>

                }
            </Dialog.Container>
        </>
    )
}

const styles = StyleSheet.create({
    chatButton: {
        flexDirection: 'row',
        width: '55%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(65, 92, 118, 0.95)',
        height: '100%',
        borderRadius: 5
    },

    chatText: {
        fontSize: 16,
        fontWeight: '500',
        color: 'white'
    },

    dialogContainer: {
        alignItems: 'center',
        borderRadius: 10,
    },

    cancelButton: {
        color: 'rgba(65, 92, 118, 0.95)',
        marginRight: 15,
        paddingHorizontal: 30,
        borderWidth: 0.8,
        borderRadius: 3,
        borderColor: 'rgba(65, 92, 118, 0.95)'
    },

    applicationButton: {
        color: 'white',
        marginLeft: 15,
        paddingHorizontal: 30,
        borderRadius: 3,
        borderWidth: 1,
        borderColor: 'rgba(65, 92, 118, 0.85)',
        backgroundColor: 'rgba(65, 92, 118, 0.85)'
    },

    confirmButton: {
        color: 'white',
        paddingHorizontal: 30,
        borderRadius: 3,
        borderWidth: 1,
        borderColor: 'rgba(65, 92, 118, 0.85)',
        backgroundColor: 'rgba(65, 92, 118, 0.85)'
    },

    dialogDescription: {

        fontSize: 15,
        color: '#756e6f',
        textAlign: 'center'
    }
})