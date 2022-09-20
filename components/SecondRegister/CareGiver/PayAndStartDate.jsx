/* 간병인용 급여, 시작 날짜 입력 */
import { StyleSheet, Text, TextInput, View } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useDispatch } from "react-redux";
import { saveFirstPay, saveSecondPay, saveStartDate } from "../../../redux/action/register/secondRegisterAction";
import inputStyle from "../../../styles/Register/inputStyle";
import Icon from "../../Icon";
import { TouchableHighlight } from "react-native";
import Tooltip from "react-native-walkthrough-tooltip";
import { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";

export default function PayAndStartDate() {
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: '즉시가능', value: 0},
        {label: '1주 이내', value: 1},
        {label: '2주 이내', value: 2},
        {label: '3주 이내', value: 3},        
        {label: '한달 이후', value: 4},
    ]);

    return (
        <View style={styles.payAndStartDate}>
            <View style={styles.pay}>
                <View style={{
                    flexDirection: 'row'
                }}>
                    <Text>
                        일일급여
                    </Text>
                    <Tooltip
                        isVisible={visible}
                        content={
                            <Text style = {{fontSize: 12}}>
                                어떤 경우에도 추가요금이 없는 경우 동일한 금액을 입력해주세요.
                            </Text>
                        }
                        placement='right'
                        onClose={() => setVisible(false)}
                        contentStyle = {{ width: 180}}
                        
                    >
                        <TouchableHighlight
                            style = {{marginTop: 2, marginLeft: 2}}
                            underlayColor='none'
                            onPress={() => setVisible(true)}
                        >
                            <Icon props={['material', 'help-outline', 16, 'black']} />
                        </TouchableHighlight>
                    </Tooltip>
                
                </View>
                <View style={styles.inputPay}>
                    <TextInput
                        onChangeText={(text) => dispatch(saveFirstPay(text))}
                        style={inputStyle('pay')}
                        maxLength={3}
                        keyboardType='decimal-pad'
                    />
                    <Text >
                        만원
                    </Text>
                    <Text style={{ marginLeft: 5, marginRight: 8 }}>
                        ~
                    </Text>
                    <TextInput
                        onChangeText={(text) => dispatch(saveSecondPay(text))}
                        style={inputStyle('pay')}
                        maxLength={3}
                        keyboardType='decimal-pad'
                    />
                    <Text>
                        만원
                    </Text>
                </View>
            </View>

            <View style={styles.startDate}>
                <Text>
                    시작 가능 날짜
                </Text>
                <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    placeholder='대략적인 날짜 선택'
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