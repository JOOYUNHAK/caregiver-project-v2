/* 프로필 수정 선택 페이지 */

import { StyleSheet } from "react-native";
import { View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import EachModifyBtn from "../../../components/MyProfile/Profile/Modify/EachModifyBtn";
import ModifyHeader from "../../../components/MyProfile/Profile/Modify/ModifyHeader";
import StatusBarComponent from "../../../components/StatusBarComponent";

export default function SelectModifyPage() {

    return (
        <SafeAreaView style={styles.container}>
            <StatusBarComponent />
            <View style={styles.modifyPage}>
                <ModifyHeader />
                <EachModifyBtn />
            </View>
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

    modifyPage: {
        marginVertical: hp('10%'),
        paddingHorizontal: 20
    },

})