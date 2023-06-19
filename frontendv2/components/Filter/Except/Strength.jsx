/* 필터 제외 부분  강점 미작성 */

import { useRoute } from "@react-navigation/native";
import { Text } from "react-native";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { TouchableHighlight } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { saveStrengthFilter } from "../../../redux/action/profile/profileAction";
import { saveSearchStrengthFilter } from "../../../redux/action/search/searchAction";

export default function Strength() {

    const dispatch = useDispatch();
    const { previousName } = useRoute().params;
    const { strengthFilter } = useSelector(state => ({
        strengthFilter: previousName === 'searchResultPage' ?
            state.search.filters.strengthFilter :
            state.profile.filters.strengthFilter
    }))
    const pressStrength = () => {
        previousName === 'searchResultPage' ?
            dispatch(saveSearchStrengthFilter(!strengthFilter)) :
            dispatch(saveStrengthFilter(!strengthFilter))
    }

    return (
        <TouchableHighlight
            style={styles(strengthFilter).eachExample}
            underlayColor='none'
            onPress={() => pressStrength()}
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