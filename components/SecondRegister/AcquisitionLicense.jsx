/* 간병인용 취득 자격증 */
import { useEffect } from "react";
import { useState } from "react";
import { Text, TouchableHighlight, View } from "react-native";
import { useDispatch } from "react-redux";
import ResetArrayData from "../../functions/ResetArrayData";
import { deleteLicense, saveLicense } from "../../redux/action/register/secondRegisterAction";
import licenseData from "../../data/Register/license.data";
import selectStyle from "../../styles/Register/selectStyle";

export default function AcquisitionLicense() {
    
    const [license, setLicense] = useState(licenseData);
    const dispatch = useDispatch();
    
    useEffect(() => {
        setLicense(ResetArrayData(license));
    }, [])

    const selectLicense = (title) => {
        const toggleData = [...license];

        toggleData.map((data) => {
            if (data.title === title) {
                if (data.checked === true) {
                    data.checked = false;
                    dispatch(deleteLicense(data.title));
                }
                else {
                    data.checked = true
                    dispatch(saveLicense(data.title));
                }
            }
        })
        setLicense(toggleData)
    }

    return (
        <View style={selectStyle.select}>
            <Text>
                취득 자격증
            </Text>
            <View style={selectStyle.content}>
                {license.map((select) => {
                    return (
                        <TouchableHighlight
                            underlayColor='none'
                            onPress={() => { selectLicense(select.title) }}
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
