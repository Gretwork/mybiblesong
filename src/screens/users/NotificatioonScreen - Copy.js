import React,{Component, useRef, useState} from "react";
import { View, Button, Text, StyleSheet } from "react-native";
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

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={styles.titletext}>Bible verse of the day</Text>
      {msgbody != 1 && 
      <Text style={styles.bodttext}>{msgbody}</Text>
      }
      {/* <Text style={styles.attributeTitle}>Deeplink Title = {title}</Text>
      <Text style={styles.attributeTitle}>Deeplink Body = {body}</Text> */}
      <View style={globalstyles.Divider1}></View>
        <View style={(globalstyles.TextCenter, globalstyles.BtnLoadMoreOutCon)}>
          <Text
            style={globalstyles.BtnLoadMoreInnText}
            //onClick={showMoreItems}
            onPress={() => navigation.navigate('Verses')}>
            View All
          </Text>
        </View>
        <View style={globalstyles.Divider1}></View>
        <View style={(globalstyles.TextCenter, globalstyles.BtnLoadMoreOutCon)}>
          <Text
            style={globalstyles.BtnLoadMoreInnText}
            //onClick={showMoreItems}
            onPress={() => navigation.navigate('Home')}>
            Go Back to Home
          </Text>
        </View>
      {/*
      <Button
        title="Go to HOME"
        onPress={() => navigation.navigate("Home")}
      />

       <Button title="Go back" onPress={() => navigation.goBack()} /> */}

      {/* <View style={{ paddingTop: 10, paddingHorizontal: 10 }}>
          <ScrollView>
            {Object.keys(valueMap).map((key) =>{
              if(!details[key]){
                return null;
              }
              return (
                <Text key={key}>
                  <Text>{`${valueMap[key]}:`}</Text>
                  {details[key]}
                </Text>
              )
            })

            }
          </ScrollView>
      </View> */}

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
  titletext: {
    padding: 20,
    fontSize:26,
    color: "#333",
    textAlign:'center',
    textTransform:"uppercase",
  },
  bodttext: {
    padding: 20,
    fontSize:22,
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