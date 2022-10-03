/* 필터 성별 부분 */

import { Text } from "react-native";
import { View } from "react-native";
import sexData from '../../data/Register/sex.data';
import { useDispatch, useSelector } from "react-redux";
import { TouchableHighlight } from "react-native";
import { saveSexFilter } from "../../redux/action/profile/profileAction";
import { StyleSheet } from "react-native";

export default function Sex () {
    const dispatch = useDispatch();
    const { sexFilter } = useSelector(state => ({
        sexFilter: state.profile.filters.sexFilter
    }));

    return(
        <View style={{
            marginTop: 40,
            paddingLeft: 20,
        }}>
            <View style = {{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{
                fontSize: 17,
                fontWeight: '700',
            }}>
                성별
            </Text>
            <Text style = {styles.selectText}>
                {!!sexFilter ? sexFilter : null}
            </Text>
            </View>

            <View style = {{flexDirection: 'row', marginTop: 5}}>
                {sexData.map((example) => {
                    return(
                        <TouchableHighlight
                            style = {{
                                marginTop: 10,
                                paddingHorizontal: 25,
                                paddingVertical:5,
                                marginRight: 10,
                                borderWidth: 1,
                                borderColor: sexFilter.includes(example.title) ? 'black' : 'silver',
                                borderRadius: 15
                            }}
                            key={example.id}
                            underlayColor='none'
                            onPress={() => dispatch(saveSexFilter(example.title))}
                        >
                            <Text style = {{
                                fontSize: 13,
                                fontWeight: sexFilter.includes(example.title) ? 'bold' : '300'
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
        fontSize: 14,
        fontWeight: '700',
        color: 'rgba(65, 92, 118, 0.85)',
        marginLeft: 10
    }
})