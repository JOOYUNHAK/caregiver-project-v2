/* 필터 지역 부분 */

import { useRoute } from "@react-navigation/native";
import { Text } from "react-native";
import { TouchableHighlight } from "react-native";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import areaData from "../../data/Register/area.data";
import { saveAreaFilter } from "../../redux/action/profile/profileAction";
import { saveSearchAreaFilter } from "../../redux/action/search/searchAction";

export default function Area() {
    const dispatch = useDispatch();
    const { previousName } = useRoute().params;

    const { areaFilter } = useSelector(state => ({
        areaFilter: previousName === 'searchResultPage' ? 
            state.search.filters.areaFilter : 
            state.profile.filters.areaFilter
    }));

    const pressArea = (area) => {
        previousName === 'searchResultPage' ?
            dispatch(saveSearchAreaFilter(area)) :
            dispatch(saveAreaFilter(area))
    }

    return (
        <View style={{
            marginTop: 40,
            paddingLeft: 20,
        }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 17, fontWeight: '700', marginRight: 10 }}>
                    지역
                </Text>
                
                {areaFilter.length ? areaFilter.map((area) => {
                    return(
                        <Text
                            key={area}
                            style = {styles.selectText}
                        >
                            {area} {areaFilter[areaFilter.length-1] !== area ? '/' : null }
                        </Text>
                    )
                }) : null}
            </View>

            <View style = {styles.examples}>
                {areaData.map((example) => {
                    return(
                        <TouchableHighlight
                            style = {{
                                marginTop: 10,
                                paddingHorizontal: 20,
                                paddingVertical:5,
                                marginRight: 10,
                                borderWidth: 1,
                                borderColor: areaFilter.includes(example.title) ? 'black' : 'silver',
                                borderRadius: 15
                            }}
                            key={example.id}
                            underlayColor='none'
                            onPress={() => pressArea(example.title)}
                        >
                            <Text style = {{
                                fontSize: 13,
                                fontWeight: areaFilter.includes(example.title) ? 'bold' : '300'
                            }}>
                                {example.title}
                            </Text>
                        </TouchableHighlight>
                    )
                })}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    selectText: {
        marginRight: 5,
        fontSize: 14,
        fontWeight: '700',
        color: 'rgba(65, 92, 118, 0.85)',
    },

    examples: {
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        marginTop: 5,
        paddingRight:10,
        }
})