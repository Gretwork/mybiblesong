import { Button, View,  Text,  Image,   Dimensions, ScrollView, StyleSheet, FlatList } from 'react-native';
import React, { useState, useEffect} from 'react';
import {globalstyles} from '../../styles/GlobalStyles';
import firestore from '@react-native-firebase/firestore';

function Testimonialslider({props, navigation}) {
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState(null);
  const [filteredDataSource, setFilteredDataSource] = useState([]);

  const dimensions = Dimensions.get('window');
  const imageHeight = Math.round(dimensions.width * 9/16 );
  const imageWidth = dimensions.width-30

  // const getAssets = async () =>{
  //   try {
  //      const list = [];
  //      //console.log("Break");
  //      firestore().collection("testimonials").get()
  //      .then(function(querySnapshot){
  //         querySnapshot.forEach(function(doc){
  //            list.push(doc.data());
  //         });
  //         setFilteredDataSource(list);
  //         //setMasterDataSource(list);
  //         //console.log("Testimonials List is", list);
  //      });
  //   } catch (e) {
  //      setErrors("Failed To Load Data");
  //   }
  // };
  // useEffect(() => {
  //   getAssets()
  //   //getAssetsSearch()
  // }, [filteredDataSource]);

  const imageUrl = "https://firebasestorage.googleapis.com/v0/b/gaogeet.appspot.com/o/mybiblesong%2Fsongapp%2Ftestimonials%2Fmybiblesong-testimonial-banner-1.jpg?alt=media&token=b863a614-01f6-49fd-9338-44c768238cfe"
  return (
    <>
      {/* <TextInput value={code} onChangeText={text => setCode(text)} />*/}
      <View
      >
      <View  style={( globalstyles.HorScrollMainCon)}>
          <View>
            <View style={globalstyles.HorScrollBoxCon}>
                <Image
                source={{uri:imageUrl}}
                style={( globalstyles.HorScrollBoxBibleVersImg)}
                />
            </View>
          </View>
        </View>  
      </View>
      {/* <View style={globalstyles.Divider10}></View> */}
    </>
  );
}

export default Testimonialslider;
// ... other code from the previous section

