import * as React from "react";
import { View } from "react-native";
// import NfcManager, { NfcTech } from 'react-native-nfc-manager';
import { Text } from "react-native-paper";

// NfcManager.start();

async function readNdef(setTag) {
  // try {
  //     // register for the NFC tag with NDEF in it
  //     await NfcManager.requestTechnology(NfcTech.Ndef);
  //     // the resolved tag object will contain `ndefMessage` property
  //     const tag = await NfcManager.getTag();
  //     setTag(tag)
  // } catch (ex) {
  //     NfcManager.cancelTechnologyRequest();
  // } finally {
  //     // stop the nfc scanning
  //     NfcManager.cancelTechnologyRequest();
  // }
}

export const NFCManager = (props) => {
  const [tag, setTag] = React.useState("");
  const [listener, setListener] = React.useState(null);

  // React.useEffect(() => {
  //     const listenerRef = setInterval(() => readNdef(setTag), 50)
  //     !listener && !tag && setListener(listenerRef)
  //     return () => {
  //         listener && clearInterval(listenerRef)
  //     }
  // }, [])

  return (
    <View>
      {props.children}
      <Text variant="titleLarge">{tag}</Text>
    </View>
  );
};
