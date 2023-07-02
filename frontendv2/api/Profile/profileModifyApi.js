/* 프로필 수정 api */

import api from "../../config/CustomAxios";
import { requestRefreshToken } from "../../functions/Token";
import { saveCareer, saveFirstPay, saveNextHospital, saveStartDate, saveWeight } from "../../redux/action/register/caregiverInfoAction";
import { logout } from "../../redux/action/user/userAction";
import store from "../../redux/store";

export async function requestRegisteredProfile(navigation, page) {
    try {
        const res = await api.get('profile', {
            params: {
                page
            }
        })
        saveExistData(res.data, page);
    }
    catch(err) {
        const errorCode = err.response.data.statusCode;
        switch( errorCode ) {
            case 404:
                console.log(err.response.data)
                //await AsyncStorage.multiRemove(['accessToken', 'refreshToken']);
              //  store.dispatch(logout());
                break;
            //만료된 토큰일 경우
            case 401:
                if (await requestRefreshToken(navigation)) {
                    requestRegisteredProfile(page);
                }
                break;
        }
    }
}

function saveExistData(data, page) {
    if( page == 1 ) {
        firstRegisterData( data );
        return;
    }
   /*  if ( page == 2 ) {
        secondRegisterData(data);
        return;
    }
    lastRegisterData(data); */
    return;
}

function firstRegisterData ( data ) {
    store.dispatch( saveWeight( data.weight ));
    store.dispatch( saveCareer( data.career ));
    store.dispatch( saveNextHospital( data.nextHospital ));
    store.dispatch( saveFirstPay( data.pay ));
    store.dispatch( saveStartDate( data.startDate ));
    const areaList = _convertArea();
    const license = _convertLicense();

    function _convertArea() {
        const _areas = data.possibleArea;
        return _areas.length ? _areas.split(',') : []; 
    }

    function _convertLicense() {
        const _licenses = data.license;
        return _licenses.length ? _licenses.split(',') : [];
    }
}