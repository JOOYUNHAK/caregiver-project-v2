import { TextInput, StyleSheet, Platform } from "react-native";

export default function (props) {

    const setFocus = props.props[0];
    const setText = props.props[1];
    const maxLength = props.props[2];
    const placeholder = props.props[3];
    const locate = props.props[4];
    const focus = props.props[5];
        
    return (
        <TextInput
            onBlur={() => setFocus(false)}
            onFocus={() => {setFocus(true);}}
            onChangeText={(text) => setText(text)}
            maxLength={maxLength}
            placeholder={placeholder}
            style = {
                locate === 'tagPartTag' ? 
                    tagPart('20%', focus).tag : 
                        locate === 'tagPartReason' ? 
                            tagPart('80%', focus).reason :
                                bottomPart(focus)}
        />
    )
}

const tagPart = (width, focus) => StyleSheet.create({
    tag: {
        width: width,
        borderBottomWidth: 1,
        borderBottomColor: focus ? 'black' : 'silver',
        fontWeight: 'bold',
        fontSize: Platform.OS === 'ios' ? 11 : 14,
        paddingVertical: 10
    },

    reason: {
        width: width,
        marginLeft: 10,
        borderBottomWidth: 1,
        fontSize: Platform.OS === 'ios' ? 11 : 14,
        borderBottomColor: focus ? 'black' : 'silver',
        fontWeight: 'bold',
        paddingVertical: 10
    }
})

const bottomPart = (focus) => StyleSheet.create({
    marginRight: -10,
    borderBottomWidth: 1,
    fontSize: Platform.OS === 'ios' ? 11 : 14,
    borderBottomColor: focus ? 'black' : 'silver',
    fontWeight: 'bold',
    paddingVertical: 10,
})