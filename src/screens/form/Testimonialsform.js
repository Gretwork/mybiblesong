import React, {useState, useEffect, useNavigate} from 'react';
import {View, Text, TextInput, StyleSheet, ScrollView, Keyboard,TouchableOpacity, Button, Alert, } from 'react-native';
import {useRoute} from '@react-navigation/native';
import {globalstyles} from '../../styles/GlobalStyles';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';



const Testimonialsform = ({props, navigation, buttonTitle, ...rest}) => {
 
   // State variables to store form inputs,  
  // errors, and form validity 
    //const [Email, setEmail] = useState(''); 
    const [errors, setErrors] = useState(''); 
    const [isFormValid, setIsFormValid] = useState(false); 
  
    
  //const navigate = useNavigate();
  const route = useRoute();
  const [loading, setLoading] = useState(false);
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('123456');
  const [FullName, setFullName] = useState('');
  const [Mobile, setMobile] = useState();
  const [City, setCity] = useState();
  const [State, setState] = useState();
  const [Country, setCountry] = useState();
  const [Message, setMessage] = useState();
  const [errorMessage, setErrorMessage] = useState(null);
  const [errortext, setErrortext] = useState("");
  const [Successtext, setSuccesstext] = useState("");
  
  const formSubmitFunction = () => {
    setErrortext("");
    //if (!FullName) return alert("Please fill Name");
    //if (!Email) return alert("Please fill Email");

    auth()
      .createUserWithEmailAndPassword(
          Email,
          Password,
          FullName,
          Mobile,
          City,
          State,
          Country,
          Message,
      )
      .then(() => {
        firestore()
            .collection('formtestimonial')
            .doc(auth().currentUser.uid)
            .set({
              FullName:FullName,
              Email: Email,
              Mobile: Mobile,
              City: City,
              State: State,
              Country: Country,
              Message: Message,
              Password:Password,
              createdAt: firestore.Timestamp.fromDate(new Date()),
              userImg: null,
            })
        //console.log("Registration Successful. Please Login to proceed");
        setErrortext(null);
        setSuccesstext("Thank you for your email, We will get back to your soon.");
        setTimeout(() => { navigation.navigate('Shop'); }, 2000);
      })
      .catch((error) => {
        //console.log(error);
        if (error.code === "auth/email-already-in-use") {
          setSuccesstext(null)
          setErrortext("That email address is already in use!");

        } else {
          setErrortext(error.message);
        }
      });
  };

    useEffect(() => { 
        // Trigger form validation when FullName,  
        // Email, or Password changes 
        validateForm(); 
    }, [FullName, Email, Mobile, City, State, Country, Message, Password]); 
  
    const validateForm = () => { 
        let errors = {}; 
        if (!FullName) { 
          errors.FullName = 'Full Name is required.'; 
        } else if (FullName.length < 4) { 
            errors.FullName = 'Full Name required.'; 
        }
        // Validate Email field 
        if (!Email) { 
            errors.Email = 'Email is required.'; 
        } else if (!/\S+@\S+\.\S+/.test(Email)) { 
            errors.Email = 'Email is invalid.'; 
        } 
        if (!Mobile) { 
          errors.Mobile = 'Mobile is required.'; 
      } else if (!/^([+]\d{2})?\d{7,15}$/.test(Mobile)) { 
          errors.Mobile = 'Mobile is invalid.'; 
      } 
        if (!City) { 
          errors.City = 'City is required.'; 
        } 
        if (!State) { 
          errors.State = 'State/Province is required.'; 
        } 
        if (!Country) { 
          errors.Country = 'Country is required.'; 
        } 
        if (!Message) { 
          errors.Password = 'Message is required.'; 
        } else if (Message.length < 20) { 
            errors.Message = 'Message required minimum length of 20 words.'; 
        }
      
        // Set the errors and update form validity 
        setErrors(errors); 
        setIsFormValid(Object.keys(errors).length === 0); 
    }; 
  
    const handleSubmit = () => { 
        if (isFormValid) { 
            // Form is valid, perform the submission logic 
            formSubmitFunction();
            //Alert.alert("Form submitted successfully!");
            //console.log('Form submitted successfully!'); 
        } else { 
            // Form is invalid, display error messages 
            //console.log('Form has errors. Please correct them.'); 
        } 
    }; 


  return (
    <>
     <ScrollView>
      <View style={globalstyles.BodyMainOutCon}>
      <Text style={styles.text}>We are happy to hear from you.</Text>
      <View style={styles.container}> 
			<TextInput 
				style={styles.input} 
				placeholder="Full Name"
				value={FullName} 
				onChangeText={setFullName} 
			/> 
			<TextInput 
				style={styles.input} 
				placeholder="Email"
				value={Email} 
				onChangeText={setEmail} 
        keyboardType='email-address'
			/> 
      <TextInput 
				style={styles.input} 
				placeholder="Mobile"
				value={Mobile} 
				onChangeText={setMobile} 
        keyboardType='phone-pad'
			/>
      <TextInput 
				style={styles.input} 
				placeholder="City"
				value={City} 
				onChangeText={setCity} 
			/> 
      <TextInput 
				style={styles.input} 
				placeholder="State/province"
				value={State} 
				onChangeText={setState} 
			/>
      <TextInput 
				style={styles.input} 
				placeholder="Country"
				value={Country} 
				onChangeText={setCountry} 
			/>  
      <TextInput 
				style={styles.inputbig} 
				placeholder="Message"
				value={Message} 
				onChangeText={setMessage} 
        multiline={true}
			/>  
      <View style={{height: 0, opacity:0}}>
			<TextInput 
				style={styles.input} 
				placeholder="Password"
        labelValue="123456" 
				value={Password} 
				onChangeText={setPassword} 
				secureTextEntry={false} 
			/>
      </View>
      {/* Display error messages */} 
			{Object.values(errors).map((error, index) => ( 
				<Text key={index} style={styles.error}> 
					{error} 
				</Text> 
			))}
      {errortext ? <Text style={styles.error}>{errortext}</Text> : null }
      {Successtext?  <Text style={styles.success}>{Successtext}</Text> : null }
			<TouchableOpacity 
				style={[styles.button, { opacity: isFormValid ? 1 : 0.5 }]} 
				disabled={!isFormValid} 
				onPress={handleSubmit} 
			>
			<Text style={styles.buttonText}>Submit</Text> 
			</TouchableOpacity> 
			
		</View> 
      <View style={globalstyles.Divider5}></View>  
      </View>
    </ScrollView>
    <View style={globalstyles.Divider2}></View>
    </>
  );
};

