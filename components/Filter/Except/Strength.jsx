/* 필터 제외 부분  강점 미작성 */

import { Text } from "react-native";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { TouchableHighlight } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { saveStrengthFilter } from "../../../redux/action/profile/profileAction";

export default function Strength() {

    const dispatch = useDispatch();
    const { strengthFilter } = useSelector(state => ({
        strengthFilter: state.profile.filters.strengthFilter
    }))
    
    return (
        <TouchableHighlight
            style={styles(strengthFilter).eachExample}
            underlayColor='none'
            onPress={() => dispatch(saveStrengthFilter(!strengthFilter))}
        >
            <View style = {{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles(strengthFilter).exampleText}>
                    강점 미작성
                </Text>
            </View>

        </TouchableHighlight>
    )
}

const styles = (strengthFilter) => StyleSheet.create({
    eachExample: {
        paddingHorizontal: 20,
        marginRight: 10,
        paddingVertical: 5,
        borderColor: strengthFilter ? 'black' : 'silver',
        borderWidth: 1,
        borderRadius: 15
    },

    exampleText: {
        fontSize: 13,
        fontWeight: strengthFilter ? 'bold' : '300'
    }
})