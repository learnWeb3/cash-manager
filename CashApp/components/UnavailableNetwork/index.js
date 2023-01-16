import { StyleSheet, View } from 'react-native';
import { Avatar, Text } from 'react-native-paper';

const UnavailableNetwork = () => {
    return <View style={style.container}>
        <Avatar.Icon color='#FFF' size={96} icon="network-strength-off" style={style.avatar} />
        <Text style={style.text} variant="titleMedium">Internet is unavailable please check your network status.</Text>
    </View>
}

const style = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar: {
        marginBottom: 16
    },
    text: {
        textAlign: 'center'
    }
})


export default UnavailableNetwork