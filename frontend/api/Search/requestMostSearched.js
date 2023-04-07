/* 가장 많이 검색한 키워드 받아오기 */

import api from "../../config/CustomAxios"
import { saveMostKeyWordsLoading, saveMostSearchedKeyWords } from "../../redux/action/search/searchAction";
import store from "../../redux/store";

export default async function requestMostSearched() {
    try {
        store.dispatch(saveMostKeyWordsLoading(true));
        const _res = await api.get('search/most/keywords');
        store.dispatch(saveMostSearchedKeyWords(_res.data));
        store.dispatch(saveMostKeyWordsLoading(false));
    }
    catch( err ) {
        console.log('searchPage', err)
    } 
}