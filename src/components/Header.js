import { Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import React, { Component } from 'react';
import {Logourlone} from '../components/MediaExport';
import {globalstyles} from '../styles/GlobalStyles';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import Icons from 'react-native-vector-icons/Ionicons';


//export class Header extends Component {
  function Header  (props)  {
  //render() {
    const navigation = useNavigation();
    return (
      <>
      <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Appinfo')
                  }>
<View style={globalstyles.HeaderConMain}>
        
        <Text style={globalstyles.LogoTextHeaderLeft}>My Bible Song</Text>
        <Logourlone /> 
      </View>
                  </TouchableOpacity>
      </>
      
    );
  }
//}

export default Header