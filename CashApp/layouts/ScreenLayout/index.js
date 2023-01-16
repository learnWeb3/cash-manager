import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Portal } from "react-native-paper";

const ScreenLayout = ({ children }) => (
  <Portal.Host>
    <View style={styles.container}>
      <View style={styles.viewContainer}>{children}</View>
    </View>
  </Portal.Host>
);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    height: "100%",
  },
  viewContainer: {
    width: "100%",
    height: "100%",
  },
});

export default ScreenLayout;
