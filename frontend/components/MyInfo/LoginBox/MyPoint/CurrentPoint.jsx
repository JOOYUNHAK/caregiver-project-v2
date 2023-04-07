/* 현재 포인트 */
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import { ChargeBtn } from "./CurrentPoint/ChargeBtn";
import { CurrentPointText } from "./CurrentPoint/CurrentPointText";
import { RemainPoint } from "./CurrentPoint/RemainPoint";

export function CurrentPoint() {
    return (
        <View style={styles.currentPoint}>
            
            <View style={styles.currentPointHeader}>
                <CurrentPointText />
                <ChargeBtn />
            </View>

            <RemainPoint />
        </View>
    )
}

const styles = StyleSheet.create({
    currentPoint: {
        marginTop: hp('5%'),
        alignSelf: 'center',
        width: wp('90%'),
        height: hp('15%'),
        borderRadius: 20,
        paddingHorizontal: 25,
        justifyContent: 'center',
        elevation: 5,
        backgroundColor: 'white'
    },

    currentPointHeader: {
        flexDirection: 'row',
        width: '100%'
    }
})