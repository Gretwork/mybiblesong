import React,{Component, useRef, useState} from "react";
import { View, Button, Image, Text, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {useRoute} from '@react-navigation/native';
import {globalstyles} from '../../styles/GlobalStyles';

const NotificatioonScreen = ({ props, navigation }) => {
  const route = useRoute();
  const ViewShotRef = useRef();
  const { params: { msgbody },} = route;
  //const { id } = props.route.params;

  //console.log('Profile screen',msgbody);
  //const params = route.params || {};
  //const { body, title } = params; 
  //const params = route.params || {};
  //const {details = {} } = params;
  const msgimgsmall = "https://firebasestorage.googleapis.com/v0/b/gaogeet.appspot.com/o/mybiblesong%2Fsongapp%2Fappimages%2Fsun-cloud-yellow-512.png?alt=media&token=5f027edf-9f33-4a13-a38f-aeed508eff16"
  return (
    <View style={{ flex: 1, alignItems: "center", backgroundColor:'#fff', justifyContent: "center" }}>
      <Image
          source={{uri:msgimgsmall}}
          style={styles.msgimgsmall}
      />
      <View style={styles.msgimgline}></View>
      {/* <Text style={styles.titletext}>Bible verse of the day</Text> */}
      {msgbody != 1 && 
      <Text style={styles.bodyttext}>{msgbody}</Text>
      }
      {/* <Text style={styles.attributeTitle}>Deeplink Title = {title}</Text>
      <Text style={styles.attributeTitle}>Deeplink Body = {body}</Text> */}
      <View style={globalstyles.Divider4}></View>
      <View style={globalstyles.BtnConDetail1}>
          <View style={(globalstyles.TextCenter, globalstyles.BtnLoadMoreOutCon)}>
            <Text
              style={[globalstyles.BtnLoadMoreInnText, globalstyles.TextCenter]}
              //onClick={showMoreItems}
              onPress={() => navigation.navigate('Verses')}>
              View All
            </Text>
          </View>
          <View style={(globalstyles.TextCenter, globalstyles.BtnLoadMoreOutCon)}>
            <Text
              style={[globalstyles.BtnLoadMoreInnText, globalstyles.TextCenter]}
              //onClick={showMoreItems}
              onPress={() => navigation.navigate('Songtab')}>
              Go Home
            </Text>
          </View>
        </View>
         
    </View>
  );
};
const styles = StyleSheet.create({
  attributeTitle: {
    padding: 20,
    fontSize:32,
    color: "#e4002b",
    textAlign:'center'
  },
  msgimgline:{
    height:1,
    width:'100%', marginTop:-30, marginBottom:30,
    display:'flex',
    backgroundColor:'#979797', zIndex:-1, 
  },
  msgimgsmall: {
    textAlign:'center',
    width:80,
    height:80, padding:10, borderColor:'#fff', borderWidth:0, borderStyle:'solid', borderRadius:40, backgroundColor:'#fff',
  },
  titletext: {
    padding: 20,
    fontSize:22,
    color: "#333",
    textAlign:'center',
    textTransform:"uppercase",
  },
  bodyttext: {
    padding: 20,
    fontSize:18,
    lineHeight:36,
    color: "#333",
    textAlign:'center'
  },
  imgcon: {
    padding: 20,
    color: "#e4002b",
    textAlign:'center'
  },
});
export default NotificatioonScreen;