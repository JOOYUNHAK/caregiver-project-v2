/* 필터 자격증 부분 */

import { Text } from "react-native";
import { TouchableHighlight } from "react-native";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import licenseData from "../../data/Register/license.data";
import { saveLicenseFilter } from "../../redux/action/profile/profileAction";

export default function License() {
    const dispatch = useDispatch();
    const { licenseFilter } = useSelector(state => ({
        licenseFilter: state.profile.filters.licenseFilter
    }));

    return (
        <View style={{
            marginTop: 40,
            paddingLeft: 20,
        }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 17, fontWeight: '700', marginRight: 10 }}>
                    자격증
                </Text>

                {licenseFilter.length ? licenseFilter.map((license) => {
                    return (
                        <Text
                            key={license}
                            style={styles.selectText}
                        >
                            {license} {licenseFilter[licenseFilter.length - 1] !== license ? '/' : null}
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

            <View style={styles.examples}>
                {licenseData.map((example) => {
                    return (
                        <TouchableHighlight
                            style={{
                                marginTop: 10,
                                paddingHorizontal: 20,
                                paddingVertical: 5,
                                marginRight: 10,
                                borderWidth: 1,
                                borderColor: licenseFilter.includes(example.title) ? 'black' : 'silver',
                                borderRadius: 15
                            }}
                            key={example.id}
                            underlayColor='none'
                            onPress={() => dispatch(saveLicenseFilter(example.title))}
                        >
                            <Text style={{
                                fontSize: 13,
                                fontWeight: licenseFilter.includes(example.title) ? 'bold' : '300'
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
        paddingRight: 10,
        marginBottom: 1
    }
})