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
import { useDispatch, useSelector } from 'react-redux';
import requestProfileList from '../../api/Profile/requestProfileList';
import Loading from '../../screens/Loading';
import { refreshProfileList, setNoData } from '../../redux/action/profile/profileAction';

export default function HelperList({ purpose }) {
    useEffect(() => {
        async function getProfileList() {
            await requestProfileList(purpose)
        };
        getProfileList();
    }, [])

    const dispatch = useDispatch();
    const { listLoading } = useSelector(state => ({
        listLoading: state.profile.listLoading
    }));

    let listViewRef;

    const { profile } = useSelector(state => ({
        profile: state.profile.careGiver
    }));

    const [showTopBtn, setShowTopBtn] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
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

    const refreshData = async () => {
        setRefreshing(true);
        dispatch(setNoData(false));
        dispatch(refreshProfileList(purpose));
        await requestProfileList(purpose);
        setRefreshing(false);
    }

    return (
        <>
            <SelectFilter />
            {listLoading ? <Loading /> :
                <FlatList
                    ListEmptyComponent={
                        <NoListPage code={'noBoardList'} />
                    }
                    data={profile}
                    renderItem={({ item }) => <HelperProfile item={item} key={item.id} />}
                    windowSize={1}
                    style={{ height: '100%', paddingTop: 10, backgroundColor: 'white' }} //수정
                    onScrollEndDrag={showButton}
                    onRefresh={refreshData}
                    refreshing={refreshing}
                    onEndReachedThreshold={0.1}
                    onEndReached={async ({ distanceFromEnd }) => {
                        if (distanceFromEnd < -30);
                        else
                           await requestProfileList(purpose); 
                    }}
                    showsVerticalScrollIndicator={false}
                    ref={(ref) => {
                        listViewRef = ref;
                    }}
                />
            }
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
        right: 15,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 3
    },
})