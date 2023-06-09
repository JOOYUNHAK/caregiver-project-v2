/* 가장 많이 조회한 프로필 */

import api from "../../config/CustomAxios";
import { saveMostViewedLoading, saveMostViewedProfiles } from "../../redux/action/search/searchAction";
import store from "../../redux/store";

export default async function requestMostViewed() {
    try{
        store.dispatch(saveMostViewedLoading(true));
        const _res = await api.get('user/most/profiles');
        store.dispatch(saveMostViewedProfiles(_res.data));
        store.dispatch(saveMostViewedLoading(false));
    }
    catch(err) {
        console.log('mostview', err);
    }
} 