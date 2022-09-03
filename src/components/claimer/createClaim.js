import * as Kilt from "@kiltprotocol/sdk-js"

export function createClaim(lightDid, ctype, content){
    const claim = Kilt.Claim.fromCTypeAndClaimContents(
        ctype,
        content,
        lightDid.uri
    )

    return claim
}