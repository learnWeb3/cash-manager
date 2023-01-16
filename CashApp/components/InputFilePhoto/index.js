import { ImageBackground, View } from "react-native";
import { useState, useEffect } from "react";
import { PhotoManager } from "../PhotoManager";
import { Button } from "react-native-paper";

export function InputFilePhoto({
  photoURL = "",
  onPhotoURLChange = (url) => {},
  style = {
    height: 300,
    width: "100%",
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "#5393ff",
    borderRadius: 5,
    marginBottom: 16,
  },
}) {
  const [cameraToggled, setCameraToggled] = useState(false);

  useEffect(() => {}, [photoURL]);
  return (
    <View
      style={{
        ...style,
      }}
    >
      <ImageBackground
        source={{ uri: photoURL }}
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          onPress={() => setCameraToggled(true)}
          icon="camera"
          mode="contained"
        >
          {photoURL ? "Update" : "Take"} picture
        </Button>
      </ImageBackground>
      {cameraToggled ? (
        <PhotoManager
          setPhoto={(photoObject) => {
            if (!photoObject.uri) {
              return;
            }
            onPhotoURLChange(photoObject.uri);
          }}
          setCameraToggled={setCameraToggled}
        />
      ) : null}
    </View>
  );
}