export default Testimonialsform;

// Styles for the components 
const styles = StyleSheet.create({ 
	container: { 
		flex: 1, 
		padding: 16, 
		justifyContent: 'center', 
	}, 
  text: {
    fontFamily: 'Roboto',
    fontSize: 22,
    marginTop:20,
    marginBottom:10,
    marginLeft:20,
    color: '#051d5f',
  },
	input: { 
		height:45, 
		borderColor: '#ccc', 
		borderWidth: 1, 
		marginBottom: 12, 
		paddingHorizontal: 10, 
		borderRadius: 8, 
		fontSize: 14, 
	}, 
  inputbig: { 
		height: 100, 
		borderColor: '#ccc', 
		borderWidth: 1, 
		marginBottom: 12, 
		paddingHorizontal: 10, 
		borderRadius: 8, 
		fontSize: 16, 
    textAlignVertical:'top',
	}, 
	button: { 
		backgroundColor: 'green', 
		borderRadius: 8, 
		paddingVertical: 10, 
		alignItems: 'center', 
		marginTop: 16, 
		marginBottom: 12, 
	}, 
	buttonText: { 
		color: '#fff', 
		fontWeight: 'bold', 
		fontSize: 16, 
	}, 
	error: { 
		color: 'red', 
		fontSize:10, 
		marginBottom:5, 
	}, 
  success:{
    color:'green',
    fontSize:10,
  }
}); 
