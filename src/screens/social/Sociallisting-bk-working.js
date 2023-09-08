import { Button, Img,  View,  Text,  Image,  TextInput,  ScrollView, StyleSheet, FlatList } from 'react-native';
import React, {Component, useState, useEffect, useCallback} from 'react';
import {globalstyles} from '../../styles/GlobalStyles';
import firestore from '@react-native-firebase/firestore';
import {BtnBackToHome, BtnComingSoon} from '../../components/MediaExport';
import Loader from '../../components/Loader';


function Sociallisting({props, navigation}) {
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState(null);
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  

  const getAssets = async () =>{
    setLoading(false)
    try {
       const list = [];
       //console.log("Break");
       firestore().collection("biblequotes").get()
       .then(function(querySnapshot){
          querySnapshot.forEach(function(doc){
             list.push(doc.data());
             setLoading(false)
          });
          setFilteredDataSource(list);
          //console.log("List is", list);
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
            {item.songImgUrl ? 
            <>
                <View >
                    <Image
                    source={{ uri: item.songImgUrl }}
                    //resizeMode="contain"
                    style={( globalstyles.HorScrollBoxBibleVersImgInn)}
                    />
                    {/* <Text>{item.biblequotescategory}</Text> */}
                </View>
            </>
            : <>
            <View style={globalstyles.Divider1}></View>
            <Loader />
            </>
            }
            </View>
          </View>
        </View>
      )}
    />
     : 
     <>
        <View style={globalstyles.Divider5}></View>
        <Loader />
        </>
     }   

        

      </View>
      <View style={globalstyles.Divider5}></View>
        {!loading && <>
        <BtnComingSoon />
        <View style={globalstyles.Divider1}></View>
        <BtnBackToHome
          buttonTitle="Send your Testimony"
          onPress={() => navigation.navigate('Testimony')}
        />
        <View style={globalstyles.Divider2}></View>
        <BtnBackToHome
          buttonTitle="Send your Suggestion"
          onPress={() => navigation.navigate('Contact')}
        />
        </>}
        <View style={globalstyles.Divider5}></View> 
      </ScrollView>
    </>
  );
}

export default Sociallisting;
// ... other code from the previous section

