/* 필터 나이 부분 */

import { StyleSheet } from "react-native";
import { FlatList } from "react-native";
import { TouchableHighlight } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AgeExample } from "../../data/Filter";
import { saveAgeFilter } from "../../redux/action/profile/profileAction";

export default function Age() {
    const dispatch = useDispatch();
    const { ageFilter } = useSelector(state => ({
        ageFilter: state.profile.filters.ageFilter
    }))

    const renderAgeExample = ({ item }) => {
        return(
            <TouchableHighlight
                style = {styles(ageFilter, item.title).eachExample}
                underlayColor='none'
                onPress={() => dispatch(saveAgeFilter(item.title))}
            >
                <Text
                    style = {styles(ageFilter, item.title).exampleText}>
                    {item.title}
                </Text>
            </TouchableHighlight>
        )
    }

    return (
        <View style={{
            marginTop: 40,
            paddingLeft: 20,
        }}>
            <View style = {{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{
                fontSize: 17,
                fontWeight: '700',
            }}>
                연령대
            </Text>
            <Text style = {styles().selectText}>
                {ageFilter !== '나이' ? ageFilter : null}
            </Text>
            </View>
            <FlatList
                data={AgeExample}
                renderItem={renderAgeExample}
                keyExtractor={(AgeExample) => AgeExample.id}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}

const styles = (ageFilter, title) => StyleSheet.create({
    eachExample: {
        marginTop: 15,
        paddingHorizontal: 20,
        marginBottom: 1,
        marginRight: 10,
        paddingVertical: 5,
        borderColor: ageFilter === title ? 'black' : 'silver',
        borderWidth: 1,
        borderRadius: 15
    },

    exampleText: {
        fontSize: 13,
        fontWeight: ageFilter === title ? 'bold' : '300'
    },

    selectText: {
        fontSize: 14,
        marginLeft: 10,
        fontWeight: '700',
        color: 'rgba(65, 92, 118, 0.85)',
    }
})