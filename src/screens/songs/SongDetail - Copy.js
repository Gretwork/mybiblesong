import React, { Component } from 'react'
import {Button, View, Text,Image, ScrollView, useWindowDimensions} from 'react-native';
import {useRoute} from '@react-navigation/native';
//import RenderHtml from 'react-native-render-html';
import {globalstyles} from '../../styles/GlobalStyles';
//import { NavigationContainer } from "@react-navigation/native";
//import { createNativeStackNavigator } from "@react-navigation/native-stack";
//import RenderHtml from "react-native-render-html";
//import demoimg from '../../assets/demoimg.png';
import demoimg from '../../assets/demoimg.png'



function SongDetail({ props, navigation, onPress }) {
const route = useRoute();
const contentWidth = useWindowDimensions().width;
    
  return (
    <ScrollView>
      <View style={globalstyles.BodyMainOutCon}>
        {/* <img style={{  padding:'10px', height:'auto', width: '100%' }} src={route.params.featuredImage.node.sourceUrl}  /> */}
        {/* {route.params.featuredImage != null && (
      <img
        alt="original image"
        src={{ uri: route.params.featuredImage.node.sourceUrl }}
      />
    )}
    {route.params.featuredImage == null && (
      <img
         
        alt="demo image"
        src={demoimg}
      />
    )} */}
        {/* <Text
          style={globalstyles.TitleBigOne}>
          {route.params.posttitle}
        </Text> */}
        {route.params.songImgUrl ? 
            <>
            {/* <Text>{route.params.postmetatitle}</Text> */}
            <View style={globalstyles.SongDetailImageCon}>
            <Image
            source={{ uri: route.params.songImgUrl }}
            //style={{ width:'96%', minHeight:400 }}
            //resizeMode="contain"
            style={globalstyles.SongDetailImage}
            />
          </View>
            </>
            : null
            }
        {/* <Image alt="demo image" source={demoimg} /> */}
 
        {/* <Button title="Home" onPress={() => navigation.navigate('Home')} /> */}
        <View style={(globalstyles.TextCenter, globalstyles.BtnLoadMoreOutCon)}>
            <Text
              style={(globalstyles.BtnLoadMoreInnText)}
              //onClick={showMoreItems}
              onPress={() => navigation.navigate('Home')}>
              Go to Home ...
            </Text>
          </View>
          
      </View>
    </ScrollView>
  );
}

export default SongDetail;
