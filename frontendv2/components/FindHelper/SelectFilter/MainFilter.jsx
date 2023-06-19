/* 필터 중 메인 필터 */

import { Text } from "react-native";
import { TouchableHighlight } from "react-native";
import { View } from "react-native";
import { useSelector } from "react-redux";
import Modal from 'react-native-modal';
import Icon from "../../Icon";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import MainFilterModalHeader from "./MainFilter/MainFilterModalHeader";
import MainFilterModalMiddle from "./MainFilter/MainFilterModalMiddle";
import MainFilterModalBottom from "./MainFilter/MainFilterModalBottom";
import { useEffect } from "react";
import { useRoute } from "@react-navigation/native";

export default function MainFilter({ scrollRef }) {
    const { name } = useRoute();
    const { mainFilter } = useSelector(state => ({
        mainFilter: name === 'searchResultPage' ?
            state.search.filters.mainFilter :
            state.profile.filters.mainFilter
    }))

    const [isVisible, setIsVisible] = useState(false);

    const setVisible = (bool) => {
        setIsVisible(bool);
    };

    useEffect(() => {
        scrollRef.current.scrollTo({x: 0});
    }, [isVisible])
    
    return (
        <>
            <TouchableHighlight
                style={{
                    marginLeft: 15,
                }}
                underlayColor='none'
                onPress={() => setIsVisible(true)}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <Text style={{
                        fontSize: 13,
                        color: mainFilter === '기본순' ? '#7a7a7a' : '#94c6ad',
                    }}>
                        {mainFilter}
                    </Text>
                    <Icon props={['material', 'expand-more', 20, 
                        mainFilter === '기본순' ? '#7a7a7a' : '#94c6ad']} />
                </View>
            </TouchableHighlight>

            <Modal
                isVisible={isVisible}
                onBackdropPress={() => setIsVisible(false)}
                onBackButtonPress={() => setIsVisible(false)}
                style = {styles.modal}
                backdropTransitionOutTiming={0}
                swipeDirection='down'
                onSwipeComplete={() => setIsVisible(false)}
            >
                <View style={styles.modalContent}>
                    <MainFilterModalHeader />
                    <MainFilterModalMiddle setVisible = {setVisible}/>
                    <MainFilterModalBottom setVisible = {setVisible}/>
                </View>

            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'flex-end',
        margin: 0
    },

    modalContent: {
        backgroundColor: 'white',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: 'auto',
        width: wp('100%'),
        borderRadius: 15,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    }
})