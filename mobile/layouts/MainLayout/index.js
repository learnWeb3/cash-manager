import * as React from 'react'
import { StyleSheet, View } from 'react-native';

export const MainLayout = (props) => {
    return <View style={styles.container}>
        {props.children}
    </View>
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFF",
        paddingTop: 32,
        position: 'relative'
    }
})

