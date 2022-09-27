/* 필터 제외 부분 신고 이력 */

import { Text } from "react-native";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { TouchableHighlight } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { saveWarningFilter } from "../../../redux/action/profile/profileAction";

export default function Warning() {

    const dispatch = useDispatch();
    const { warningFilter } = useSelector(state => ({
        warningFilter: state.profile.filters.warningFilter
    }))

    return (
        <TouchableHighlight
            style={styles(warningFilter).eachExample}
            underlayColor='none'
            onPress={() => dispatch(saveWarningFilter(!warningFilter))}
        >
            <View style = {{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles(warningFilter).exampleText}>
                    신고 이력
                </Text>
            </View>

        </TouchableHighlight>
    )
}

const styles = (warningFilter) => StyleSheet.create({
    eachExample: {
        paddingHorizontal: 20,
        marginRight: 10,
        paddingVertical: 5,
        borderColor: warningFilter ? 'black' : 'silver',
        borderWidth: 1,
        borderRadius: 15
    },

    exampleText: {
        fontSize: 13,
        fontWeight: warningFilter ? 'bold' : '300'
    }
})