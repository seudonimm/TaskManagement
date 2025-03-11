import './gesture-handler';

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import { Provider } from 'react-redux';
import {store, persistor} from './src/store/Store';
import AppNavigation from './src/navigation';
import { PersistGate } from 'redux-persist/integration/react';
import { CalendarProvider } from 'react-native-calendars';



function App(): React.JSX.Element {
  let date = new Date();
  return (
    <CalendarProvider
    date={date.toDateString()}>

      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <AppNavigation/>
        </PersistGate>
      </Provider>
      </CalendarProvider>

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
