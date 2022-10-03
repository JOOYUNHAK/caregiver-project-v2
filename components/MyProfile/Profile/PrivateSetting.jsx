/* 프로필 비공개 설정 */

import { useState } from "react";
import { Switch } from "react-native";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";
import Modal from 'react-native-modal';
import { toggleProfile } from "../../../redux/action/user/userAction";
import { TouchableHighlight } from "react-native";
import api from "../../../config/CustomAxios";
import { requestRefreshToken } from "../../../functions/Token";
import ModalHeader from "./PrivateSetting/ModalHeader";
import ModalMiddle from "./PrivateSetting/ModalMiddle";

export default function PrivateSetting({ navigation }) {
    const dispatch = useDispatch();
    const [isVisible, setIsVisible] = useState(false);

    const { id, purpose, profile_off } = useSelector(state => ({
        id: state.user.id,
        purpose: state.user.purpose,
        profile_off: state.user.profile_off
    }));
    
    /**
     * 프로필 공개 여부 업데이트 함수
     */
    const updateProfilePrivate = async () => {
        try {
            const res = await api.put('user/profile', {
                id: id,
                private: !profile_off
            })
            dispatch(toggleProfile(!profile_off))
            setIsVisible(!isVisible);
            console.log(res)
        }
        catch (err) {
            console.log(err.response)
            if(await requestRefreshToken(navigation))
                await updateProfilePrivate();
        }
    }

    return (

        <>
            <View style={styles.private}>
                <Text style={{ fontSize: 16, fontWeight: '400' }}>
                    프로필 비공개
                </Text>
                <View style={styles.switch}>
                    <Switch
                        trackColor={{ false: 'lightgray', true: '#63bdee' }}
                        thumbColor={profile_off ? 'white' : 'white'}
                        onTouchStart={() => setIsVisible(!isVisible)}
                        value={profile_off}
                    />
                </View>
            </View>

            <Modal
                isVisible={isVisible}
                onBackdropPress={() => setIsVisible(false)}
                onBackButtonPress={() => setIsVisible(false)}
                style={styles.modal}
                backdropTransitionOutTiming={0}
                swipeDirection='down'
                onSwipeComplete={() => setIsVisible(false)}
            >
                <View style={styles.modalContent}>
                    <ModalHeader profile_off={profile_off} />
                    <ModalMiddle profile_off={profile_off} purpose={purpose}/>

                    <TouchableHighlight
                        style={styles.btn}
                        underlayColor='none'
                        onPress={() => updateProfilePrivate()}
                    >
                        <Text style={styles.btnText}>
                            네, 전환할게요
                        </Text>
                    </TouchableHighlight>
                </View>
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    private: {
        flexDirection: 'row',
        height: hp('7%'),
        width: '100%',
        alignItems: 'center',
        paddingVertical: 15,
    },

    switch: {
        position: 'absolute',
        right: 0,
        paddingTop: 5
    },

    modalContent: {
        backgroundColor: 'white',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: hp('33%'),
        width: wp('100%'),
        borderRadius: 15,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },

    btn: {
        height: '25%',
        justifyContent: 'center',
        width: '95%'
    },

    btnText: {
        textAlign: 'center',
        paddingVertical: 13,
        borderRadius: 10,
        backgroundColor: '#7cd3ff',
        color: 'whitesmoke'
    },

    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    }
})