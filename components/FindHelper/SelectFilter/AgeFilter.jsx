/* 나이 필터 */

import { Text } from "react-native";
import { TouchableHighlight } from "react-native";
import { View } from "react-native";
import { useSelector } from "react-redux";
import Icon from "../../Icon";

export default function AgeFilter() {
    const { ageFilter } = useSelector(state => ({
        ageFilter: state.profile.filters.ageFilter
    }))

    return (
        <TouchableHighlight
            style={{
                marginLeft: 15,
            }}
            underlayColor='none'
        >
            <View style = {{flexDirection: 'row', alignItems: 'center',}}>
                <Text style={{
                    fontSize: 14,
                    color: '#7a7a7a',
                }}>
                    {ageFilter}
                </Text>
                <Icon props={['material', 'expand-more', 20, '#7a7a7a']} />
            </View>
        </TouchableHighlight>
    )
}


