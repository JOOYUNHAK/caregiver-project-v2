/* 활동보조사 실습 여부 */

import { useState } from "react";
import { StyleSheet } from "react-native";
import { View, Text, TouchableHighlight } from "react-native";
import { useDispatch } from "react-redux";
import { saveTraining } from "../../../redux/action/register/secondRegisterAction";
import { heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import trainingData from "../../../data/Register/SecondRegister/training.data";
import { useEffect } from "react";
import ResetArrayData from "../../../functions/ResetArrayData";

export default function Training() {
    const dispatch = useDispatch();
    const [complete, setComplete] = useState(trainingData);
    
    useEffect(() => {
        setComplete(ResetArrayData(complete));
    }, []);

    const onPressHandler = (title) => {
        const toggleData = [...complete];
        toggleData.map((data) => {
            if(data.title === title)
                data.checked = true;
            else
                data.checked = false;
        })
        dispatch(saveTraining(title))
        setComplete(toggleData)
    }

    return (
        <View style={styles.training}>
            <Text style={{ paddingLeft: 20}}>
                실습 여부
            </Text>
            <View style={styles.isTraining}>
                {complete.map((select) => {
                    return (
                        <TouchableHighlight
                            key={select.id}
                            underlayColor='none'
                            onPress={() => onPressHandler(select.title)}
                            style={{
                                borderWidth: 0.5,
                                borderRadius: 5,
                                backgroundColor: select.checked ?  '#a5d847' : 'white',
                                borderColor: select.checked ? 'whitesmoke' : '#cacaca',
                                width: '40%',
                            }}
                        >
                            <Text style={{
                                paddingVertical: 13,
                                paddingLeft: 20,
                                paddingRight: 20,
                                color: select.checked ? 'whitesmoke' : '#81c300',
                                textAlign: 'center'
                            }}>
                                {select.title}
                            </Text>
                        </TouchableHighlight>
                    )
                })}
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    training: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        height: hp('13%'),
    },

    isTraining: { 
        flexDirection: 'row', 
        justifyContent: 'space-around', 
        width: wp('100%'),
        marginTop: 15 }
})