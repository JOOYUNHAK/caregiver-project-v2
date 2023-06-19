/* 포인트 충전 버튼 */

import { useRef } from "react";
import { StyleSheet } from "react-native";
import { TouchableHighlight } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import { Bootpay } from "react-native-bootpay-api";
import { useSelector } from "react-redux";
import api from "../../../../../config/CustomAxios";

export function ChargeBtn() {

    const { id, name } = useSelector(state => ({
        id: state.user.id,
        name: state.user.name
    }));

    const bootpay = useRef(null);

    const goBootpayTest = async () => {
        const payload = {
            application_id: '63958664d01c7e001cfeb927',
            price: 100000,
            order_name: '포인트충전',
            order_id: Math.floor( new Date().getTime() / 1000 ) + id,
            pg: 'inicis'
        };

        const items = [];

        const user = {
            id: id,
            username: name,
            phone: id
        };

        const extra = {
            display_success_result: true,
            display_error_result: true,
            separately_confirmed: true,
            show_close_button: false
        };

        if( bootpay != null && bootpay.current != null ) {
            bootpay.current.requestPayment(payload, items, user, extra);
        }
    };

    const confirmBeforePay = async (beforePayData) => {
        const { receipt_id } = beforePayData;
        try {
            const response = await api.post('payment', {
                receiptId: receipt_id
            });
        }
        catch(err) {
            console.log(err.response)
        }
        }

    return (
        <View style={styles.pointChargeBtn}>
            <TouchableHighlight 
                underlayColor = 'none'
                onPress={() => goBootpayTest()}
            >
                <Text style={styles.pointChargeText}>
                    충전하기
                </Text>
            </TouchableHighlight>
            
            <Bootpay
                ref={bootpay}
                android_application_id = {'63958664d01c7e001cfeb927'}
                onCancel = {() => console.log('cancel')}
                onError = {(err) => console.log(err)}
                onConfirm = {(data) => confirmBeforePay(data)}
                onDone = {() => console.log('done')}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    pointChargeBtn: {

        width: '50%',
        alignItems: 'flex-end'
    },

    pointChargeText: {
        fontSize: 12,
        paddingHorizontal: 13,
        borderRadius: 10,
        paddingVertical: 3,
        backgroundColor: 'rgba(65, 92, 118, 0.95)',
        fontWeight: '500',
        color: 'whitesmoke'
    }
})