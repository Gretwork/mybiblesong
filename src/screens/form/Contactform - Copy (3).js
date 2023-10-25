import React, {useState, useEffect, useNavigate} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import FormInput from '../../components/FormInput';
import FormButton from '../../components/FormButton';
import {globalstyles} from '../../styles/GlobalStyles';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Loader from '../../components/Loader';

const Contactform = ({props, navigation}) => {
  //const navigate = useNavigate();
  const route = useRoute();
  const [loading, setLoading] = useState(false);
  const [Email, setEmail] = useState();
  const [Password, setPassword] = useState('123456');
  const [FullName, setFullName] = useState('');
  const [Fname, setFname] = useState();
  const [Lname, setLname] = useState();
  const [Mobile, setMobile] = useState();
  const [City, setCity] = useState();
  const [State, setState] = useState();
  const [Country, setCountry] = useState();
  const [Message, setMessage] = useState();
  const [errorMessage, setErrorMessage] = useState(null);

  const submitform = async (
    Email,
    Password,
    FullName,
    Fname,
    Lname,
    Mobile,
    City,
    State,
    Country,
    Message,
  ) => {
    try {
      await auth()
        .createUserWithEmailAndPassword(
          Email,
          Password,
          FullName,
          Fname,
          Lname,
          Mobile,
          City,
          State,
          Country,
          Message,
        )
        //alert('Please check your Email for verification link.')
        .then(() => {
          //Once the user creation has happened successfully, we can add the currentUser into firestore
          //with the appropriate details.
          firestore()
            .collection('formcontactreq')
            .doc(auth().currentUser.uid)
            .set({
              FullName:FullName,
              Fname: Fname,
              Lname: Lname,
              Email: Email,
              Mobile: Mobile,
              City: City,
              State: State,
              Country: Country,
              Message: Message,
              createdAt: firestore.Timestamp.fromDate(new Date()),
              userImg: null,
            })

            //ensure we catch any errors at this stage to advise us if something does go wrong
            .catch(error => {
              //console.log('Something went wrong with added user to firestore: ', error);
            });
        })
        //we need to catch the whole sign up process if it fails too.
        .catch(error => {
          //console.log('Something went wrong with sign up: ', error);
        });
    } catch (e) {
      setErrorMessage(e.code);
      //console.log('code 1',e.message);
      //console.log('code 2',e.code);
      //alert(e.code)
      //alert( e.message)
    }
    //await auth().signOut()
    //props.push('/Home')
    setTimeout(() => {
      navigation.navigate('Songtab');
    }, 2000);

    setErrorMessage('Thank you for your email, We will get back to your soon.');
  };

  // Form validation new
  
  // New validation
  const initialValues = {
    FullName: '',
    Fname: '',
    Lname: '',
    Email: '',
    Mobile: '',
    City: '',
    State: '',
    Country: '',
    Message: '',
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = e => {
    const {name, value} = e.target;
    setFormValues({...formValues, [name]: value});
    //console.log('Form value is', formValues)
  };
  //  New validation function
  const handleSubmit = e => {
    //e.preventDefault()
    setFormErrors(validate(formValues));
    //setIsSubmit(true)
    //alert('form checking 11');
  };

  useEffect(() => {
    //console.log(formErrors)
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      //console.log(formValues)
      submitform()
      //alert('form checking');
    }
  }, [formErrors]);

  const validate = values => {
    const FormValErrors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const regexm = /^([+]\d{2})?\d{8,10}$/;
    if (!values.FullName) {
      FormValErrors.FullName = 'Full Name is required!';
    }
    if (!values.CountryCode) {
      FormValErrors.CountryCode = 'Select Country Code';
    }
    if (!values.Mobile) {
      FormValErrors.Mobile = 'Valid Mobile is required!';
    } else if (!regexm.test(values.Mobile)) {
      FormValErrors.Mobile = 'This is not a valid Mobile format!';
    } else if (values.Mobile.length < 8) {
      FormValErrors.Mobile = 'Mobile must be more than 8 characters';
    } else if (values.Mobile.length > 10) {
      FormValErrors.Mobile = 'Mobile cannot exceed more than 10 characters';
    }

    if (!values.Email) {
      FormValErrors.Email = 'Email is required!';
    } else if (!regex.test(values.Email)) {
      FormValErrors.Email = 'This is not a valid email format!';
    }
    if (!values.City) {
      FormValErrors.City = 'City Name is required!';
    }
    if (!values.Message) {
      FormValErrors.Message = 'Message is required!';
    }
    

    if (!values.Password) {
      FormValErrors.Password = 'Password is required!';
    } else if (values.Password.length < 6) {
      FormValErrors.Password = 'Password must be more than 6 characters';
    } else if (values.Password.length > 20) {
      FormValErrors.Password = 'Password cannot exceed more than 20 characters';
    }
    if (values.Password !== values.ConfirmPassword) {
      FormValErrors.ConfirmPassword = 'Please check confirm password ';
    }
    return FormValErrors;
  };

  return (
    //<View style={styles.container}>
    <ScrollView>
      {loading ? <Loader /> : null}
      <View
        style={(globalstyles.BodyMainOutCon, globalstyles.SearchPaddingBottom)}>
        <Text style={styles.text}>Quick Contact Form</Text>
        <View style={(globalstyles.FormRawCon)}>
        <FormInput
          labelValue={FullName}
          onChangeText={FullName => setFullName(FullName)}
          placeholderText="Full Name"
          iconType="user"
          keyboardType=""
          autoCapitalize="none"
          autoCorrect={false}
          type="text"
          id="FullName"
          value={formValues.FullName}
          onChange={handleChange}
        />
        {formErrors.hasOwnProperty('FullName') && <Text style={(globalstyles.FormErrorMessage)}>{formErrors.FullName}</Text> }
        </View>
        <FormInput
          labelValue={Email}
          onChangeText={userEmail => setEmail(userEmail)}
          placeholderText="Email"
          iconType="user"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          type="email"
          id="Email"
          value={formValues.FullName}
          onChange={handleChange}
        />
        {formErrors.hasOwnProperty('Email') && <Text style={(globalstyles.FormErrorMessage)}>{formErrors.Email}</Text> }
        <FormInput
          labelValue={Mobile}
          onChangeText={userMobile => setMobile(userMobile)}
          placeholderText="Mobile"
          iconType="user"
          keyboardType="number"
          autoCapitalize="none"
          autoCorrect={false}

          type="phone"
          id="Mobile"
          value={formValues.Mobile}
          onChange={handleChange}
        />
        {formErrors.hasOwnProperty('Mobile') && <Text style={(globalstyles.FormErrorMessage)}>{formErrors.Mobile}</Text> }
        <FormInput
          labelValue={City}
          onChangeText={userCity => setCity(userCity)}
          placeholderText="City"
          iconType="user"
          keyboardType=""
          autoCapitalize="none"
          autoCorrect={false}
        />
        <FormInput
          labelValue={State}
          onChangeText={userState => setState(userState)}
          placeholderText="State"
          iconType="user"
          keyboardType=""
          autoCapitalize="none"
          autoCorrect={false}
        />
        <FormInput
          labelValue={Country}
          onChangeText={userCountry => setCountry(userCountry)}
          placeholderText="Country"
          iconType="user"
          keyboardType=""
          autoCapitalize="none"
          autoCorrect={false}
        />
        <View style={{height: 0}}>
          <FormInput
            labelValue="123456"
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
            //value={Message}
            style={styles.inputBig}
            onChangeText={userMessage => setMessage(userMessage)}
            //style={{ height:200, textAlignVertical: 'top',}}
            numberOfLines={50}
            multiline={true}
            placeholder="Message"
            placeholderTextColor="#666"
            iconType="user"
            keyboardType=""
            autoCapitalize="none"
            autoCorrect={false}

            //type="phone"
          id="Message"
          value={formValues.Message}
          onChange={handleChange}
          />
        </View>
        {formErrors.hasOwnProperty('Message') && <Text style={(globalstyles.FormErrorMessage)}>{formErrors.Message}</Text> }
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
          //onPress={() => submitform(Email, Password, Fname, FullName,Lname,Mobile,City,State,Country,Message)}
          //onPress={() => alert('Clicked')}
          onPress={() => handleSubmit()}
        />
        <View style={globalstyles.Divider2}></View>
        <Text>{errorMessage}</Text>
      </View>
    </ScrollView>
  );
};

export default Contactform;

const styles = StyleSheet.create({
  inputContainerBig: {
    display: 'flex',
    marginTop: 5,
    marginBottom: 10,
    width: '100%',
    height: 100,
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
    height: 200,
    fontSize: 16,
    fontFamily: 'Lato-Regular',
    color: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    textAlignVertical: 'top',
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
