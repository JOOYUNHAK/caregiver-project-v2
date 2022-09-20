import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios"

axios.defaults.baseURL = 'http://172.30.1.33:8080';
//axios.defaults.baseURL = 'http://192.168.0.46:8080';

const api = axios.create({
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.request.use(
    async config => {
        //await AsyncStorage.clear();
        const token = await AsyncStorage.getItem('accessToken');
        //console.log(token)
        if( token ) {
            config.headers.Authorization = `Bearer ${token}`
            //console.log(config.headers.Authorization); 
        }
        return config
    },
    error => {
        console.log(Promise.reject(error))
    }
)

export default api;