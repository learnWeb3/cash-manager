import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput, Text } from 'react-native-paper';

const InputGroup = ({ label, isError, value, errors, handleInput, secureTextEntry = false, style = {}, editable = true }) => {

    return <View style={{ ...style }}>
        <TextInput
            error={isError}
            label={label}
            value={value}
            secureTextEntry={secureTextEntry}
            onChangeText={email => handleInput(email)}
            editable={editable}
        />
        {isError && <Text style={styles.errorText} variant="labelSmall">{errors.join(', ')}</Text>}

    </View>

}

const styles = StyleSheet.create({
    errorText: {
        marginTop: 8,
        color: "red"
    }
})

export default InputGroup