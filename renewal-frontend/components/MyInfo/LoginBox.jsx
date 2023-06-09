/* 내정보 유저 정보, 포인트, 나의 후기, 찜 부분 */
import React from 'react';
import {
    View,
    StyleSheet,
    Platform,
}
    from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';
import LoginProfile from './LoginBox/LoginProfile';
import MyPoint from './LoginBox/MyPoint';
import MyReview from './LoginBox/MyReview';
import MyLike from './LoginBox/MyLike';
import NotLoginProfile from './LoginBox/NotLoginProfile';

export default function LoginBox({ navigation }) {

    const { name } = useSelector(state => ({
        name: state.user.name,
    }));

    return (
        <View style={styles.myLoginBox}>
            {name ?
                <LoginProfile navigation={navigation}/> :
                <NotLoginProfile navigation={navigation}/>
            }
            <View style={styles.mySubBox}>
                <MyPoint navigation={navigation} />
                <MyReview navigation={navigation} />
                <MyLike  navigation={navigation} />

            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    myLoginBox: {
        height: hp('20%'),
        flexDirection: 'column',
        justifyContent: 'center',
        alignSelf: 'stretch',
        marginTop: 10,
        marginRight: 10,
        marginLeft: 10,
        borderRadius: 15,
        backgroundColor: 'white',
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: {
                    width: 10,
                    height: 10,
                },
                shadowOpacity: 0.5,
                shadowRadius: 10,
            },
            android: {
                elevation: 15,
                shadowColor: 'silver'
            }
        })
    },

    mySubBox: {
        width: '100%',
        height: '51%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
})