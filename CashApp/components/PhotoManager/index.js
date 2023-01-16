import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Camera, CameraType } from "expo-camera";
import { Portal, Button } from "react-native-paper";

export const PhotoManager = ({
  setPhoto = () => {},
  setCameraToggled = () => {},
}) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraMode, setCameraMode] = useState(CameraType.back);
  const [cameraRef, setCameraRef] = useState(null);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  const handleTakePhoto = async () => {
    if (!cameraRef) return;
    const photo = await cameraRef.takePictureAsync();
    setPhoto(photo);
    setCameraToggled(false);
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
            <Camera
              type={cameraMode}
              ref={(ref) => {
                setCameraRef(ref);
              }}
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
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
                width: "100%",
                paddingLeft: 16,
                paddingRight: 16,
              }}
            >
              <Button
                onPress={() => setCameraToggled(false)}
                icon="cancel"
                mode="contained"
                buttonColor="#b91c1c"
                color="#b91c1c"
              >
                Cancel
              </Button>
            </View>

            <View
              style={{
                height: 64,
                width: 64,
                backgroundColor: "#FFF",
                borderRadius: 32,
                position: "absolute",
                bottom: 28,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                onPress={handleTakePhoto}
                mode="contained"
                buttonColor="#FFF"
                color="#FFF"
                style={{
                  height: "100%",
                  width: "100%",
                  borderRadius: 32,
                  borderWidth: 2,
                  borderStyle: "solid",
                  borderColor: "#5393ff",
                }}
              ></Button>
            </View>
          </>
        )}
      </View>
    </Portal>
  );
};
