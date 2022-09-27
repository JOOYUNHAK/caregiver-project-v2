/* 필터 지역 부분 */

import { Text } from "react-native";
import { TouchableHighlight } from "react-native";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import areaData from "../../data/Register/area.data";
import { saveAreaFilter } from "../../redux/action/profile/profileAction";

export default function Area() {
    const dispatch = useDispatch();
    const { areaFilter } = useSelector(state => ({
        areaFilter: state.profile.filters.areaFilter
    }));

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

            {/* <Text style = {{
                fontSize: 13,
                color: 'darkgray',
                fontWeight: '500',
                paddingLeft: 1,
                paddingTop: 2
            }}>
                최대 3곳까지 설정 가능하며, 1곳이라도 만족하는 간병인이 노출됩니다
            </Text> */}

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
                            onPress={() => dispatch(saveAreaFilter(example.title))}
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
        color: '#43c32c',
    },

    examples: {
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        marginTop: 5,
        paddingRight:10,
        }
})