import {
  Button,
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  FlatList,
} from 'react-native';
import React, {Component, useState, useEffect, useCallback} from 'react';
import {globalstyles} from '../../styles/GlobalStyles';

import {Header} from '@react-navigation/stack';

function Searchscreen({props, navigation}) {
  return (
    <View
      style={(globalstyles.BodyMainOutCon, globalstyles.SearchPaddingBottom)}>
      <View style={globalstyles.HeaderConMain}>
        <View style={globalstyles.HeaderSearcCon}>
          <Text>Search....22</Text>
        </View>
      </View>
    </View>
  );
}

export default Searchscreen;
