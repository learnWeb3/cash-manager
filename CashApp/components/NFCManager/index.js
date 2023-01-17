import * as React from "react";
import NfcManager, { Ndef, NfcEvents } from "react-native-nfc-manager";

NfcManager.start();

export const NFCManager = ({
  inpuRef = null,
  children = null,
  setTag = () => {},
}) => {
  React.useEffect(() => {

    NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
    NfcManager.setEventListener(NfcEvents.DiscoverTag, (tag) => {
      const message = Ndef.text.decodePayload(tag.ndefMessage[0].payload);
      const messageWithoutLanguageCode = message.replace(/^en(.*)$/, "$1");
      setTag(messageWithoutLanguageCode);
    });

    NfcManager.registerTagEvent({ invalidateAfterFirstRead: false });
    return () => {
      NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
    };
  }, [inpuRef]);

  return <>{children}</>;
};
