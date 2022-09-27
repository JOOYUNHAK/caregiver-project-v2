/* 메인필터 모달 중간 부분 */

import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { TouchableHighlight } from "react-native";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import requestProfileList from "../../../../api/Profile/requestProfileList";
import { MainFilterExample } from '../../../../data/Filter';
import { refreshProfileList, saveMainFilter } from "../../../../redux/action/profile/profileAction";
import Icon from "../../../Icon";

export default function MainFilterModalMiddle({ setVisible }) {
    const dispatch = useDispatch();
    const { mainFilter } = useSelector(state => ({
        mainFilter: state.profile.filters.mainFilter
    }))

    const pressMainFilter = async (title) => {
        if (mainFilter === title)
            setVisible(false);
        else {
            setVisible(false);
            dispatch(saveMainFilter(title));
            dispatch(refreshProfileList('careGiver'));
            await requestProfileList('careGiver');
        }
    }
    return (
        <View style={styles.modalMiddle}>
            {MainFilterExample.map((example) => {
                return (

                    <TouchableHighlight
                        key={example.id}
                        style={{
                            paddingHorizontal: 30,
                            marginVertical: 6,
                            paddingVertical: 15
                        }}
                        underlayColor='none'
                        onPress={() => pressMainFilter(example.title)}
                    >
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{
                                fontWeight: mainFilter === example.title ? '700' : '400',
                                color: mainFilter === example.title ? '#94c6ad' : 'black'
                            }}>
                                {example.title}
                            </Text>
                            {mainFilter === example.title ?
                                <View style={{ position: 'absolute', right: 0, alignSelf: 'center' }}>
                                    <Icon props={['material', 'done', 24, '#94c6ad']} />
                                </View> :
                                null
                            }
                        </View>
                    </TouchableHighlight>

                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    modalMiddle: {
        width: '100%',
        height: 'auto',
        justifyContent: 'space-around',
        paddingVertical: 10
    }
})