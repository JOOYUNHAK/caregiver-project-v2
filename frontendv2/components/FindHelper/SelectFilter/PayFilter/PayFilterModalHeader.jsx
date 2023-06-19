/* 페이 필터 모달 헤더 */

import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import { heightPercentageToDP as hp} from "react-native-responsive-screen";

export default function PayFilterModalHeader() {
    return(
        <View style = {styles.modalHeader}>
            <Text style = {{fontSize: 13}}>
                일당
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    modalHeader: {
        height: hp('4%'),
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end'
    }
})