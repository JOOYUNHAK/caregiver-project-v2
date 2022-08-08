import Icon from "../Icon";
import { TouchableHighlight } from "react-native";

export default function CloseBtn({ navigation }) {
    return (
        <TouchableHighlight
            underlayColor='none'
            onPress={() => navigation.pop()}
        >
            <Icon props={['materail', 'close', 30, '#94c6ad']} />
        </TouchableHighlight>
    );
}