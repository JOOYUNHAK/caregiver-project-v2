/* 주소 검색 */

import Postcode from '@actbase/react-daum-postcode';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';

export default function FindAddress() {
    const navigation = useNavigation();

    const selectAddress = (data) => {
        let address = ''; //입력받을 주소
        const buildingName = data.buildingName; //건물명

        //선택 안함 부분을 선택했을 때
        if(data.noSelected === 'Y') {
            //자동 매핑 도로 주소 반환
            if(data.userSelectedType === 'R') {
                address = data.autoRoadAddress;
            }
            //지번 주소 자동 매핑 반환
            else if(data.userSelectedType === 'J'){
                address = data.autoJibunAddress;
            }
        }
        else {
            if(data.userSelectedType === 'R') {
                address = data.roadAddress;
            }
            else {
                address = data.jibunAddress
            }
        }
        console.log(buildingName)
        address = !! buildingName.length ? `${address} (${buildingName})` : address

        navigation.dispatch(
            CommonActions.navigate({
                name: 'secondRegisterPage',
                params: {
                    address
                }
            })
        )

    }

    return(
        <Postcode 
            style={{ width: wp('100%'), height: hp('100%') }}
            jsOptions = {{ animation: true }}
            onSelected = { data => selectAddress(data)}
        />
    )
}