import InputGroup from "../InputGroup/index";
import { Button } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { useState } from "react";
import { ScanManager } from "../ScanManager";
import { Ionicons } from "@expo/vector-icons";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    height: 96,
  },
  input: {
    display: "flex",
    flexDirection: "row",
    width: "80%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "20%",
    height: 56,
    backgroundColor: "#F4F4F4",
    alignItems: "center",
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "#5393ff",
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
});

export function InputGroupScan({
  label = "Reference",
  isError = false,
  errors = [],
  value = "",
  onInputOrScannedData = (value) => {},
  onScannedDataType = (value) => {},
}) {
  const [scannerToggled, setScannerToggled] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.input}>
        <InputGroup
          label={label}
          isError={isError}
          errors={errors}
          value={value}
          handleInput={(value) => {
            setScannerToggled(false);
            onInputOrScannedData(value);
          }}
        />
      </View>
      <View
        style={{
          ...styles.button,
          borderColor: isError ? "#b91c1c" : "#5393ff",
          marginTop: isError ? 0 : 12,
        }}
      >
        <Button onPress={() => setScannerToggled(true)}>
          <Ionicons
            name={"barcode-outline"}
            size={32}
            color={isError ? "#b91c1c" : "#5393ff"}
          />
        </Button>
      </View>
      {scannerToggled ? (
        <ScanManager
          setScannedData={(value) => {
            setScannerToggled(false);
            onInputOrScannedData(value);
          }}
          setScannedDataType={(value) => {
            setScannerToggled(false);
            onScannedDataType(value);
          }}
          setScannerToggled={setScannerToggled}
        />
      ) : null}
    </View>
  );
}
