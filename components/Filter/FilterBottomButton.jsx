/* 필터 적용 및 초기화 버튼 */

import { StackActions, useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useEffect } from "react";
import { Text } from "react-native";
import { TouchableHighlight } from "react-native";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import requestProfileList from "../../api/Profile/requestProfileList";
import { refreshProfileList, resetFilter, savePreviousFilter } from "../../redux/action/profile/profileAction";

export default function FilterBottomButton() {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { sexFilter, ageFilter, areaFilter, licenseFilter, warningFilter, strengthFilter } = useSelector(state => ({
        sexFilter: state.profile.filters.sexFilter,
        ageFilter: state.profile.filters.ageFilter,
        areaFilter: state.profile.filters.areaFilter,
        licenseFilter: state.profile.filters.licenseFilter,
        warningFilter: state.profile.filters.warningFilter,
        strengthFilter: state.profile.filters.strengthFilter,
    }),
        shallowEqual
    );

    const [reset, setReset] = useState(false);

    useEffect(() => {
        !!sexFilter || ageFilter !== '나이' || licenseFilter.length ||
            areaFilter.length || warningFilter || strengthFilter ? setReset(true) : setReset(false)
    }, [sexFilter, ageFilter, areaFilter, licenseFilter, warningFilter, strengthFilter]);

    const pressFilter = async () => {
        dispatch(savePreviousFilter());
        dispatch(refreshProfileList('careGiver'));
        navigation.dispatch(
            StackActions.pop()
        );
        await requestProfileList('careGiver');
    }

    return (
        <View style={styles().bottom}>

            <TouchableHighlight
                disabled={reset ? false : true}
                underlayColor = 'none'
                onPress={() => dispatch(resetFilter())}
                style={styles(reset).resetBtn}
            >
                <Text style={styles(reset).resetBtnText}>
                    초기화
                </Text>
            </TouchableHighlight>

            <TouchableHighlight
                style={styles().filterBtn}
                underlayColor='none'
                onPress={pressFilter}
            >
                <Text style={styles().filterBtnText}>
                    필터 적용
                </Text>
            </TouchableHighlight>
        </View>
    )
}

const styles = (reset) => StyleSheet.create({
    bottom: {
        height: 65,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: wp('100%'),
        backgroundColor: 'white',
        borderTopColor: 'silver',
        borderTopWidth: 0.3,
        padding: 10
    },

    resetBtn: {
        width: '30%',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: reset ? 1.2 : 1,
        height: '100%',
        borderRadius: 5,
        borderColor: reset ? 'rgba(65, 92, 118, 0.95)' : 'silver'
    },

    resetBtnText: {
        fontSize: 16,
        fontWeight: reset ? '500' : '300',
        color: reset ? 'rgba(65, 92, 118, 0.95)' : 'darkgray',
    },

    filterBtn: {
        flexDirection: 'row',
        width: '65%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(65, 92, 118, 0.95)',
        height: '100%',
        borderRadius: 5
    },

    filterBtnText: {
        fontSize: 16,
        fontWeight: '500',
        color: 'white'
    }
})