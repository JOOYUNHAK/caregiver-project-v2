/* 지역 필터 */

import { Text } from "react-native";
import { TouchableHighlight } from "react-native";
import { View } from "react-native";
import { useSelector } from "react-redux";
import Icon from "../../Icon";

export default function AreaFilter() {
    const { areaFilter } = useSelector(state => ({
        areaFilter: state.profile.filters.area
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
                    {areaFilter}
                </Text>
                <Icon props={['material', 'expand-more', 20, '#7a7a7a']} />
            </View>
        </TouchableHighlight>
    )
}


