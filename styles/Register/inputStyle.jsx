import { StyleSheet } from "react-native";

const inputStyle = (content) => StyleSheet.create({
    width: content === 'startDate' || content === 'nextHospital' ? '100%' : '20%',
    marginLeft: content === 'weight' || content === 'career' ? 15 : 0,
    paddingVertical: 1,
    fontSize: 14,
    marginRight: content === 'pay' ? 3 : 5,
    paddingLeft: content === 'pay' ? 1 : 3,
    borderBottomColor: 'silver',
    borderBottomWidth: 0.5,
    marginTop: content === 'startDate' || content === 'nextHospital' ? 10 : 0
})

export default inputStyle;