import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { readFileSync, writeFileSync } from "node:fs";
import nacl from "tweetnacl";
import util from "tweetnacl-util";
import { join } from "node:path";

//@ts-ignore
nacl.util = util;

function signTx(data: string, base64SecretKey: string): string {
  //@ts-ignore
  const keyUINT8Array = nacl.util.decodeBase64(base64SecretKey);
  //@ts-ignore
  const messageUINT8Array = nacl.util.decodeUTF8(data);
  //@ts-ignore
  return nacl.util.encodeBase64(
    nacl.sign.detached(messageUINT8Array, keyUINT8Array)
  );
}

function verifyTx(
  data: string,
  base64Signature: string,
  base64PublicKey: string
) {
  //@ts-ignore
  const message = nacl.util.decodeUTF8(data);
  //@ts-ignore
  const publicKey = nacl.util.decodeBase64(base64PublicKey);
  //@ts-ignore
  const signature = nacl.util.decodeBase64(base64Signature);
  return nacl.sign.detached.verify(message, signature, publicKey);
}

async function userInputHandler() {
  const rl = readline.createInterface({ input, output });

  const dataToSign = await rl
    .question("Enter the data to be signed (string input):\n ")
    .then((result) => result.trim());

  const pKPath = await rl.question("Enter your private key path:\n ");

  const pK = readFileSync(join(process.cwd(), pKPath), { encoding: "utf-8" });

  const pubKeyPath = await rl.question("Enter your private key path:\n ");

  const pubKey = readFileSync(join(process.cwd(), pubKeyPath), {
    encoding: "utf-8",
  });

  const signature = signTx(dataToSign, pK);

  const check = verifyTx(dataToSign, signature, pubKey);

  if (check) {
    console.log(`Yourbase64 encoded signature is :\n\n ${signature}`);
    const signatureFilePath = join(process.cwd(), "sig.txt");
    writeFileSync(signatureFilePath, signature, { encoding: "utf-8" });
    console.log(`signature file written to ${signatureFilePath}`);
  } else {
    console.log("ERROR verifying input data signature");
  }

  rl.close();
}

userInputHandler();
