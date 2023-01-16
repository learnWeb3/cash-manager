import { IconButton, Text } from "react-native-paper";
import { View } from "react-native";

export default function ScreenHeader(props) {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        height: 72,
        paddingTop: 16,
      }}
    >
      {props.onBackClick ? (
        <IconButton
          onPress={props.onBackClick}
          icon="chevron-left"
          size={24}
          color={"#f44336"}
        />
      ) : null}
      <Text
        variant="titleMedium"
        style={!props.onBackClick ? { marginLeft: 16 } : {}}
      >
        {props.options.title}
      </Text>
    </View>
  );
}
