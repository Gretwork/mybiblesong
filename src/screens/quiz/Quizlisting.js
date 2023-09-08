import React, { Component, useEffect, useContext, useState} from 'react';
import {  View,  Text, ScrollView } from 'react-native';
import {globalstyles} from '../../styles/GlobalStyles';
import { WebView } from 'react-native-webview';
import {BtnBackToHome, BtnComingSoon} from '../../components/MediaExport'

function Quizlisting({props, navigation, buttonTitle, ...rest}) {
  const [loading, setLoading] = useState(false)
  //const [errors, setErrors] = useState(null);
  const loadingTime = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
     },3000)
  }
  useEffect(() =>{
    loadingTime()
  },[])

  return (
    <>
     <ScrollView>
      <View style={globalstyles.BodyMainOutCon}>
      <Text style={globalstyles.PageTitle1}>Bible Quiz in Different Languages</Text>
      <WebView 
      javaScriptEnabled={true}
      domStorageEnabled={true}
      source={{ uri: 'https://www.mybiblesong.com/bible-quiz' }} style={globalstyles.WebviewFullHeightQuiz}
      />

      
        <View style={globalstyles.Divider5}></View>
        
      </View>

    </ScrollView>
    <View style={globalstyles.Divider2}></View>
    </>
  );
}

export default Quizlisting;
// ... other code from the previous section

