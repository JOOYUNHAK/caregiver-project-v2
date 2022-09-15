import api from "../../config/CustomAxios";
import { saveUserProfile } from "../../redux/action/profile/profileAction";
import store from "../../redux/store";


export default async function requestUserProfile(purpose, profileId) {
    try {
        const res = await api.get(`user/profile/${purpose}`, {
            params: {
                id: profileId
            }
        })
        store.dispatch(saveUserProfile(res.data));
        return true;
    }
    catch(err) {
        const status = err.response.status;
        if(status == 404)
            return false;
    }

    
}