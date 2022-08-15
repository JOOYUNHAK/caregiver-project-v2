/* 회원가입 두번째 페이지 */

import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux"
import Icon from "../components/Icon";
import StatusBarComponent from "../components/StatusBarComponent";

export default function SecondRegister() {
    const purpose = useSelector((state) => state.firstRegister.user.purpose); //가입목적
    const [weight, setWeight] = useState('');
    const [career, setCareer] = useState('');
    return (
        <SafeAreaView style={styles.container}>
            <StatusBarComponent />
            <KeyboardAwareScrollView
                keyboardShouldPersistTaps = 'handled'
                extraHeight={150}
                extraScrollHeight={30}
                enableOnAndroid = {true}
                enableAutomaticScroll={true}
                scrollEnabled={true}
                showsVerticalScrollIndicator={false} >
            
            <View style ={styles.weightAndCareer}>
                <View style = {styles.weight}>
                    <Text style = {{fontSize: 16}}>
                        몸무게
                    </Text>
                    <TextInput 
                        onChangeText = {(text) => { setWeight(text) }}
                        style = {styles.weightInput}
                    />
                    <Text>
                        (Kg)
                    </Text>

                </View>

                <View style = {styles.career}>
                    <Text style = {{fontSize: 16}}>
                        경력
                    </Text>
                    <TextInput 
                        onChangeText = {(text) => { setWeight(text) }}
                        style = {styles.weightInput}
                    />
                    <Text>
                        (개월)
                    </Text>
                </View>
               
            </View>
            
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        
    },

    weightAndCareer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 1,
        marginTop: 30
    },

    weight: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: 15,
    },

    weightInput: {
        borderWidth: 0.5,
        borderColor: 'silver', 
        width: '30%', 
        marginLeft: 15,
        borderRadius: 8, 
        paddingVertical: 3, 
        fontSize: 18, 
        marginRight: 5
    },

    career: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: 10
    }


})