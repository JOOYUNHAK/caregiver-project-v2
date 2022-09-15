/* 내 계정 관리 프로필 -> 자격증 관리 부분 */

import { StackActions } from "@react-navigation/native";
import { useEffect } from "react";
import { useState } from "react";
import { BackHandler } from "react-native";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import MyCertificate from "../../../components/MyProfile/Profile/MyCertificate";
import StatusBarComponent from "../../../components/StatusBarComponent";
import api from "../../../config/CustomAxios";
import { requestRefreshToken } from "../../../functions/Token";
import { saveLicense, secondRegisterReset } from "../../../redux/action/register/secondRegisterAction";
import Loading from "../../Loading";

export default function Certificate({ navigation }) {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const { id } = useSelector(state => ({
        id: state.user.id
    }))
   
    useEffect(() => {
        /**
         * 자격증 정보 한번 받아오기 
         * 1개면 그대로 push, 2개 이상이면 map 돌려서 push
         */
        async function getLicense() {
            try {
                const res = await api.get(`user/certificate/${id}`);
                const { certificate } = res.data;
                if(certificate) {
                    if(certificate.includes(',')) {
                        let arr = certificate.split(',');
                        arr.map((certificate) => {
                            dispatch(saveLicense(certificate))
                        });
                    }
                    else {
                        dispatch(saveLicense(certificate));
                    }
                }
                setLoading(false);
            }
            catch (err) {
                await requestRefreshToken(navigation);
                getLicense();
            }
        }
        getLicense();

        function backAction() {
            setTimeout(() => {
                dispatch(secondRegisterReset());                
            }, 100);
        }

        BackHandler.addEventListener('hardwareBackPress', backAction);
        return () =>
            BackHandler.removeEventListener('hardwareBackPress', backAction);
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <StatusBarComponent />
            {loading ? 
                <Loading /> : 
                    <MyCertificate />
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    }
})