import './gesture-handler';

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Login from './src/screens/Login';
import { Provider } from 'react-redux';
import store from './src/store/Store';
import CreateAccount from './src/screens/CreateAccount';
import AppNavigation from './src/navigation';
import LinearGradient from 'react-native-linear-gradient';
import { BLACK, PURPLE } from './src/res/colors';



function App(): React.JSX.Element {

  return (
    <LinearGradient style={{flex:1}}
        colors={[PURPLE, BLACK, BLACK]}
        locations={[0, .1, 1]}
        start={{x: 0.0, y: 0}} end={{x: 0.5, y: 1.0}}
    >

      <Provider store={store}>
        <AppNavigation/>
      </Provider>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
