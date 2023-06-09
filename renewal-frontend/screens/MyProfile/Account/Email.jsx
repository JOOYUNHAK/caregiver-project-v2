/**  
 * 내 프로필 -> 계정 부분에서 이메일 클릭하였을 때 나오는 페이지
    이메일이 등록된 사용자는 이메일 변경, 아닌 사용자는 이메일 등록이 나타남 
 * @todo 인증된 이메일에서 이메일을 변경   
*/

import { CommonActions, StackActions } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { Platform } from "react-native";
import { BackHandler } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector} from "react-redux";
import BackBtn from "../../../components/Btn/BackBtn";
import CloseBtn from "../../../components/Btn/CloseBtn";
import RegisteredUserEmail from "../../../components/Email/isAuthed/RegisteredUserEmail";
import RegisterEmail from "../../../components/Email/IsNotAuthed/RegisterEmail";
import StatusBarComponent from "../../../components/StatusBarComponent";
import { reset } from "../../../redux/action/login/loginAction";

export default function Email({ navigation }) {
    const dispatch = useDispatch();
    
    const { email } = useSelector(state => ({
        email: state.user.email
    }));

    const backAction = () => {
        navigation.dispatch(
            StackActions.pop()
        );
        dispatch(reset())
        return true;
    };

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', backAction);
        return () =>
            BackHandler.removeEventListener('hardwareBackPress', backAction);
    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: email ? '이메일' : '이메일 등록',
            headerTitleAlign: 'left',
            headerTitleStyle: {
                fontSize: Platform.OS === 'ios' ? 16 : 19,
                marginLeft: 15
            },
            headerLeftContainerStyle: {
                left: 10
            },
            headerLeft: () => ( 
                email ?
                    <BackBtn navigation={navigation} type='default' /> :
                    <CloseBtn navigation={navigation} type='authEmail' />
            )
        })
    })

    return (
        <SafeAreaView style={styles.container} >
            <StatusBarComponent />
            { !email ?
                <RegisterEmail  navigation={navigation}/>
                : <RegisteredUserEmail navigation={navigation}/>
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignContent: 'center',
        backgroundColor: 'white',
    },
})