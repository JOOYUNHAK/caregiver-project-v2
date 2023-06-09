/* 필터 제외 부분 */

import { useRoute } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import { useSelector } from "react-redux";
import Strength from "./Except/Strength";
import Warning from "./Except/Warning";

export default function Except() {
    const { previousName } = useRoute().params;
    const { warningFilter, strengthFilter, exceptLicenseFilter } = useSelector(state => ({
        warningFilter: previousName === 'searchResultPage' ?
            state.search.filters.warningFilter :
            state.profile.filters.warningFilter,
        strengthFilter: previousName === 'searchResultPage' ?
            state.search.filters.strengthFilter : 
            state.profile.filters.strengthFilter,
        exceptLicenseFilter: previousName === 'searchResultPage' ?
            state.search.filters.exceptLicenseFilter :
            state.profile.filters.exceptLicenseFilter
    }))



    return (

        <View style={{ marginTop: 40, paddingLeft: 20, marginBottom: 20}}>
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
                    <Text style = {styles.selectText}>
                        {exceptLicenseFilter ? '자격증 미보유' : null}
                    </Text>
                </View>

            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15, flexWrap: 'wrap' }}>
                <Warning />
                <Strength />
                {/* <ExceptLicense /> */}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    selectText: {
        fontSize: 14,
        fontWeight: '700',
        color: 'rgba(65, 92, 118, 0.85)',
    }
})