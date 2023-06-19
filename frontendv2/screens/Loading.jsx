/* loading page */
import { ActivityIndicator, View } from "react-native"
export default function Loading() {
    return (
        <View style = {{flex: 1, justifyContent:'flex-start', alignItems: 'center', width: '100%', marginTop: 250}}>
            <ActivityIndicator size='large' color= 'rgba(65, 92, 118, 0.85)' />
        </View>
    )
}