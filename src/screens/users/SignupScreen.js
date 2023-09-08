import React, {useContext, useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Platform, StyleSheet, ScrollView} from 'react-native';
import FormInput from '../../components/FormInput';
import FormButton from '../../components/FormButton';
import SocialButton from '../../components/SocialButton';
import {AuthContext, AuthProvider} from '../../navigation/AuthProvider.android';
import {globalstyles} from '../../styles/GlobalStyles';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { Button, TextInput } from 'react-native-paper';
 



const SignupScreen = ({navigation}) => {
  const [mobile, setMobile] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [confirmOTP, setConfirmOTP] = useState(null);
  const [user, setUser] = useState(null);
  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState(null);
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber) {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
    alert('OTP sent, Please verify')
  }
 
   async function confirmCode() {
     try {
       await confirm.confirm(code);
       alert('OTP verified successfully')
     } catch (error) {
       //console.log('Invalid code.');
     }
   }

   async function logout (){
    auth().signOut().then(
      () => console.log('User signed out!')
      );
      setConfirm(null);
   }
   if (!user){
    return (
      <>
      <Text>Welcome! {user?.phoneNumber}</Text>
      <TextInput placeholder='Add mobile number with country code' value={phoneNumber} onChangeText={text => setPhoneNumber(text)} />
      <Button
       title="Verify your mobile"
       onPress={() => signInWithPhoneNumber(phoneNumber)}
     >Send Verification Code</Button>
 
      {confirm ? (
        <>
        <TextInput placeholder='code 1' value={code} onChangeText={text => setCode(text)} />
        <Button title="Confirm Code" onPress={() => confirmCode()} >
          Verify Code 1
        </Button>
        </>
      ) : 
      null
      }
     </>
    );
   }
  //  if (!code) {
  //    return (
  //      <>
  //      <Text>Welcome! 2 {user?.phoneNumber} {confirm}</Text>
  //      <TextInput placeholder='code 1' value={code} onChangeText={text => setCode(text)} />
  //     <Button title="Confirm Code" onPress={() => confirmCode()} >
  //       Verify Code
  //     </Button>
  //      </>
  //    );
  //  }
 
   return (
     <>
     <Text>Welcome! 3 {user?.phoneNumber}</Text>
     <Button onPress={() => logout()} >Log out</Button>
     </>
   );
}
export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fafd',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 28,
    marginBottom: 10,
    color: '#051d5f',
  },
  navButton: {
    marginTop: 15,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2e64e5',
    fontFamily: 'Lato-Regular',
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 35,
    justifyContent: 'center',
  },
  color_textPrivate: {
    fontSize: 13,
    fontWeight: '400',
    fontFamily: 'Lato-Regular',
    color: 'grey',
  },
});
