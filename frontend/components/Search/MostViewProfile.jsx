//많이 조회한 프로필 뿌리기

import { StackActions, useNavigation } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";
import { FlatList } from "react-native";
import { TouchableHighlight } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP } from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";
import { saveMostViewed } from "../../redux/action/search/searchAction";

export default function MostViewProfile() {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { mostViewedProfiles, profilesUpdateTime, mostViewedLoading } = useSelector(state => ({
        mostViewedProfiles: state.search.mostViewedProfiles,
        profilesUpdateTime: state.search.profilesUpdateTime,
        mostViewedLoading: state.search.mostViewedLoading
    }));

    const onPressEachKeyword = (profile) => {
        dispatch(saveMostViewed(true)); //순위에 있는 프로필은 다시 카운트에 포함시키지 않기 위해
        navigation.dispatch(
            StackActions.push(
                'helperProfilePage', {
                purpose: '간병인',
                profileId: profile.profileId,
                name: profile.name
            }
            )
        )
    }

    const renderItem = ({ item, index }) => {
        let { keywords } = item;
        keywords = keywords.split(',');

        return (
            <TouchableHighlight
                key={item.profileId}
                underlayColor='none'
                onPress={() => onPressEachKeyword(item)}
                style={styles.keyWordsList}
            >
                <View style={{
                    flexDirection: 'row',
                    width: '100%',
                }}>
                    <Text style={styles.keyWordText}>
                        {index + 1}   {item.name}
                    </Text>

                    <View style={styles.keywords}>
                        {
                            keywords.map((keyword) => {
                                return (
                                    <Text 
                                        key={keyword}
                                        style={styles.eachKeyWord}>
                                        {keyword}
                                    </Text>
                                )
                            })
                        }
                    </View>
                </View>

            </TouchableHighlight>
        )
    }

    return (
        <View style={styles.mostViewedProfiles}>
            <Text style={styles.headerText}>
                보호자들이 가장 많이{"\n"}
                조회중인 간병인이에요!
            </Text>

            {
                mostViewedLoading ?
                    <View style={styles.loading}>
                        <ActivityIndicator size='small' color='rgba(65, 92, 118, 0.85)' />
                    </View>
                    :
                    <>
                        <Text style={styles.updateTime}>
                            {profilesUpdateTime} 기준
                        </Text>

                        <FlatList
                            enableOnAndroid={true}
                            keyboardShouldPersistTaps='handled'
                            contentContainerStyle={styles.flatList}
                            data={mostViewedProfiles}
                            renderItem={renderItem}
                        />
                    </>
            }
        </View>
    );
}

const styles = StyleSheet.create({

    mostViewedProfiles: {
        height: hp('50%'),
        marginTop: 30,
        paddingVertical: 10,
        width: widthPercentageToDP('100%')
    },

    flatList: {
        paddingVertical: 10,
        flexDirection: 'column',
        justifyContent: 'space-around',
        height: '100%'
    },

    headerText: {
        fontWeight: 'bold',
        fontSize: Platform.OS === 'ios' ? 11 : 16,
        paddingHorizontal: 15
    },

    keyWordsList: {
        alignSelf: 'flex-start',
        marginHorizontal: 5,
        paddingHorizontal: 15,
        width: '100%',
        paddingVertical: 10,
    },

    keywords: {
        position: 'absolute',
        right: 0,
        flexDirection: 'row'
    },

    keyWordText: {
        fontSize: 16,
    },

    eachKeyWord: {
        borderWidth: 0.8,
        marginRight: 10,
        borderColor: 'dimgray',
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderRadius: 10,
        fontSize: 12,
        color: 'dimgray'
    },

    updateTime: {
        marginTop: 5,
        fontSize: 14,
        color: '#7b7b7b',
        paddingHorizontal: 15
    },

    loading: {
        alignSelf: 'center',
        marginTop: 100
    }

})
