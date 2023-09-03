/* 특정 간병인 프로필 찜 */

import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { View } from "react-native";
import { Text } from "react-native";
import { StyleSheet } from "react-native";
import { TouchableHighlight } from "react-native";
import { shallowEqual, useSelector } from "react-redux";
import RegisterHeart from "../../../api/Profile/registerHeart";
import Icon from "../../Icon";
import Dialog from "react-native-dialog";

export default function Heart() {
    const navigation = useNavigation();
    const [visible, setVisible] = useState(false);
    const [errMessage, setErrMessage] = useState('');
    let { userHeartCount, userIsHearted, userProfileId } = useSelector(state => ({
        userHeartCount: state.profile.userProfile.profile.likeMetadata.count,
        userIsHearted: state.profile.userProfile.profile.likeMetadata.isLiked,
        userProfileId: state.profile.userProfile.profile.id
    }),
        shallowEqual
    );


    const registerHeart = async () => {

        const result = await RegisterHeart(userProfileId, navigation);
        
        if (result?.message) {
            setErrMessage(result.message)
            setVisible(true);
        }
    }

    return (
        <>
            <TouchableHighlight
                style={styles.heartTouch}
                underlayColor='none'
                onPress={() => registerHeart()}
            >
                <View>
                    <Icon props={[
                        'material',
                        !!userIsHearted ? 'favorite' : 'favorite-border',
                        22,
                        !!userIsHearted ? 'red' : 'black'
                    ]}
                    />
                    <Text style={styles.heartCount}>
                    {userHeartCount}
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