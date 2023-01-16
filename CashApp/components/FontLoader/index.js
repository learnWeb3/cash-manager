import * as React from 'react';
import * as Font from 'expo-font';
import poppins from '../../assets/fonts/Poppins-SemiBold.ttf'
import orbitron from '../../assets/fonts/Orbitron-Regular.ttf'
import { Text } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

const FontLoader = (props) => {


    const [fontLoaded, setFontLoaded] = React.useState(false)
    const loadFonts = async () => await Font.loadAsync({
        'Poppins': poppins,
        'Orbitron': orbitron
    })

    React.useEffect(() => {
        loadFonts().then(() => {
            setFontLoaded(true)
        }).catch((error)=>console.error(error))
    }, [])



    return <View style={styles.container}>
        {fontLoaded ? props.children : <Text variant="headlineSmall">Loading ...</Text>}
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default FontLoader