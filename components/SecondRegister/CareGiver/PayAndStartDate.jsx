/* 간병인용 급여, 시작 날짜 입력 */
import { StyleSheet, Text, TextInput, View } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";
import { saveFirstPay, saveStartDate } from "../../../redux/action/register/secondRegisterAction";
import inputStyle from "../../../styles/Register/inputStyle";
import { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { useEffect } from "react";

export default function PayAndStartDate() {
    const dispatch = useDispatch();
    const { firstPay, startDate } = useSelector(state => ({
        firstPay: state.secondRegister.careGiver.firstPay,
        startDate: state.secondRegister.startDate
    }))

    useEffect(() => {
        setValue(String(startDate))
    }, [value]);
    
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(startDate);
    const [items, setItems] = useState([
        {label: '즉시가능', value: 1},
        {label: '1주 이내', value: 2},
        {label: '2주 이내', value: 3},
        {label: '3주 이내', value: 4},        
        {label: '한달 이내', value: 5},
    ]);

    return (
        <View style={styles.payAndStartDate}>
            <View style={styles.pay}>
                <View style={{
                    flexDirection: 'row'
                }}>
                    <Text>
                        일일급여가 어떻게 되시나요?
                    </Text>
                </View>
                <View style={styles.inputPay}>
                    <TextInput
                        onChangeText={(text) => dispatch(saveFirstPay(text))}
                        style={inputStyle('pay')}
                        value={String(firstPay)}
                        maxLength={3}
                        keyboardType='decimal-pad'
                    />
                    <Text style = {{marginLeft: 5}}>
                        만원
                    </Text>
                </View>
            </View>

            <View style={styles.startDate}>
                <Text>
                    시작 가능일이 언제쯤이신가요?
                </Text>
                <DropDownPicker
                    theme = 'LIGHT'
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    placeholder={ !! value ? items[value - 1].label : '대략적인 날짜 선택' }
                    placeholderStyle={{
                        color: 'grey',
                        fontSize: 12
                    }}
                    closeOnBackPressed={true}
                    listMode='SCROLLVIEW'
                    labelStyle={{ fontSize: 13 }}
                    dropDownContainerStyle={{
                        height: 100,
                        width: 160,
                        borderWidth: 0.2
                    }}
                    listItemContainerStyle={{
                        height: 30,
                    }}
                    listItemLabelStyle={{ fontSize: 13 }}
                    selectedItemLabelStyle={{ fontSize: 13 }}
                    props={{
                        style: {
                            height: 35,
                            flexDirection: 'row',
                            width: 160,
                            alignItems: 'center',
                            paddingHorizontal: 5,
                            borderBottomWidth: 0.2,
                            marginTop: 5,
                            borderRadius: 5
                        }
                    }}
                    onSelectItem={(item) => { dispatch(saveStartDate(item.value)) }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    payAndStartDate: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        height: hp('12%'),
        paddingTop: 8,
        paddingLeft: 20,
        paddingRight: 10
    },

    pay: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flex: 1,
    },

    inputPay: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 10
    },

    startDate: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flex: 1
    },
})