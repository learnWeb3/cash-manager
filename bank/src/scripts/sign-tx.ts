import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { sign, createVerify } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

function signTx(data: string, key: string, passphrase: string): string {
    // Sign the data and returned signature in buffer 
    console.log(`Your input data: \n\n`, JSON.parse(data))
    const sampleMessage = JSON.stringify(JSON.parse(data));
    const bufferData = Buffer.from(sampleMessage);
    const signature = sign("SHA256", bufferData, {
        key,
        passphrase
    });
    const base64Signature = signature.toString('base64');
    return base64Signature
}

function verifyTx(data: string, signature: string) {
    const bufferedData = Buffer.from(data);
    const verify = createVerify('SHA256');
    verify.write(bufferedData);
    verify.end();
    const publicKey = readFileSync(join(process.cwd(), 'pk.pub.txt'), { encoding: 'utf-8' })
    const check = verify.verify(publicKey, signature, 'base64');
    return check
}

async function userInputHandler() {
    const rl = readline.createInterface({ input, output });

    const dataToSign = await rl.question('Enter the data to be signed (string input):\n ').then((result) => result.trim());

    const pKPath = await rl.question('Enter your private key path:\n ');

    const pK = readFileSync(join(process.cwd(), pKPath), { encoding: 'utf-8' });

    const pKPassPhrase = await rl.question('Enter your passphrase:\n ').then((result) => result.trim());

    const signature = signTx(dataToSign, pK, pKPassPhrase).trim();

    const check = verifyTx(dataToSign, signature)

    if (check) {
        console.log(`Yourbase64 encoded signature is :\n\n ${signature}`)
        const signatureFilePath = join(process.cwd(), 'sig.txt')
        writeFileSync(signatureFilePath, signature, { encoding: 'utf-8' })
        console.log(`signature file written to ${signatureFilePath}`)
    } else {
        console.log('ERROR verifying input data signature')
    }

    rl.close();
}

userInputHandler()
