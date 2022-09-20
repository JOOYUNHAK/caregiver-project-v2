/* 사용자 현재 글 정보 */
import React from "react";
import {
    StyleSheet,
    View,
    Text,
    Platform,
} from 'react-native';
import { changeStartDate, getCareer, isEqualPay, possibleAreaRange } from "../../../functions/Profile/profileFunctions";

export default function Info({ profile }) {
    let career = profile.career;
    if (career >= 12)
        career = getCareer(career);
    const equalPay = isEqualPay(profile.pay);
    const exceedArea = possibleAreaRange(profile.possibleArea);
    const startDate = changeStartDate(profile.startDate);

    return (
        <View style={styles.profileHelperContainer}>
            <View style={styles.leftPart}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.title}>
                        경력
                    </Text>
                    <View style={styles.verticalLine} />
                    <Text style={styles.userValue}>
                        {career}
                    </Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.title}>
                        일당
                    </Text>
                    <View style={styles.verticalLine} />
                    <Text style={styles.userValue}>
                        {equalPay ?
                            `${equalPay}만원` :
                            (profile.pay)
                        }
                    </Text>
                </View>
            </View>

            <View style={styles.rightPart}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.title}>
                        지역
                    </Text>
                    <View style={styles.verticalLine} />
                    <Text style={styles.userValue}>
                        { exceedArea ?
                            `상세 프로필 참고` :
                            (profile.possibleArea)
                        }
                    </Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.title}>
                        시작 가능 날짜
                    </Text>
                    <View style={styles.verticalLine} />
                    <Text style={styles.userValue}>
                        {startDate}
                    </Text>
                </View>
            </View>



            {/*  <View style={styles.profileHelperGrade}>
                    <Icon props={['material-community', 'star', 16, 'gold']} />
                    <Text style = {styles.profileHelperGradeText}>
                        {profile.grade}
                    </Text>
                </View> */}
        </View>
    );
}

const styles = StyleSheet.create({

    profileHelperContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flex: 1,
        paddingLeft: 30,
        paddingRight: 20
    },

    title: {
        color: 'darkgray',
        fontWeight: '400',
        fontSize: 13,
    },

    userValue: {
        color: '#545454',
        fontSize: 13
    },

    leftPart: {
        flexDirection: 'column',
        width: '50%',
        justifyContent: 'space-around'
    },

    rightPart: {
        flexDirection: 'column',
        width: '55%',
        justifyContent: 'space-around'
    },

    verticalLine: {
        borderWidth: 0.3,
        height: '37%',
        marginTop: 6,
        borderColor: 'silver',
        marginHorizontal: 5
    },

    profileHelperTop: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginLeft: 20,
        marginRight: 20,
        flex: 1,
        paddingTop: Platform.OS === 'ios' ? 20 : 15,
    },

    profileHelperGrade: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 4,
        paddingTop: 4,
        borderRadius: 10,
        backgroundColor: 'hsla(307, 20%, 95%, 0.5)',
        marginLeft: 15,
        overflow: 'hidden'
    },

    profileHelperGradeText: {
        fontSize: Platform.OS === 'ios' ? 10 : 12,
        color: 'black'
    },

    profileHelperBottom: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-around',
        flex: 1,
    },
});
