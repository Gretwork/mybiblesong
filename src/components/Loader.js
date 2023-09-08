import { Text, View, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { globalstyles } from '../styles/GlobalStyles'
import { ActivityIndicator, MD2Colors } from 'react-native-paper';

export class Loader extends Component {
  render() {
    return (
      <ActivityIndicator animating={true} size='small' color='red' />
      // <View style={(globalstyles.LoaderCon)}>
      //   <Text style={(globalstyles.LoaderConText)}>Loading...</Text>
      // </View>
    )
  }
}

export default Loader