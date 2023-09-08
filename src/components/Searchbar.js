import {Text, View, TextInput} from 'react-native';
import React, { Component } from 'react'
import {globalstyles} from '../styles/GlobalStyles';
import Icons from 'react-native-vector-icons/Ionicons';
export class Searchbar extends Component {
  render() {
    return (
      <View style={globalstyles.DetailSearchCon}>
        <TextInput
          style={[globalstyles.DetailSearchConField, globalstyles.TextLeft]}
          placeholder="Search..."
        />
        <Icons
          name="ios-search"
          size={26}
          style={[globalstyles.DetailSearchIcon, globalstyles.TextLeft]}
        />
      </View>
    );
  }
}

export default Searchbar