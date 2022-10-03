/* 기타 필터 자격증 미보유  */

import { Text } from "react-native";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { TouchableHighlight } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { saveExceptLicenseFilter } from "../../../redux/action/profile/profileAction";

export default function ExceptLicense() {

    const dispatch = useDispatch();
    const { exceptLicenseFilter } = useSelector(state => ({
        exceptLicenseFilter: state.profile.filters.exceptLicenseFilter
    }))
    
    return (
        <TouchableHighlight
            style={styles(exceptLicenseFilter).eachExample}
            underlayColor='none'
            onPress={() => dispatch(saveExceptLicenseFilter(!exceptLicenseFilter))}
        >
            <View style = {{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles(exceptLicenseFilter).exampleText}>
                    자격증 미보유
                </Text>
            </View>

        </TouchableHighlight>
    )
}

const styles = (exceptLicenseFilter) => StyleSheet.create({
    eachExample: {
        paddingHorizontal: 20,
        marginRight: 10,
        paddingVertical: 5,
        borderColor: exceptLicenseFilter ? 'black' : 'silver',
        borderWidth: 1,
        borderRadius: 15
    },

    exampleText: {
        fontSize: 13,
        fontWeight: exceptLicenseFilter ? 'bold' : '300'
    }
})