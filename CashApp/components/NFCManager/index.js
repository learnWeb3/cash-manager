import NfcManager, { Ndef, NfcEvents } from "react-native-nfc-manager";

export async function listenToNfcEventOnce() {
  const cleanUp = () => {
    NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
    NfcManager.setEventListener(NfcEvents.SessionClosed, null);
  };

  return await new Promise((resolve, reject) => {
    let tagFound = null;

    NfcManager.setEventListener(NfcEvents.DiscoverTag, (tag) => {
      const message = Ndef.text.decodePayload(tag.ndefMessage[0].payload);
      const messageWithoutLanguageCode = message.replace(/^en(.*)$/, "$1");
      tagFound = messageWithoutLanguageCode;
      resolve(messageWithoutLanguageCode);
      NfcManager.unregisterTagEvent();
    });

    NfcManager.setEventListener(NfcEvents.SessionClosed, () => {
      cleanUp();
      if (!tagFound) {
        reject(new Error("Unregister nfc events, session closed tag not found"));
      }
    });

    NfcManager.registerTagEvent();
  });
}
