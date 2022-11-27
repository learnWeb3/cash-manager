import { createVerify, generateKeyPair, sign, verify } from 'node:crypto';
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

generateKeyPair('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
    },
    privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
        cipher: 'aes-256-cbc',
        passphrase: 'test'
    }
}, (err, publicKey, privateKey) => {
    console.log('Testing key pair with a sample message\n\n')

    const smapleMessage = JSON.stringify({
        from: 1,
        to: 2,
        amount: 100
    });
    // Convert string to buffer 
    const data = Buffer.from(smapleMessage);

    // Sign the data and returned signature in buffer 
    const signature = sign("SHA256", data, {
        key: privateKey,
        passphrase: 'test'
    });

    // Convert returned buffer to base64
    const base64Signature = signature.toString('base64');


    const verify = createVerify('SHA256');
    verify.write(data);
    verify.end();
    const check = verify.verify(publicKey, base64Signature, 'base64');

    console.log(`Signature check using a sample message output ${check}\n\n`)
    console.log(`Signature:\n\n ${base64Signature}`);
    console.log(`Sample message: ${JSON.stringify(smapleMessage, null, 4)}\n\n`)
    console.log(`Please find your public/private key pair below:\n\n`)
    console.log(`Public key is:\n\n ${publicKey}`)
    console.log(`Private key is:\n\n ${privateKey}`)

    writeFileSync(join(process.cwd(), 'pk.txt'), privateKey, { encoding: 'utf-8' });
    writeFileSync(join(process.cwd(), 'pk.pub.txt'), publicKey, { encoding: 'utf-8' })
    process.exit(0);
});