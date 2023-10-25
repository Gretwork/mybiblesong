import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {useRoute} from '@react-navigation/native';

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


export const pushMessageListener = async (navigation) => {

    //const navigate = useNavigation();

const clickme = () =>{
    navigation.navigate('Songtab');
}

    messaging().onNotificationOpenedApp(remoteMessage => {
        //console.log('notification caused app to open from background state', remoteMessage.notification);
    });
    
    messaging().onMessage( async remoteMessage => {
        //console.log('Received msg in Background 2', remoteMessage)
        // if (remoteMessage?.data?.Quotes) {
        //     navigation.navigate(remoteMessage?.data?.Quotes)
        //console.log('if condition', remoteMessage)
        // };
        //Alert.alert('hhh', JSON.stringify(remoteMessage.notification.body));
        Alert.alert('Alert Title', 'My Alert Msg', [
            {
              text: 'Ask me later',
              //onPress: () => console.log('Ask me later pressed'),
              onPress: () => clickme(), 
            },
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]);
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
