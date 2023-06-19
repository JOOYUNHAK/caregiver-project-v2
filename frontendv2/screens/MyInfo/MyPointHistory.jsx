/* 나의 포인트 내역 */

import { Text } from "react-native";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { CurrentPoint } from "../../components/MyInfo/LoginBox/MyPoint/CurrentPoint";
import StatusBarComponent from "../../components/StatusBarComponent";

export function MyPointHistory() {

    return (
        <SafeAreaView style={styles.container}>
            <StatusBarComponent />
            <CurrentPoint />
            <View style={{
                marginTop: heightPercentageToDP('5%'),
                flexDirection: 'row',
                justifyContent: 'center',
                width: widthPercentageToDP('100%'),
                paddingHorizontal: 5
            }}>

                <View style = {{
                    width: '50%',
                    alignItems: 'center'
                }}>
                    <Text style = {{
                        paddingHorizontal: 15,
                        fontSize: 15,
                        borderBottomWidth: 1.5,
                        paddingBottom: 10,
                        fontWeight: '500'
                    }}>
                        사용내역
                    </Text>
                </View>

                <View style = {{
                    width: '50%',
                    alignItems: 'center'
                }}>
                    <Text style = {{
                        paddingHorizontal: 15,
                        fontSize: 15,
                        borderBottomWidth: 1.5,
                        paddingBottom: 10,
                        fontWeight: '500'
                    }}>
                        충전내역
                    </Text>
                </View>

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    }
})
