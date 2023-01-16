import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Snackbar as ReactNativePaperSnackbar } from 'react-native-paper';

const Snackbar = ({
    message,
    severity,
    toggled,
    onDismiss = () => { console.log('dismiss alert function triggered') },
    onClose = () => { console.log('close alert function triggered') }
}) => {
    return <ReactNativePaperSnackbar
        style={styles[severity] || styles.error}
        visible={toggled}
        onDismiss={onDismiss}
        action={{
            label: 'close',
            onPress: onClose,
        }}>
        {message}
    </ReactNativePaperSnackbar>
}

const styles = StyleSheet.create({
    error: {
        zIndex: 100,
        backgroundColor: 'red',
    },
    info: {
        zIndex: 100,
        backgroundColor: 'blue'
    },
    warning: {
        zIndex: 100,
        backgroundColor: 'yellow'
    },
    success: {
        zIndex: 100,
        backgroundColor: 'green'
    }
})

export default Snackbar

