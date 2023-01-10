import nacl from "tweetnacl";
import util from "tweetnacl-util";
import { writeFileSync } from "node:fs";
import { join } from "node:path";

//@ts-ignore
nacl.util = util;
const { publicKey, secretKey } = nacl.sign.keyPair();
const sampleMessage = JSON.stringify({
  from: 1,
  to: 2,
  amount: 100,
});
//@ts-ignore
const messageUINT8Array = nacl.util.decodeUTF8(sampleMessage);
//@ts-ignore
nacl.util.encodeBase64(nacl.sign(messageUINT8Array, secretKey));

writeFileSync(
  join(process.cwd(), "pk.txt"),
  //@ts-ignore
  nacl.util.encodeBase64(secretKey),
  {
    encoding: "utf-8",
  }
);
writeFileSync(
  join(process.cwd(), "pk.pub.txt"),
  //@ts-ignore
  nacl.util.encodeBase64(publicKey),
  {
    encoding: "utf-8",
  }
);
process.exit(0);
