//많이 검색한 단어 뿌리기

import { StyleSheet, Text, View } from "react-native";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import RecentKeywords from "./RecentSearchKeyWords/RecentKeyWords";

export default function MostSearchedKeyWords() {

    return (
        <View style={styles.recentWords}>
            <View style={styles.recentSearchText}>
                <Text style={styles.mainText}>
                    보호자분들이 많이 찾고 있는 키워드에요!
                </Text>
            </View>
            <RecentKeywords />


        </View>
    );
}

const styles = StyleSheet.create({

    recentWords: {
        height: heightPercentageToDP('12%'),
        marginTop: 20,
        paddingVertical: 10,
    },

    recentSearchText: {
        height: '30%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingHorizontal: 15
    },

    mainText: {
        fontWeight: 'bold',
        color: 'dimgray',
        fontSize: Platform.OS === 'ios' ? 11 : 15
    },

})
