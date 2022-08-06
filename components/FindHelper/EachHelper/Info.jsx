/* 가게 현재 글 정보 */
import React from "react";
import {
    StyleSheet,
    View,
    Text,
    Platform,
} from 'react-native';
import Icon from "../../Icon";

export default function Info(props) {
    const helperProfile = props.props;
    
    return (
        <View style={styles.profileHelperContainer}>
            <View style = {styles.profileHelperAppeal}>
                <Icon props ={['material', 'campaign', 20, 'silver']} />
                <Text style = {styles.profileHelperAppealText}>
                    믿고 연락주세요. 친절하게 모시겠습니다.
                </Text>
            </View>
                
            <View style={styles.profileHelperTop}>
                <Text style={topTextStyle('sex')}>
                    성별: {helperProfile.sex}
                </Text>
                <Text style={topTextStyle('age')} >
                    나이: {helperProfile.age}세
                </Text>
                <Text style={topTextStyle('weight')} >
                    {helperProfile.weight}kg
                </Text>
                <View style={styles.profileHelperGrade}>
                    <Icon props={['material-community', 'star', 16, 'gold']} />
                    <Text style = {styles.profileHelperGradeText}>
                        {helperProfile.grade}
                    </Text>
                </View>
            </View>

            <View style={styles.profileHelperBottom}>
                <Text style={bottomTextStyle('career')}>
                    경력: {helperProfile.career}
                </Text>
                <Text style={bottomTextStyle('pay')} >
                    {helperProfile.pay}만원
                </Text>
                <Text style={bottomTextStyle('startWork')} >
                    {helperProfile.startWork}
                </Text>
                <Text style={bottomTextStyle('view')} >
                    조회수: {helperProfile.view}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    profileHelperContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        flex: 6,
    },

    profileHelperAppeal: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 28
    },

    profileHelperAppealText: {
        fontSize: 13,
        fontWeight: '600',
        color: 'silver'
    },

    profileHelperTop: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
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
        marginLeft: 25,
        overflow: 'hidden'
    },

    profileHelperGradeText: {
        fontSize: Platform.OS === 'ios' ? 10 : 12,
        color: 'black'
    },

    profileHelperBottom: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
        flex: 1,
    },
});

const topTextStyle = (info) => StyleSheet.create({
    color: 'black',
    fontSize: Platform.OS === 'ios' ? 10 : 12,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 4,
    paddingTop: 4,
    borderRadius: 10,
    marginLeft: info === 'sex' ? 20 : 25,
    backgroundColor: 'hsla(307, 20%, 95%, 0.5)',
    overflow: 'hidden'
})

const bottomTextStyle = (info) => StyleSheet.create({
    color: 'black',
    fontSize: Platform.OS === 'ios' ? 10 : 12,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 4,
    paddingTop: 4,
    borderRadius: 10,
    marginLeft: info === 'carrer' ? 0 : 20,
    marginRight: info === 'view' ? 15 : 0,
    backgroundColor: 'hsla(307, 20%, 95%, 0.5)',
    overflow: 'hidden'
})
