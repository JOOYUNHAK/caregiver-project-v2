/* 필터 아이콘 */

import { StackActions, useNavigation, useRoute } from "@react-navigation/native";
import { TouchableHighlight, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import Icon from "../../Icon";

export default function FilterIcon() {
    const navigation = useNavigation();
    const { name } = useRoute()    
    return (
        <View style={{ position: 'absolute', right: wp('5%'), marginTop: 1 }}>
            <TouchableHighlight
                underlayColor='none'
                onPress={() => navigation.dispatch(
                    StackActions.push('filterPage', {
                        previousName: name
                    })
                )}
            >
                <Icon props={['material', 'tune', 20, '#7a7a7a']} />
            </TouchableHighlight>
        </View>
    )
}