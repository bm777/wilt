/* eslint-disable */
import * as Kilt from "@kiltprotocol/sdk-js"
import { mnemonicGenerate } from "@polkadot/util-crypto"

import { generateKeypairs } from "./generateKeypairs.js"

import env from "./env.json"

export async function generateLightDid(){
    await Kilt.init({address: env.WSS_ADDRESS})

    // secret and DID publick keys
    const keystore = new Kilt.Did.DemoKeystore()
    const mnem = mnemonicGenerate()
    const keys = await generateKeypairs(keystore, mnem)

    // the lightDID
    const lightDid = Kilt.Did.LightDidDetails.fromDetails({
        ...keys,
        authenticationKey: {
            publicKey: keys.authenticationKey.publicKey,
            type: Kilt.VerificationKeyType.Sr25519
        }
    })
    return {
        lightDid: lightDid,
        mnem: mnem

    }
}

    // generateLightDid()
    //     .catch((e) => {
    //         console.log("Error while setting up claimer DID", e)
    //         process.exit(1)
    //     })
    //     .then(({lightDid, mnemonic}) => {
    //         console.log("Claimer_mnemonic=", mnemonic)
    //         console.log("claimer_did_uri=", lightDid.uri)
    //     })