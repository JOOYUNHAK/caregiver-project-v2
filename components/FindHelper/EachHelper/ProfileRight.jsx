/* 각각의 프로필의 오른쪽 부분 */

import React, { useState } from "react";
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
//import { Button, Icon } from "@rneui/themed";
import Modal from 'react-native-modal';
import Icon from "../../Icon";

export default function CardRight(props) {
    
    const UserProfile = props.list;
    const UserCity = props.list['city']; const UserAge = props.list['age']; //나이와 성별
    const [isVisible, setIsVisible] = useState(false);
    const [nowLike, setNowLike] = useState(UserProfile['like']); //그 사람의 좋아요 갯수 처음 랜더링 될 때 데이터베이스에서 불러와야하고 눌릴때마다 데이터베이스 업데이트
    const [nowView, setNowView] = useState(UserProfile['view']); //조회수
    
    const cityLength = UserCity.length;
    const likeLength = nowLike.toString().length;
    const viewLength = nowView.toString().length;
    //호감 표시 보내기
    const sendHeart = () => {
        //데이터베이스에 해당 프로필에 호감 표시를 한 사람이면 더 이상 못하게 함 ( 호감 표시에 성공하면 호감 표시를 누른 아이디는 데이터베이스에 입력 )
        setNowLike(nowLike + 1)
        setIsModalVisible(false)
        console.log('호감표시 완료')
    }

    //대화 신청 보내기
    const sendTalk = () => {
        setIsModalVisible(false)
        console.log('대화신청 완료')

    }
    //신고보내기 ( 신고 버튼을 누르면 어떤 종류의 신고인지와 작성 내용 모달 창 띄워야됨 )
    const sendReport = () => {
        setIsModalVisible(false)
        console.log('신고 완료')
    }


    return (
        <>
            {/*} 카드의 오른쪽 부분 {*/}
            < View style={styles.CardRight} >

                {/*} 카드의 오른쪽 위치부분 {*/}
                <View style={styles.CardRightAge}>
                    <Icon props = {['material-community', 'bell-ring-outline', 14, 'whitesmoke']} />
                    < Text style={styles.AgeText} >
                        {UserAge}세
                    </Text >
                </View>

                {/*} 카드의 오른쪽 위치부분 {*/}
                <View style={subStyle(cityLength).CardRightLocation}>
                    <Icon props = {['material-community', 'crosshairs-gps', 16, 'whitesmoke']} />
                    < Text style={styles.LocationText} >
                        {UserCity}
                    </Text >
                </View>

                {/*} 현재까지 받은 호감표시 갯수 {*/}
                < View style={subStyle(likeLength).CardRightHeart} >
                    <Icon props = {['material-community', 'heart-multiple', 14, 'whitesmoke']} />
                    <Text style={ styles.HeartText }>
                        {nowLike}
                    </Text>
                </View >

                {/*} 현재 조회수 {*/}
                < View style={subStyle(viewLength).CardRightView} >
                    <Icon props = {['material-community', 'eye', 14, 'whitesmoke']} />
                    <Text style={ styles.viewText}>
                        {nowView}
                    </Text>
                </View >

            </View >

            {/*  <Modal
                style={styles.Modal}
                isVisible={isVisible}
                onBackdropPress={() => setIsVisible(false)}>
                <View style={{ flexDirection: 'row' }}>
                    <Button
                        type='solid'
                        buttonStyle={{
                            backgroundColor: 'red'
                        }}
                        containerStyle={{
                            width: 100,
                            height: 40,
                            borderRadius: 5,
                            marginLeft: 5
                        }}
                        onPress={sendHeart}
                    >
                        <Icon name="favorite" color="white" />
                        호감
                    </Button>
                    <Button
                        type='solid'
                        buttonStyle={{
                            backgroundColor: 'red'
                        }}
                        containerStyle={{
                            width: 100,
                            height: 40,
                            borderRadius: 5,
                            marginLeft: 5
                        }}
                        onPress={sendTalk}
                    >
                        <Icon
                            type='material-community'
                            name="chat-plus"
                            color="white" />
                        대화
                    </Button>
                    <Button
                        type='solid'
                        buttonStyle={{
                            backgroundColor: 'red'
                        }}
                        containerStyle={{
                            width: 100,
                            height: 40,
                            borderRadius: 5,
                            marginLeft: 5
                        }}
                        onPress={sendReport}>
                        <Icon
                            type='material-community'
                            name="alert-circle-outline"
                            color="white" />
                        신고
                    </Button>
                </View>
            </Modal> */}

        </>
    )
}

const styles = StyleSheet.create({

    CardRight: {
        flexDirection: 'column',
        flex: 2,
        padding: 15,
        marginLeft: 30,
        alignItems: 'center',
        justifyContent: 'center',
        height: "100%",
    },

    /* 아이폰 shadow
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    */

    CardRightAge: {
        flex: 3,
        marginLeft: 7,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    AgeText: {
        paddingLeft: 4,
        fontWeight: 'bold',
        fontSize: 12,
        color: 'whitesmoke'
    },

    LocationText: {
        fontWeight: 'bold',
        fontSize: 12,
        color: 'whitesmoke',
        paddingLeft: 3
    },

    HeartText: {
        fontWeight: 'bold', 
        fontSize: 12, 
        marginLeft: 6
    },

    viewText: {
        fontWeight: 'bold', 
        fontSize: 12, 
        marginLeft: 5 
    },

    Modal: {
        width: 325,
        margin: 370,
        alignSelf: 'center',
        borderWidth: 2,
        borderRadius: 15,
        borderColor: 'whitesmoke',
        backgroundColor: 'whitesmoke'
    },
})

const subStyle = (contentLength) => StyleSheet.create({
    CardRightLocation: {
        flex: 3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: contentLength == 3 ? 14 : 3
    },

    CardRightHeart: {
        flex: 3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: contentLength == 1 ? -7 : 0
    },

    CardRightView: {
        flex: 3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: contentLength == 1 ? -5 : contentLength == 3 ? 6 : 0
    },
})