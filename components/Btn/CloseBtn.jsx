import Icon from "../Icon";
import { TouchableHighlight } from "react-native";
import { useDispatch } from "react-redux";
import { firstRegisterReset } from "../../redux/action/register/firstRegisterAction";
import { reset } from "../../redux/action/login/loginAction";
import { StackActions } from "@react-navigation/native";

export default function CloseBtn({ navigation, type }) {
    const dispatch = useDispatch();

    const onPressCloseBtn = () => {
        if(type === 'firstRegisterReset') {
            dispatch(firstRegisterReset());
            navigation.pop();
        } 
        else if(type === 'authEmail') {
            dispatch(reset());
            navigation.pop();
        }
        else
            navigation.pop();
    }

    return (
        <TouchableHighlight
            underlayColor='none'
            onPress={() => onPressCloseBtn()}
        >
            <Icon props={['materail', 'close', 30, 'black']} />
        </TouchableHighlight>
    );
}