module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ["@babel/plugin-proposal-decorators", { "version": "legacy" }], 
    'react-native-reanimated/plugin'
  ]
};
