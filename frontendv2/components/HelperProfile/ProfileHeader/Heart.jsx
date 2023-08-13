/* 특정 간병인 프로필 찜 */

import { StackActions, useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { View } from "react-native";
import { Text } from "react-native";
import { StyleSheet } from "react-native";
import { TouchableHighlight } from "react-native";
import { shallowEqual, useSelector } from "react-redux";
import RegisterHeart from "../../../api/Profile/registerHeart";
import { requestRefreshToken } from "../../../functions/Token";
import Icon from "../../Icon";
import Dialog from "react-native-dialog";

export default function Heart() {
    const navigation = useNavigation();
    const [visible, setVisible] = useState(false);
    const [errMessage, setErrMessage] = useState('');
    // let { loginId, userHeartCount, userIsHearted, userProfileId } = useSelector(state => ({
    //     loginId: state.user.id,
    //     userHeartCount: state.profile.userProfile.heart.heartCount,
    //     userIsHearted: state.profile.userProfile.heart.isHearted,
    //     userProfileId: state.profile.userProfile.id
    // }),
    //     shallowEqual
    // );


    // const registerHeart = async () => {
    //     let result;
    //     if (!!loginId) {
    //         result = await RegisterHeart(userProfileId, navigation);
    //     }
    //     else {
    //         //로그인이 되어있지 않으면 refreshToken 확인 후 다시 재 호출
    //         if (await requestRefreshToken(navigation)) {
    //             result = await RegisterHeart(userProfileId, navigation);
    //         }
    //     }
    //     if (result?.message) {
    //         setErrMessage(result.message)
    //         setVisible(true);
    //     }
    // }

    return (
        <>
            <TouchableHighlight
                style={styles.heartTouch}
                underlayColor='none'
                onPress={() => console.log('heart click')}
            >
                <View>
                    <Icon props={['material', 'favorite-border', 22, 'black']} />
                    {/* <Icon props={[
                        'material',
                        !!userIsHearted ? 'favorite' : 'favorite-border',
                        22,
                        !!userIsHearted ? 'red' : 'black'
                    ]}
                    /> */}
                    <Text style={styles.heartCount}>
                        0
                    </Text>
                </View>
            </TouchableHighlight>
            
            <Dialog.Container
                contentStyle={styles.dialogContainer}
                onBackdropPress={() => setVisible(false)}
                onRequestClose={() => setVisible(false)}
                visible={visible}>
                <Dialog.Description
                    style={styles.dialogDescription}
                >
                    {errMessage}
                </Dialog.Description>
                <Dialog.Button
                    label='확인'
                    onPress={() => setVisible(false)}
                    style = {{ 
                        color: 'white', 
                        paddingHorizontal: 30, 
                        borderRadius: 3, 
                        backgroundColor:'rgba(65, 92, 118, 0.85)' 
                    }}
                />
            </Dialog.Container>
            
        </>
    )
}

const styles = StyleSheet.create({
    heartTouch: {
        position: 'absolute',
        right: 15,
        paddingTop: 3,
        flexWrap: 'wrap'
    },

    heartCount: {
        textAlign: 'center',
        fontSize: 10,
        color: '#392f31',
        marginLeft: 2
    },

    dialogContainer: {
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 10, 
        marginTop: -50
    },

    dialogDescription: {
        fontSize: 15, 
        //color: '#756e6f',
        color: '#756e6f', 
        textAlign: 'center'
    }
})