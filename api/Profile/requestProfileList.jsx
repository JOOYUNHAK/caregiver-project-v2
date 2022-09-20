/* 프로필 api 중 목록 받아오기 */

import api from "../../config/CustomAxios";
import { saveCareGiverProfile, saveLastListNo } from "../../redux/action/profile/profileAction";
import store from "../../redux/store";


export default async function requestProfileList(purpose) {
    try {
        const start = store.getState().profile.lastListNo;
        const res = await api.get(`user/profile/${purpose}`, {
            params: {
                start: start
            }
        });
        const profileList = res.data;
        if(purpose === 'careGiver') {
            store.dispatch(saveCareGiverProfile(profileList));
            store.dispatch(saveLastListNo(start+5));
        }
        else {
            console.log('assistant')
        }
        return true;
    }
    catch (err) {
        console.log(err);
        return false;
    }
}