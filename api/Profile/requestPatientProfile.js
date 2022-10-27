/* 환자 정보 요청 */

import api from "../../config/CustomAxios"
import { ProtectorProfileLoading, savePatientProfile } from "../../redux/action/chat/chatAction"
import store from "../../redux/store"

export default async function requestPatientProfile(protectorId) {

    try{

        const res = await api.get('user/profile', {
            params: {
                purpose: 'protector',
                id: protectorId
            }
        })

        store.dispatch(
            savePatientProfile(
                res.data
            )
        )
    }
    catch(err) {
        console.log(err)
    }
}