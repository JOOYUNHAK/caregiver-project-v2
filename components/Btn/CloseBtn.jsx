import Icon from "../Icon";
import { TouchableHighlight } from "react-native";
import { useDispatch } from "react-redux";
import { firstRegisterReset } from "../../redux/action/register/firstRegisterAction";

export default function CloseBtn({ navigation, type }) {
    const dispatch = useDispatch();

    const onPressCloseBtn = () => {
        if(type == 'firstRegisterReset') {
            dispatch(firstRegisterReset());
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
            <Icon props={['materail', 'close', 30, '#94c6ad']} />
        </TouchableHighlight>
    );
}