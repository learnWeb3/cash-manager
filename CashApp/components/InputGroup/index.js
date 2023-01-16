import * as React from "react";
import { StyleSheet, View } from "react-native";
import { TextInput, Text } from "react-native-paper";

const InputGroup = ({
  label,
  isError,
  value,
  errors,
  handleInput = (value) => {},
  secureTextEntry = false,
  multiline = false,
  numberOfLines = 1,
  style = {
    width: "100%",
    marginBottom: 16,
  },
  disabled = false,
}) => {
  return (
    <View style={style}>
      <TextInput
        error={isError}
        label={label}
        value={value}
        secureTextEntry={secureTextEntry}
        onChangeText={(value) => handleInput(value)}
        multiline={multiline}
        numberOfLines={numberOfLines}
        disabled={disabled}
      />
      {isError && (
        <Text style={styles.errorText} variant="labelSmall">
          {errors.join(", ")}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  errorText: {
    marginTop: 8,
    color: "red",
  },
});

export default InputGroup;
