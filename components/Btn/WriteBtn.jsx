/* 글쓰기 버튼 */
import { TouchableHighlight, StyleSheet } from "react-native";
import Icon from "../Icon";

export default function WriteBtn({navigation}) {
    return (
        <TouchableHighlight
            underlayColor='none'
            onPress={() => navigation.push('WritingPage')}
            style={styles.WriteBtn}>
            <Icon props={['antdesign', 'plus', 26, 'red']} />
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    WriteBtn: {
        position: 'absolute',
        alignSelf: 'flex-end',
        width: 50,
        height: 50,
        bottom: 10,
        backgroundColor: 'ghostwhite',
        borderRadius: 150,
        right: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 2
      },
})