/* 프로필 api 중 목록 받아오기 */

import api from "../../config/CustomAxios";
import { saveCareGiverProfile } from "../../redux/action/profile/profileAction";
import store from "../../redux/store";


export default async function requestProfileList(purpose) {
    try {
        const res = await api.get(`user/profile/${purpose}`);
        const profileList = res.data;
        if(purpose === 'careGiver')
            store.dispatch(saveCareGiverProfile(profileList));
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