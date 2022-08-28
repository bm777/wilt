import * as Kilt from "@kiltprotocol/sdk-js"

import { createClaim } from "./createClaim.js"
import { generateKeypairs } from "./generateKeypairs.js"
import { getCtypeSchema } from "./ctypeSchema.js"

import env from "../../env.json" assert {type: "json"}

async function requestFromClaim(lightDid, keystore, claim) {
    const request = Kilt.RequestForAttestation.fromClaim(claim)
    await request.signWithDidKey(
        keystore,
        lightDid,
        lightDid.authenticationKey.id,
    )

    return request
}

export async function generateRequest(claimAttributes, claimer_mnemonic){
    await Kilt.init({address: env.WSS_ADDRESS})

    const keystore = new Kilt.Did.DemoKeystore()
    const keys = await generateKeypairs(keystore, claimer_mnemonic)

    // lightDid in live again
    const lightDid = Kilt.Did.LightDidDetails.fromDetails({
        ...keys,
        authenticationKey: {
            publicKey: keys.authenticationKey.publicKey,
            type: Kilt.VerificationKeyType.Sr25519
        }
    })

    // claim creation
    const ctype = getCtypeSchema()
    const claim = createClaim(lightDid, ctype, claimAttributes)

    // create request
    console.log("claimer -> create request")
    return await requestFromClaim(lightDid, keystore, claim)
}


import { generateLightDid } from "./generateLightDid.js"
const claimer = await generateLightDid()
generateRequest({
    age: 22,
    name: "bm777"
}, claimer.mnemonic)
    .catch((e) => {
        console.log("Error while building request for attestation", e)
        process.exit(1)
    })
    .then((req) => {
        console.log(JSON.stringify(req, null, 2))
        process.exit()
    })