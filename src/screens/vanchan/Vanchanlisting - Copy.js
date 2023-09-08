import { Button, Img,  View,  Text,  Image,  TextInput,  ScrollView, StyleSheet, FlatList } from 'react-native';
import React, {Component, useState, useEffect, useCallback} from 'react';
import {globalstyles} from '../../styles/GlobalStyles';
import firestore from '@react-native-firebase/firestore';
import {BtnBackToHome, BtnComingSoon} from '../../components/MediaExport';
 


function Vanchanlisting({props, navigation}) {
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState(null);
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  

  const getAssets = async () =>{
    try {
       const list = [];
       //console.log("Break");
       firestore().collection("biblesocial").get()
       .then(function(querySnapshot){
          querySnapshot.forEach(function(doc){
             list.push(doc.data());
          });
          setFilteredDataSource(list);
          //console.log("List is", list);
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
      {/* <TextInput value={code} onChangeText={text => setCode(text)} />*/}
      <View >
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
          <View  style={( globalstyles.HorScrollMainCon)}>
          <View key={item.id}>
            <View style={globalstyles.HorScrollBoxCon}>
            {item.biblequotesimage ? 
            <>
                <View >
                    <Image
                    source={{ uri: item.biblequotesimage }}
                    //resizeMode="contain"
                    style={( globalstyles.HorScrollBoxBibleVersImgInn)}
                    />
                    {/* <Text>{item.biblequotescategory}</Text> */}
                </View>
            </>
            : null
            }
            </View>
          </View>
        </View>
      )}
    />
     : null}   

        

      </View>
      <View style={globalstyles.Divider1}></View>
      {!loading && <>
        <BtnComingSoon />
        <View style={globalstyles.Divider1}></View>
        <BtnBackToHome
          buttonTitle="Send your Testimony"
          onPress={() => navigation.navigate('Testimony')}
        />
        <View style={globalstyles.Divider1}></View>
        <BtnBackToHome
          buttonTitle="Send your Suggestion"
          onPress={() => navigation.navigate('Contact')}
        />
        </>}
        <View style={globalstyles.Divider2}></View> 
      </ScrollView>
    </>
  );
}

export default Vanchanlisting;
// ... other code from the previous section

