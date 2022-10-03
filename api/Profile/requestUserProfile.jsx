import { useSelector } from "react-redux";
import api from "../../config/CustomAxios";
import { saveUserProfile } from "../../redux/action/profile/profileAction";
import store from "../../redux/store";


export default async function requestUserProfile(purpose, profileId) {
    const userId = store.getState().user.id;
    try {
        const res = await api.get(`user/profile/${purpose}`, {
            params: {
                userId: userId,
                profileId: profileId
            }
        })
        store.dispatch(saveUserProfile(res.data));
        console.log(res.data)
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