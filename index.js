/**
 * @format
 */

import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import App from './app/App';
import { name as appName } from './app.json';
import { enableScreens } from 'react-native-screens';
import './app/globals';

enableScreens();

AppRegistry.registerComponent(appName, () => App);
