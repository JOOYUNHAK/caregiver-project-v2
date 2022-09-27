/* 필터 제외 부분 */

import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import { shallowEqual, useSelector } from "react-redux";
import Strength from "./Except/Strength";
import Warning from "./Except/Warning";

export default function Except() {

    /* const { warningFilter, StrengthFilter } = useSelector(state => ({
        warningFilter: state.profile.filters.warningFilter,
        StrengthFilter: state.profile.filters.StrengthFilter
    },
        shallowEqual
    )) */
    const { warningFilter, strengthFilter } = useSelector(state => ({
        warningFilter: state.profile.filters.warningFilter,
        strengthFilter: state.profile.filters.strengthFilter
    }))



    return (

        <View style={{ marginTop: 40, paddingLeft: 20, }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 17, fontWeight: '700' }}>
                    제외
                </Text>
                
                <View style = {{flexDirection: 'row', marginLeft: 10}}>
                    <Text style = {styles.selectText}>
                        {warningFilter ? (strengthFilter ? '신고 이력 / ' : '신고 이력') : null}
                    </Text>
                    <Text style = {styles.selectText}>
                        {strengthFilter ? '강점 미작성' : null}
                    </Text>
                </View>

            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                <Warning />
                <Strength />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    selectText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#43c32c'
    }
})