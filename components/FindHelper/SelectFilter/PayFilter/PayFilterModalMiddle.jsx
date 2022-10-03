/* 페이 필터 모달 중간 부분 */

import { useNavigation } from "@react-navigation/native"
import { View } from "react-native"
import { Text } from "react-native"
import { TouchableHighlight } from "react-native"
import { StyleSheet } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import requestProfileList from "../../../../api/Profile/requestProfileList"
import { PayFilterExample } from "../../../../data/Filter"
import { refreshProfileList, savePayFilter } from "../../../../redux/action/profile/profileAction"
import Icon from "../../../Icon"

export default function PayFilterModalMiddle({ setVisible }) {
    const dispatch = useDispatch();
    let { payFilter } = useSelector(state => ({
        payFilter: state.profile.filters.payFilter
    }));
    
    if(payFilter === '일당')
        payFilter = '전체금액';
    
    const pressPay = async (title) => {
        if( payFilter === title)
            setVisible(false);
        else {
            setVisible(false);
            dispatch(savePayFilter(title));
            dispatch(refreshProfileList('careGiver'));
            await requestProfileList('careGiver');
        }
    }
    return (
        <View style={styles.modalMiddle}>
            {PayFilterExample.map((example) => {
                return (
                    <TouchableHighlight
                        key={example.id}
                        style={{
                            paddingHorizontal: 30,
                            marginVertical: 6,
                            paddingVertical: 15
                        }}
                        underlayColor = 'none'
                        onPress={() => pressPay(example.title)}
                    >
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{
                                fontWeight: payFilter === example.title ? '700' : '400',
                                color: payFilter === example.title ? '#94c6ad' : 'black'
                            }}>
                                {example.title}
                            </Text>
                            {payFilter === example.title ?
                                <View style={{ position: 'absolute', right: 0, alignSelf: 'center' }}>
                                    <Icon props={['material', 'done', 24, '#94c6ad']} />
                                </View> :
                                null
                            }
                        </View>
                    </TouchableHighlight>

                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    modalMiddle: {
        width: '100%',
        height: 'auto',
        justifyContent: 'space-around',
        paddingVertical: 10
    }
})