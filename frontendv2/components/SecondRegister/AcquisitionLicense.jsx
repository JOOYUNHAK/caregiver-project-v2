/* 간병인용 취득 자격증 */
import { useEffect } from "react";
import { useState } from "react";
import { Text, TouchableHighlight, View } from "react-native";
import { useDispatch } from "react-redux";
import resetArrayData from "../../functions/resetArrayData";
import { deleteLicense, saveLicense } from "../../redux/action/register/caregiverInfoAction";
import licenseData from "../../data/Register/license.data";
import selectStyle from "../../styles/Register/selectStyle";

export default function AcquisitionLicense() {
    
    const [license, setLicense] = useState(licenseData);
    const dispatch = useDispatch();
    
    useEffect(() => {
        setLicense(resetArrayData(license));
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
        <View style={[selectStyle.select,{marginVertical: 17}]}>
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
                                borderWidth: select.checked ? 1 :0.5,
                                margin: 5,
                                borderRadius: 5,
                                backgroundColor: 'white',
                                borderColor: select.checked ? '#0c2461' : 'silver'
                            }}>
                            <Text style={{
                                paddingVertical: 5,
                                paddingLeft: 20,
                                paddingRight: 20,
                                color: select.checked ? '#0c2461' : 'darkgray'
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
