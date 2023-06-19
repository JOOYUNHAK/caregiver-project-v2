import api from "../config/CustomAxios";
import { saveRoomList } from "../redux/action/chat/chatAction";
import store from "../redux/store";

export async function getRoomList(navigation) {
    try {
        //redis 서버가 죽으면 mysql에서 조회해야 하므로 id함께 전달
        api.get(`chat/rooms`).then((res) => {
            store.dispatch(
                saveRoomList(
                    res.data
                )
            )
        })
    }
    catch(err) {

    }
}
