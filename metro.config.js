// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('@expo/metro-config');
const config = getDefaultConfig(__dirname)
config.resolver.extraNodeModules = {
    // crypto: require.resolve("expo-crypto"),
    stream: require.resolve("stream-browserify"),
    events: require.resolve("events")
}
config.resolver.sourceExts.push("cjs")
module.exports = config;
