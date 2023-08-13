import api from "../../config/CustomAxios";
import { requestRefreshToken } from "../../functions/Token";
import { saveUserProfile } from "../../redux/action/profile/profileAction";
import { saveMostViewed } from "../../redux/action/search/searchAction";
import store from "../../redux/store";

export default async function requestUserProfile(navigation, profileId) {
    let { mostViewed } = store.getState().search;
    mostViewed = mostViewed ? true : undefined;
    try {
        const res = await api.get(`profile/detail/${profileId}`);
        store.dispatch(saveUserProfile(res.data));
        store.dispatch(saveMostViewed(false));
        return true;
    }
    catch (err) {
        console.log(err.response.data)
        const status = err.response.status;
        const message = err.response.data.message;
        if (status == 404) {
            return message;
        }
        await requestRefreshToken(navigation);
        const res = await api.get(`profile/detail/${profileId}`);
        store.dispatch(saveUserProfile(res.data));
        return true;
    }
}