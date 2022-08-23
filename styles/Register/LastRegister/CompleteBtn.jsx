/* 회원가입 완료 버튼 테두리 스타일 */
import { Platform } from "react-native";
import { StyleSheet } from "react-native"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

const completeBtnStyle = (isFill) => StyleSheet.create({
    marginTop: hp('5%'),
    alignSelf: 'center',
    borderRadius: 5,
    width: wp('90%'),
    backgroundColor: isFill ? '#78e7b9' : '#c0f3dc'
});

const completeBtnTextStyle = (isFill) => StyleSheet.create({
    paddingHorizontal: wp('15%'), 
    paddingVertical: 15, 
    textAlign: 'center',
    color: 'white',
    fontSize: Platform.OS === 'ios' ? 13 : 16
});

export { completeBtnStyle,  completeBtnTextStyle} ;