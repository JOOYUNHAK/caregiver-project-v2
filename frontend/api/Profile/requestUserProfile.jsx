import { useSelector } from "react-redux";
import api from "../../config/CustomAxios";
import { saveUserProfile } from "../../redux/action/profile/profileAction";
import { saveMostViewed } from "../../redux/action/search/searchAction";
import store from "../../redux/store";

export default async function requestUserProfile(purpose, profileId) {
    const userId = store.getState().user.id;
    let { mostViewed } = store.getState().search;
    mostViewed = mostViewed ? true : undefined;
    try {
        //const start = new Date().getTime();
        const res = await api.get(`user/profile/${purpose}`, {
            params: {
                userId: userId,
                profileId: profileId,
                mostViewed: mostViewed
            }
        })
        //const end = new Date().getTime();
        //console.log(end - start)
        store.dispatch(saveUserProfile(res.data));
        store.dispatch(saveMostViewed(false));
        return 'true';
    }
    catch (err) {
        console.log(err.response)
        const status = err.response.status;
        const message = err.response.data.message;
        if (status == 404) {
            return message;
        }
    }
}