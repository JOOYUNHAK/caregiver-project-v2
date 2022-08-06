/* 간병인, 활동보조사 목록들 */

import React, { useState, useEffect } from 'react';
import {
    TouchableHighlight,
    FlatList,
    StyleSheet,
} from 'react-native';
import HelperProfile from './EachHelper/Profile';
import NoListPage from '../../screens/NoList';
import Icon from '../Icon';
import SelectFilter from './SelectFilter';

export default function HelperList({ navigation, data }) {
    let listViewRef;
    const [UserProfile, setUserProfile] = useState(data);
    const [showTopBtn, setShowTopBtn] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const [sortStandard, setSortStandard] = useState('normal');
    const [reRender, setReRender] = useState(false);

    const ScrollToTop = () => {
        listViewRef.scrollToOffset({ offset: 0, animated: true });
        setShowTopBtn(false);
    }

    const showButton = (e) => {
        if (e.nativeEvent.contentOffset.y - 0 > 200) {
            setShowTopBtn(true);
        } else {
            setShowTopBtn(false);
        }
    }
    const getRefreshData = async () => {
        setRefreshing(true);
        setUserProfile([]);
        setRefreshing(false);
    }

    const onRefresh = () => {
        if (!refreshing)
            getRefreshData();
    }

    useEffect(() => {
        if (sortStandard === 'normal')
            setUserProfile(UserProfile.sort((a, b) => a.listNo - b.listNo));
        else if (sortStandard === 'highGrade')
            setUserProfile(UserProfile.sort((a, b) => b.grade - a.grade));
        else if (sortStandard === 'viewHigh')
            setUserProfile(UserProfile.sort((a, b) => b.view - a.view));
        else if (sortStandard === 'ageLow')
            setUserProfile(UserProfile.sort((a, b) => a.age - b.age));
        else if (sortStandard === 'ageHigh')
            setUserProfile(UserProfile.sort((a, b) => b.age - a.age));
        setReRender(!reRender);
    }, [sortStandard])

    return (
        <>
        <SelectFilter props={setSortStandard} />
            <FlatList
                ListEmptyComponent={
                    <NoListPage code={'noBoardList'} />
                }
                data={UserProfile}
                renderItem={({ item }) => <HelperProfile list={item} />}
                keyExtractor={(profile) => profile.listNo}
                windowSize={1}
                extraData = {reRender}
                onScrollEndDrag={showButton}
                onRefresh={onRefresh}
                refreshing={refreshing}
                showsVerticalScrollIndicator={false}
                ref={(ref) => {
                    listViewRef = ref;
                }}
            />
            {showTopBtn ?
                <TouchableHighlight
                    style={styles.TopBtn}
                    underlayColor='whitesmoke'
                    onPress={ScrollToTop}>
                    <Icon props={['antdesign', 'arrowup', 25, 'dimgray']} />
                </TouchableHighlight> : null}
        </>
    );
}

const styles = StyleSheet.create({

    TopBtn: {
        position: 'absolute',
        alignSelf: 'flex-start',
        width: 50,
        height: 50,
        bottom: 10,
        borderColor: 'whitesmoke',
        borderWidth: 2,
        borderRadius: 150,
        left: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 3
    },
})