import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Portal, Button } from "react-native-paper";

export const ScanManager = ({
  setScannedData = () => {},
  setScannedDataType = () => {},
  setScannerToggled = () => {},
}) => {
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScannedDataType(type);
    setScannedData(data);
  };

  return (
    <Portal>
      <View
        style={{
          backgroundColor: "#000",
          ...StyleSheet.absoluteFillObject,
          padding: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {hasPermission === null ? (
          <Text>Requesting for camera permission</Text>
        ) : !hasPermission ? (
          <Text>No access to camera</Text>
        ) : (
          <>
            <BarCodeScanner
              onBarCodeScanned={handleBarCodeScanned}
              style={{
                height: "100%",
                width: "100%",
                margin: 0,
              }}
            />

            <View
              style={{
                position: "absolute",
                bottom: 36,
              }}
            >
              <Button
                onPress={() => setScannerToggled(false)}
                icon="cancel"
                mode="contained"
                buttonColor="#b91c1c"
                color="#b91c1c"
              >
                Cancel
              </Button>
            </View>
          </>
        )}
      </View>
    </Portal>
  );
};
