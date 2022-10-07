import Icon from "../Icon";
import { TouchableHighlight } from "react-native";
import { useDispatch } from "react-redux";
import { firstRegisterReset } from "../../redux/action/register/firstRegisterAction";
import { reset } from "../../redux/action/login/loginAction";
import { StackActions, useRoute } from "@react-navigation/native";
import { backToPreviousFilter } from "../../redux/action/profile/profileAction";
import { backToPreviousSearchFilter } from "../../redux/action/search/searchAction";

export default function CloseBtn({ navigation, type }) {
    const dispatch = useDispatch();
    const { previousName } = useRoute().params;
    const onPressCloseBtn = () => {
        if (type === 'firstRegisterReset') {
            dispatch(firstRegisterReset());
            navigation.pop();
        }
        else if (type === 'authEmail') {
            dispatch(reset());
            navigation.pop();
        }
        else if (type === 'filter') {
            setTimeout(() => {
                previousName === 'searchResultPage' ?
                dispatch(backToPreviousSearchFilter()) :
                dispatch(backToPreviousFilter())
            }, 1);
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
            <Icon props={['materail', 'close', type === 'filter' ? 26 : 30, 'black']} />
        </TouchableHighlight>
    );
}