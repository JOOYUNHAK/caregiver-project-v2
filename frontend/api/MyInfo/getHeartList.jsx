/* 찜 목록 받아오기 */

import api from "../../config/CustomAxios";
import { requestRefreshToken } from "../../functions/Token";
import { saveHeartListProfile } from "../../redux/action/profile/profileAction";
import store from "../../redux/store";

export default async function getHeartList(navigation) {
    try {
        const { id } = store.getState().user;
        const res = await api.get(`user/heartList/${id}`);
        store.dispatch(saveHeartListProfile(res.data));
        console.log(res.data)
    }
    catch (err) {
        console.log(err)
        const statusCode = err.response.data.statusCode;
        switch ( statusCode ) {
            case 401: 
                if (await requestRefreshToken(navigation))
                    await getHeartList();
        }
    }
}