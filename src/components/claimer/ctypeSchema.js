/* eslint-disable */
import * as Kilt from "@kiltprotocol/sdk-js"

export function getCtypeSchema() {
    try {
        const ct = Kilt.CType.fromSchema({
            $schema: 'http://kilt-protocol.org/draft-01/ctype#',
            title: 'Event Tickets',
            properties: {
            name: {
                type: 'string'
            },
            age: {
                type: 'integer'
            }
            },
            type: 'object'
        })
        console.log(ct)
        return ct
    } catch (error) {
        console.log(error)
        return error
    }
    
}
// it is the same ctypeSchema as in the attester entity
// console.log(getCtypeSchema())