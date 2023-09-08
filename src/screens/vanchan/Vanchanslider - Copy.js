import { Button, Img,  View,  Text,  Image,  TextInput,  ScrollView, StyleSheet, FlatList } from 'react-native';
import React, {Component, useState, useEffect, useCallback} from 'react';
import {globalstyles} from '../../styles/GlobalStyles';
import firestore from '@react-native-firebase/firestore';
 
import auth from '@react-native-firebase/auth';  
import { query, where } from "firebase/firestore";


function Vanchanslider({props, navigation}) {
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState(null);
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  

  const getAssets = async () =>{
    try {
       const list = [];
       //console.log("Break");
       firestore().collection("vanchan").get()
       .then(function(querySnapshot){
          querySnapshot.forEach(function(doc){
             list.push(doc.data());
          });
          setFilteredDataSource(list);
          //console.log("vanchan List is", list);
       });
    } catch (e) {
       setErrors("Failed To Load Data");
    }
  };
  useEffect(() => {
    getAssets()
    //getAssetsSearch()
  }, [filteredDataSource]);

  const imageUrl = "https://firebasestorage.googleapis.com/v0/b/gaogeet.appspot.com/o/mybiblesong%2Fsongapp%2Fscriptures%2Fmybiblesong-scriptures-banner-1.jpg?alt=media&token=769e939f-6736-4b16-a7f3-165924afbea6";


  return (
    <>
      {/* <TextInput value={code} onChangeText={text => setCode(text)} />*/}
      <View
      >
      {!loading 
     ? 
     <FlatList
      horizontal
     //horizontal
     //pagingEnabled={true}
    // showsHorizontalScrollIndicator={true}
    //contentContainerStyle={{paddingBottom:50}}
      data={filteredDataSource}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        //<View key={item.id} style={globalstyles.Container}>
          <View  style={( globalstyles.HorScrollMainCon)}>
          <View key={item.id}>
            <View style={globalstyles.HorScrollBoxCon}>
            {item.biblequotesimage ? 
            <>
                <View >
                    <Image
                    //source={{uri:'https://firebasestorage.googleapis.com/v0/b/gaogeet.appspot.com/o/mybiblesong%2Fsongapp%2Fscriptures%2Fmybiblesong-scriptures-banner-1.jpg'}}
                    source={{uri:imageUrl}}
                    //resizeMode="contain"
                    style={( globalstyles.HorScrollBoxConImg)}
                    />
                    {/* <Text>{item.biblequotescategory}</Text> */}
                </View>
            </>
            : <Image
            //source={{uri:'https://firebasestorage.googleapis.com/v0/b/gaogeet.appspot.com/o/mybiblesong%2Fsongapp%2Fscriptures%2Fmybiblesong-scriptures-banner-1.jpg'}}
            source={{uri:imageUrl}}
            //resizeMode="contain"
            style={( globalstyles.HorScrollBoxConImg)}
            />
            }
            </View>
          </View>
        </View>
      )}
    />
     : null}   
      </View>
      {/* <View style={globalstyles.Divider10}></View> */}
    </>
  );
}

export default Vanchanslider;
// ... other code from the previous section

