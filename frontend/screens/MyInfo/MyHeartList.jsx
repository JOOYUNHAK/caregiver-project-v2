/* 내가 찜한 프로필 목록 */

import { useState } from "react";
import { useEffect } from "react";
import { FlatList } from "react-native";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import getHeartList from "../../api/MyInfo/getHeartList";
import StatusBarComponent from "../../components/StatusBarComponent";
import HeartProfile from "../../components/FindHelper/EachHelper/Profile";
import NoListPage from "../NoList";
import HeartInfo from "../../components/MyInfo/MyHeartList/HeartInfo";
import Loading from "../Loading";

export default function MyHeartList({ navigation }) {
    const [loading, setLoading] = useState(true);
    const { id, heartProfileList } = useSelector(state => ({
        id: state.user.id,
        heartProfileList: state.profile.heartProfileList
    }));

    useEffect(() => {
        async function getHeartProfileList() {
            if (heartProfileList.length)
                setLoading(false);
            else {
                await getHeartList(navigation);
                setLoading(false);
            }
        };
        getHeartProfileList();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBarComponent />
            {
                loading ? <Loading /> 
                :
                <FlatList
                    ListHeaderComponent={
                        <HeartInfo />
                    }
                    ListEmptyComponent={
                        <NoListPage code={
                            !!id ? 'noHeartList' : 'noLoginHeartList'
                        } />
                    }
                    data={heartProfileList}
                    renderItem={({ item }) => <HeartProfile item={item} key={item.id} />}
                    windowSize={1}
                    style={{ height: '100%', paddingTop: 0, backgroundColor: 'white' }} //수정
                    showsVerticalScrollIndicator={false}
                />
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignContent: 'center',
        backgroundColor: 'white',
    },
})