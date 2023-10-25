import React, {  useState} from 'react';
import {View, Text,  TextInput, TouchableOpacity,  Platform, StyleSheet, ScrollView} from 'react-native';
import {useRoute} from '@react-navigation/native';
import FormInput from '../../components/FormInput';
import FormButton from '../../components/FormButton';
import SocialButton from '../../components/SocialButton';
import {AuthContext, AuthProvider} from '../../navigation/AuthProvider.android';
import {globalstyles} from '../../styles/GlobalStyles';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { Button } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Loader from '../../components/Loader';


const Testimonialsform = ({props, navigation}) => {
  //const navigate = useNavigate();
  const route = useRoute();
  const [loading, setLoading] = useState(false)
  
  const [email, setEmail] = useState();
  const [password, setPassword] = useState('123456');
  const [fname, setFname] = useState();
  const [lname, setLname] = useState();
  const [phone, setPhone] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [country, setCountry] = useState();
  const [testimonialmsg, setTestimonialmsg] = useState();
  const [errorMessage, setErrorMessage] = useState(null);
   
  const register = async (email, password, fname,lname,phone,city,state,country,testimonialmsg) => {
    try {
      await auth().createUserWithEmailAndPassword(email, password, fname,lname,phone,city,state,country,testimonialmsg)
      //alert('Please check your Email for verification link.')
      .then(() => {
        //Once the user creation has happened successfully, we can add the currentUser into firestore
        //with the appropriate details.
        firestore().collection('testimonialsreq').doc(auth().currentUser.uid)
        .set({
            fname: fname,
            lname: lname,
            email: email,
            phone: phone,
            city: city,
            state:state,
            country:country,
            testimonialmsg:testimonialmsg,
            createdAt: firestore.Timestamp.fromDate(new Date()),
            userImg: null,
        })
        
        //ensure we catch any errors at this stage to advise us if something does go wrong
        .catch(error => {
           // console.log('Something went wrong with added user to firestore: ', error);
        })
        
      })
      //we need to catch the whole sign up process if it fails too.
      .catch(error => {
          //console.log('Something went wrong with sign up: ', error);
      });
       
    } catch (e) {
      setErrorMessage (e.code)
      //console.log('code 1',e.message);
      //console.log('code 2',e.code);
      //alert(e.code)
      //alert( e.message)
    }
    //await auth().signOut()
    //props.push('/Songtab')
    setTimeout(() => {
      navigation.navigate('Songtab')
     }, 2000)
    
    setErrorMessage ('Thank you for your email, We will get back to your soon.')
  }


  return (
    //<View style={styles.container}>
    <ScrollView >
      <View
      style={(globalstyles.BodyMainOutCon, globalstyles.SearchPaddingBottom)}>
      <Text style={styles.text}>Send Your Testimony</Text>
      <Text>{errorMessage}</Text>
      <FormInput
        labelValue={fname}
        onChangeText={(userFname) => setFname(userFname)}
        placeholderText="First Name"
        iconType="user"
        keyboardType=""
        autoCapitalize="none"
        autoCorrect={false}
      />
      <FormInput
        labelValue={lname}
        onChangeText={(userLname) => setLname(userLname)}
        placeholderText="Last Name"
        iconType="user"
        keyboardType=""
        autoCapitalize="none"
        autoCorrect={false}
      />
      <FormInput
        labelValue={email}
        onChangeText={(userEmail) => setEmail(userEmail)}
        placeholderText="Email"
        iconType="user"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <FormInput
        labelValue={phone}
        onChangeText={(userPhone) => setPhone(userPhone)}
        placeholderText="Phone"
        iconType="user"
        keyboardType="number"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <FormInput
        labelValue={city}
        onChangeText={(userCity) => setCity(userCity)}
        placeholderText="City"
        iconType="user"
        keyboardType=""
        autoCapitalize="none"
        autoCorrect={false}
      />
      <FormInput
        labelValue={state}
        onChangeText={(userState) => setState(userState)}
        placeholderText="State"
        iconType="user"
        keyboardType=""
        autoCapitalize="none"
        autoCorrect={false}
      />
      <FormInput
        labelValue={country}
        onChangeText={(userCountry) => setCountry(userCountry)}
        placeholderText="Country"
        iconType="user"
        keyboardType=""
        autoCapitalize="none"
        autoCorrect={false}
      />
      <View style={{height:0}}>
      <FormInput
        labelValue='123456'
        //onChangeText={(userPassword) => setPassword(userPassword)}
        placeholderText="Password"
        iconType="user"
        secureTextEntry={false}
      />
      </View>
      <View style={styles.inputContainerBig}>
      {/* <View style={styles.iconStyle}>
        <AntDesign name='user' size={25} color="#666" />
      </View> */}
      <TextInput
        value={testimonialmsg}
        style={styles.inputBig}
        onChangeText={(userTestimonial) => setTestimonialmsg(userTestimonial)}
        //style={{ height:200, textAlignVertical: 'top',}}
        numberOfLines={50}
        multiline={true}
        placeholder='Testimony'
        placeholderTextColor="#666"
        iconType="user"
        keyboardType=""
        autoCapitalize="none"
        autoCorrect={false}
      />
    </View>
     
 {/* 
      <FormInput
        labelValue={confirmPassword}
        onChangeText={(userPassword) => setConfirmPassword(userPassword)}
        placeholderText="Confirm Password"
        iconType="lock"
        secureTextEntry={true}
      /> */}

      <FormButton
        buttonTitle="Submit"
        onPress={() => register(email, password, fname,lname,phone,city,state,country,testimonialmsg)}
        //onPress={() => alert('Clicked')}
     />
      <View style={(globalstyles.Divider2)}></View>
      <Text>{errorMessage}</Text>
    </View>
    </ScrollView>
  );
};

export default Testimonialsform;

const styles = StyleSheet.create({
  inputContainerBig: {
    display:'flex',
    marginTop: 5,
    marginBottom: 10,
    width: '100%',
    height:100,
    borderColor: '#ccc',
    borderRadius: 3,
    borderWidth: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
  },
  inputBig: {
    padding: 10,
    flex: 1,
    height:200,
    fontSize: 16,
    fontFamily: 'Lato-Regular',
    color: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    textAlignVertical:'top',
  },
  container: {
    backgroundColor: '#f9fafd',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontFamily: 'Roboto',
    fontSize: 22,
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
