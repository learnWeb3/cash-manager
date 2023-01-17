import * as React from "react";
import NfcManager, { Ndef, NfcEvents } from "react-native-nfc-manager";

export const NFCManager = ({ children = null, setTag = () => {} }) => {
  React.useEffect(() => {
    NfcManager.setEventListener(NfcEvents.DiscoverTag, (tag) => {
      const message = Ndef.text.decodePayload(tag.ndefMessage[0].payload);
      const messageWithoutLanguageCode = message.replace(/^en(.*)$/, "$1");
      setTag(messageWithoutLanguageCode);
    });

    NfcManager.registerTagEvent({ invalidateAfterFirstRead: false });
    return () => {
      NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
    };
  }, []);

  return <>{children}</>;
};
