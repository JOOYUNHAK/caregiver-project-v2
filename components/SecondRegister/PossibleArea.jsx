/* 간병인용 가능 지역 */
import { useEffect } from "react";
import { useState } from "react";
import { Text, TouchableHighlight, View } from "react-native";
import { useDispatch } from "react-redux";
import resetArrayData from "../../functions/resetArrayData";
import { deletePossibleArea, savePossibleArea } from "../../redux/action/register/secondRegisterAction";
import areaData from "../../data/Register/area.data";
import selectStyle from "../../styles/Register/selectStyle";

export default function PossibleArea() {

    const [area, setArea] = useState(areaData);
    const dispatch = useDispatch();
    
    useEffect(() => {
        setArea(resetArrayData(area));
    }, []);

    const selectArea = (title) => {
        const toggleData = [...area];

        toggleData.map((data) => {
            if (data.title === title) {
                if (data.checked === true) {
                    data.checked = false;
                    dispatch(deletePossibleArea(data.title));             
                }
                else {
                    data.checked = true
                    dispatch(savePossibleArea(data.title));
                }
            }
        })
        setArea(toggleData)
    }
    return (
        <View style={selectStyle.select}>
            <Text>
                가능 지역
            </Text>
            <View style={selectStyle.content}>
                {area.map((select) => {
                    return (
                        <TouchableHighlight
                            underlayColor='none'
                            onPress={() => { selectArea(select.title) }}
                            key={select.id}
                            style={{
                                borderWidth: 0.5,
                                margin: 5,
                                borderRadius: 5,
                                backgroundColor: select.checked ? '#a5d847' : 'white',
                                borderColor: select.checked ? 'whitesmoke' : '#cacaca'
                            }}>
                            <Text style={{
                                paddingVertical: 5,
                                paddingLeft: 20,
                                paddingRight: 20,
                                color: select.checked ? 'whitesmoke' : '#81c300'
                            }}>
                                {select.title}
                            </Text>
                        </TouchableHighlight>
                    )
                })}
            </View>
        </View>
    )
}