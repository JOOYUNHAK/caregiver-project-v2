import React, { useState } from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Platform
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NoListPage from "../../screens/NoList";
import * as Board from '../../functions/Search.js';
import Icon from "../Icon";
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';


function RecentWords({ props }) {

    const [data, setData] = useState(
        props === null ? null : props.length === undefined ? [props] : props);

    const removeItem = async (word) => {
        let arr = data.filter((data) => data.word !== word)
        setData(arr)
        await AsyncStorage.setItem('recentWords', JSON.stringify(arr))
    }

    const renderItem = ({ item }) => {
        return (
            <View style={styles.eachWords}>
                <TouchableHighlight
                    underlayColor='none'
                    onPress={() => {
                        Board.storeSearchValue(data, item.word);
                    }}>
                    <View style={styles.eachWord}>
                        <Icon props={['antdesign', 'tagso', 20, 'orange']} />
                        <Text style={styles.eachWordText}>
                            {item.word}
                        </Text>
                    </View>
                </TouchableHighlight>

                <View style={styles.deleteWord}>
                    <TouchableHighlight
                        underlayColor='none'
                        onPress={() => removeItem(item.word)}
                    >
                        <Icon props={['feather', 'x', 18, 'silver']} />
                    </TouchableHighlight>

                </View>
            </View>
        );
    }

    return (
      
        <View style={styles.recentSearchWords}>
            <KeyboardAwareFlatList
                enableOnAndroid = {true}
                ListEmptyComponent={<NoListPage code={'noRecentSearch'} />}
                data={data}
                renderItem={renderItem}
                numColumns={2}
                showsVerticalScrollIndicator = {false}
            />
        </View>
    )
}

export default React.memo(RecentWords);

const styles = StyleSheet.create({

    eachWords: {
        width: "50%",
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingRight: 10,
        paddingLeft: 20,
        marginTop: -5
    },

    eachWord: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 35,
    },

    eachWordText: {
        fontSize: Platform.OS === 'ios' ? 11 : 13,
        fontWeight: 'bold',
        color: 'orange',
    },

    recentSearchWords: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },

    deleteWord: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 35
    }
})