import { Button, View,  Text,  Image, TouchableOpacity,  Dimensions, ScrollView, StyleSheet, FlatList,Linking,
  PermissionsAndroid,  Platform, } from 'react-native';
import React, { Component, useRef, useState, useEffect} from 'react';
import {globalstyles} from '../../styles/GlobalStyles';
import firestore from '@react-native-firebase/firestore';
import {BtnBackToHome, BtnComingSoon} from '../../components/MediaExport';
import {useRoute} from '@react-navigation/native';
import Loader from '../../components/Loader';
import Icon from 'react-native-vector-icons/Ionicons';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob';


function Quoteslisting({props, navigation, onPress}) {
  const route = useRoute();

  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState(null);
  const [filteredDataSource, setFilteredDataSource] = useState([]);

  const dimensions = Dimensions.get('window');
  const imageHeight = Math.round(dimensions.width * 9/16 );
  const imageWidth = dimensions.width-30

  const getAssets = async () =>{
    setLoading(true)
    try {
       const list = [];
       //console.log("Break");
       firestore().collection("bibleverses").get()
       .then(function(querySnapshot){
          querySnapshot.forEach(function(doc){
             list.push(doc.data());
          });
          setFilteredDataSource(list);
          //setMasterDataSource(list);
          //console.log("Bible verses List is", list);
          setLoading(false)
       });
    } catch (e) {
       setErrors("Failed To Load Data");
    }
  };
  useEffect(() => {
    getAssets()
    //getAssetsSearch()
  }, [filteredDataSource]);



  return (
    <>
      <ScrollView style={globalstyles.BodyMainOutCon}>
      {!loading 
     ? 
     <FlatList
      //horizontal
     //horizontal
     //pagingEnabled={true}
    // showsHorizontalScrollIndicator={true}
    //contentContainerStyle={{paddingBottom:50}}
      data={filteredDataSource}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        //<View key={item.id} style={globalstyles.Container}>
          <View key={item.id} style={( globalstyles.QuoteListingMainCon)}>
            
            <Text style={(globalstyles.QuoteListingMainText)}>{item.bibleversestext}</Text>
            
            <View style={( globalstyles.QuoteListingVerseCon)}>
            <Text style={globalstyles.HorScrollBoxConVersInfo}>{item.biblebookname}-{item.biblebookchapter}:{item.bibleverseno}</Text>
            </View>
            {/* <View style={globalstyles.QuoteListingShareCon}>
            <View style={globalstyles.BtnConDetail1}>
              <TouchableOpacity onPress={downloadImage}>
          <Text style={globalstyles.BtnConDetailText}>
            <Icon
              name="ios-download-outline"
              style={globalstyles.BtnConDetailTextIcon}
            />
          </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={captureViewShot}>
          <Text style={globalstyles.BtnConDetailText}>
            <Icon
              name="ios-share-social-outline"
              style={globalstyles.BtnConDetailTextIcon}
            />
          </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://www.mybiblesong.com')}>
              <Text style={globalstyles.BtnConDetailText}>
                <Icon
                  name="ios-globe-outline"
                  style={globalstyles.BtnConDetailTextIcon}
                />
              </Text>
              </TouchableOpacity>
            </View>
            </View> */}
        </View>
      )}
    />
     : 
     
     <>
        <View style={globalstyles.Divider5}></View>
        <Loader />
        </>
     }   

      <View style={globalstyles.Divider1}></View>
              
      {/* <BtnComingSoon />
      <View style={globalstyles.Divider1}></View>
      <BtnBackToHome
        buttonTitle="Send your Testimony"
        onPress={() => navigation.navigate('Testimony')}
      />
      <View style={globalstyles.Divider1}></View>
      <BtnBackToHome
        buttonTitle="Send your Suggestion"
        onPress={() => navigation.navigate('Contact')}
      /> */}
      <View style={globalstyles.Divider2}></View>
      </ScrollView>
    </>
  );
}

export default Quoteslisting;
// ... other code from the previous section
 