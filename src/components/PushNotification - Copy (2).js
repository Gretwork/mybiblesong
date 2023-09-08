import messaging from '@react-native-firebase/messaging';
//import AsyncStorage from '@react-native-async-storage/async-storage';
import {AsyncStorage} from 'react-native';
import { Alert } from 'react-native';


export async function pushMessagePermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (enabled) {
    //console.log('Authorization status is', authStatus);
    getFcmToken()
  }
}

const getFcmToken = async () => {
    let fcmToken = await AsyncStorage.getItem('fcmToken')
    //console.log('The old token', fcmToken)
    if(!fcmToken){
        try {
            const fcmToken = await messaging().getToken();
            if(fcmToken){
                //console.log('New Token', fcmToken);
                await AsyncStorage.setItem('fcmToken', fcmToken)
            }
        }
        catch(error){
            //console.log('messaging error', error)
        }
    }
}


export const pushMessageListener = async () => {
    messaging().onNotificationOpenedApp(remoteMessage => {
        //console.log('notification caused app to open from background state', remoteMessage.notification);
    });
    
    messaging().onMessage( async remoteMessage => {
        //console.log('Received msg in Background 2', remoteMessage)
        // if (remoteMessage?.data?.Quotes) {
        //     navigation.navigate(remoteMessage?.data?.Quotes)
        //console.log('if condition', remoteMessage)
        // };
        
        Alert.alert(remoteMessage.notification.title, remoteMessage.notification.body,
        // JSON.stringify(remoteMessage.notification.title), JSON.stringify(remoteMessage.notification.body),
        
        [
            {text: 'Amen Right', onPress: () => console.log('Amen Pressed')},
        ]
        );

        // Alert.alert('Alert Title', 'My Alert Msg', 
        //[
        //     {
        //       text: 'Ask me later',
        //       onPress: () => console.log('Ask me later pressed'),
        //     },
        //     {
        //       text: 'Cancel',
        //       onPress: () => console.log('Cancel Pressed'),
        //       style: 'cancel',
        //     },
        //     {text: 'OK', onPress: () => console.log('OK Pressed')},
        //   ]
        //);
        //Alert.alert('A new FCM message arrived!','Body - ', JSON.stringify(remoteMessage.notification.body), 
        //'Title - ',JSON.stringify(remoteMessage.notification.body));
        // const payload = {
        //     "notification": {
        //     "title": "title",
        //     "body": "message"
        //     },
        //     "data": {
        //     "screen": "Quotes"
        //     }
        //     }
        
    });

    messaging().getInitialNotification().then(
        remoteMessage => {
            if(remoteMessage){
                //console.log('Notiffication caused app to open from quite state', remoteMessage.notification);
                //setInitialRoute(remoteMessage.data.type)
            }
            //setLoading(false)
        }
    )
}
