import React, { useRef, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";
import { Portal } from "react-native-paper";
import { Text, Button } from "react-native-paper";

export default function PaymentSuccess({ onClose = () => {} }) {
  const animation = useRef(null);
  useEffect(() => {
    // You can control the ref programmatically, rather than using autoPlay
    // animation.current?.play();
  }, []);

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
          backgroundColor: "#f4f4f4",
        }}
      >
        <LottieView
          autoPlay
          ref={animation}
          style={{
            width: 200,
            height: 200,
            backgroundColor: "#f4f4f4",
          }}
          source={require("./assets/payment_successful.json")}
        />
        <Text style={{ marginBottom: 24 }} variant="titleMedium">
          Payment sucess !
        </Text>

        <Button style={{ marginBottom: 24 }} onPress={onClose} mode="contained">
          close
        </Button>
      </View>
    </Portal>
  );
}
