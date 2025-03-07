
/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import notifee from '@notifee/react-native';

import { Platform } from 'react-native'

// notifee.onBackgroundEvent(async({type, detail})) => {

// }


AppRegistry.registerComponent(appName, () => App);
