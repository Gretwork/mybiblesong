import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Header from './src/components/Header';
import SongDetail from './src/screens/songs/SongDetail';
import NavBottomTab from './src/navigation/NavBottomTab';
import SignupScreen from './src/screens/users/SignupScreen';
import Quoteslisting from './src/screens/quotes/Quoteslisting';
import Testimoniallisting from './src/screens/testimonials/Testimoniallisting';
import Sociallisting from './src/screens/social/Sociallisting';
import Prayerlisting from './src/screens/prayer/Prayerlisting';
import Quizlisting from './src/screens/quiz/Quizlisting';
import Songs from './src/screens/songs/Songs';
import LoginWithPhoneScreen from './src/screens/users/LoginWithPhoneScreen';
import EditProfileScreen from './src/screens/users/EditProfileScreen';
import Homescreen from './src/screens/Homescreen';
import Contactform from './src/screens/form/Contactform';
import Testimonialsform from './src/screens/form/Testimonialsform'
import Prayerform from './src/screens/form/Prayerform'
import { pushMessagePermission, pushMessageListener } from './src/components/PushNotification';
import Vanchanlisting from './src/screens/vanchan/Vanchanlisting';
import Socialdownload from './src/screens/social/Socialdownload';
import Festivaldownload from './src/screens/festival/Festivaldownload';
import linking from './src/components/Linking';
import NotificatioonScreen from './src/screens/users/NotificatioonScreen';
import VideoPlayer from './src/screens/music/VideoPlayer';
import Quotesdownload from './src/screens/quotes/Quotesdownload';
import Quotesslider from './src/screens/quotes/Quotesslider';
import AppInfoScreen from './src/screens/users/AppInfoScreen';

export default function App() {
  useEffect(()=>{
    //Alert.alert('APp screen')
    pushMessagePermission();
    pushMessageListener();
  },[]);
  const Stack = createStackNavigator();
  return (
    <NavigationContainer options={{headerTitleAlign:'center'}}  linking={linking}>
      <Stack.Navigator>
        <Stack.Screen
          name="Back"
          component={NavBottomTab}
          options={{headerShown: false}}
        />
        
        <Stack.Screen name="Home" component={Homescreen} options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen name="Songs" component={Songs}></Stack.Screen>
        <Stack.Screen name="Appinfo" component={AppInfoScreen} options={{headerTitleAlign:'center',headerTitle :'Inside My Bible Song App'}}></Stack.Screen>
        <Stack.Screen name="Vanchan" component={Vanchanlisting} options={{headerTitleAlign:'center'}}></Stack.Screen>
        <Stack.Screen name="Details" component={SongDetail} options={{headerTitleAlign:'center',headerTitle :'My Bible Song'}}></Stack.Screen>
        <Stack.Screen name="Socialdownload" component={Socialdownload} options={{headerTitleAlign:'center',headerTitle :'My Bible Song'}}></Stack.Screen>
        <Stack.Screen name="Festivaldownload" component={Festivaldownload} options={{headerTitleAlign:'center',headerTitle :'My Bible Song'}}></Stack.Screen>
        <Stack.Screen name="Quotesdownload" component={Quotesdownload} options={{headerTitleAlign:'center',headerTitle :'My Bible Song'}}></Stack.Screen>
        <Stack.Screen name="Quotesslider" component={Quotesslider} options={{headerTitleAlign:'center',headerTitle :'My Bible Song'}}></Stack.Screen>
        
        <Stack.Screen name="Login"  component={LoginWithPhoneScreen}  options={{headerTitleAlign:'center'}}></Stack.Screen>
        <Stack.Screen name="Signup" component={SignupScreen}  options={{headerTitleAlign:'center'}}></Stack.Screen>
        <Stack.Screen name="Quiz" component={Quizlisting}  options={{headerTitleAlign:'center', headerTitle :'Bible Quiz'}}></Stack.Screen>
        <Stack.Screen name="Prayer" component={Prayerlisting}  options={{headerTitleAlign:'center'}}></Stack.Screen>
        <Stack.Screen name="Quotes" component={Sociallisting}  options={{headerTitleAlign:'center',headerTitle :'My Bible Song'}}></Stack.Screen>
        <Stack.Screen name="Testimonials" component={Testimoniallisting}  options={{headerTitleAlign:'center',headerTitle :'My Bible Song'}}></Stack.Screen>
        <Stack.Screen name="Verses" component={Quoteslisting}  options={{headerTitleAlign:'center',headerTitle :'Bible Verses'}}></Stack.Screen>
        <Stack.Screen name="Contact" component={Contactform}  options={{headerTitleAlign:'center',headerTitle :'My Bible Song'}}></Stack.Screen>
        <Stack.Screen name="TestimonyForm" component={Testimonialsform}  options={{headerTitleAlign:'center',headerTitle :'My Bible Song'}}></Stack.Screen>
        <Stack.Screen name="PrayerForm" component={Prayerform}  options={{headerTitleAlign:'center',headerTitle :'My Bible Song'}}></Stack.Screen>
        <Stack.Screen name="EditProfile" component={EditProfileScreen}  options={{headerTitleAlign:'center',headerTitle :'Edit Profile'}}></Stack.Screen>
        <Stack.Screen name="VideoPlayer" component={VideoPlayer}  options={{headerTitleAlign:'center', headerTitle :'My Bible Song'}}></Stack.Screen>
        <Stack.Screen name="Today" component={NotificatioonScreen} options={{headerTitleAlign:'center'}}/>
        
        </Stack.Navigator>
        
    </NavigationContainer>
  );
}

//export default App;
