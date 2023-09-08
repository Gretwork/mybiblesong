import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { Linking } from 'react-native';


export async function pushMessagePermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (enabled) {
    console.log('Authorization status is', authStatus);
    getFcmToken()
  }
}

const getFcmToken = async () => {
    let fcmToken = await AsyncStorage.getItem('fcmToken')
    console.log('The old token', fcmToken)
    if(!fcmToken){
        try {
            const fcmToken = await messaging().getToken();
            if(fcmToken){
                console.log('New Token', fcmToken);
                await AsyncStorage.setItem('fcmToken', fcmToken)
            }
        }
        catch(error){
            console.log('messaging error', error)
        }
    }
}


export const pushMessageListener = async (fcmToken) => {
    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log('notification caused app to open from background state', remoteMessage.notification);
        const titletext = remoteMessage.notification.title;
        const bodytext = remoteMessage.notification.body;
        const pageurl = `mybiblesong://app/Today/${bodytext}`;
        const demolink = pageurl;
        Linking.openURL(pageurl)
    });
    
    messaging().onMessage( async remoteMessage => {
        console.log('Received msg in Background 2', remoteMessage)
        console.log('Message token', fcmToken)
        
        const titletext = remoteMessage.notification.title;
        const bodytext = remoteMessage.notification.body;
        const pageurl = `mybiblesong://app/Today/${bodytext}`;
        const demolink = pageurl;
        Linking.openURL(pageurl)
        
        
    });

    messaging().getInitialNotification().then(
        remoteMessage => {
            if(remoteMessage){
                console.log('Notiffication caused app to open from quite state', remoteMessage.notification);
                setInitialRoute(remoteMessage.data.type)
                const titletext = remoteMessage.notification.title;
        const bodytext = remoteMessage.notification.body;
        const pageurl = `mybiblesong://app/Today/${bodytext}`;
        const demolink = pageurl;
        Linking.openURL(pageurl)
            }
            //setLoading(false)
        }
    )
}
