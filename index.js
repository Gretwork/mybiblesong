/**
 * @format
 */

import {AppRegistry} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import App from './App';
import {name as appName} from './app.json';


//Register Background handler
messaging().setBackgroundMessageHandler ( async remoteMessage => {
    //console.log('Message handel in the background index page', remoteMessage);
})
AppRegistry.registerComponent(appName, () => App);
