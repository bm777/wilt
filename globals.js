// polyfill for TextDecoder

require('text-encoding-polyfill')


global.Buffer = require('buffer').Buffer
global.process = require('process')

// Needed so that 'stream-http' chooses the right default protocol.
global.location = {
  protocol: 'file:',
}
// fixes issue with json-schema
delete self.location


const { polyfillWebCrypto } = require('expo-standard-web-crypto')
polyfillWebCrypto()

require('react-native-url-polyfill/auto');

console.log(global.REACT_NATIVE_URL_POLYFILL)

// // Some modules expect userAgent to be a string
// global.navigator.userAgent = 'React Native'

const { encode, decode } = require('base-64')

global.atob = decode
global.btoa = encode

// fixes an issue with @substrate/connect
window.addEventListener = () => {}

// // fixes issue with json-schema
// self.location.origin = ''


// const { polyfillWebCrypto } = require('expo-standard-web-crypto')


// polyfillWebCrypto()

// console.log(global.REACT_NATIVE_URL_POLYFILL)