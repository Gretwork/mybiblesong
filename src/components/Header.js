import { Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import React, { Component } from 'react';
import {Logourlone} from '../components/MediaExport';
import {globalstyles} from '../styles/GlobalStyles';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import Icons from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';



//export class Header extends Component {
  function Header  (props)  {
    const insets = useSafeAreaInsets();
  //render() {
    const navigation = useNavigation();
    return (
      <View style={{ paddingTop: insets.top, }} >
      <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Appinfo')
                  }>
<View style={globalstyles.HeaderConMain}>
        
        <Text style={globalstyles.LogoTextHeaderLeft}>My Bible Song</Text>
        <Logourlone /> 
      </View>
                  </TouchableOpacity>
      </View>
      
    );
  }
//}

export default Header