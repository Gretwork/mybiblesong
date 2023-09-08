import { View, Text, FlatList, Linking } from 'react-native'
import React, {Component, useState, useEffect, useCallback} from 'react';
import firestore from '@react-native-firebase/firestore';
import {globalstyles} from '../styles/GlobalStyles';

const AlertUpdate = () => {
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [loading, setLoading] = useState(false)
    const [playstoreappversion, setPlaystoreappversion] = useState()
    const getAssets = async () =>{
        try {
           const list = [];
           //console.log("Break");
           firestore().collection("alertupdateios").get()
           .then(function(querySnapshot){
              querySnapshot.forEach(function(doc){
                 list.push(doc.data());
              });
              setFilteredDataSource(list);
              setPlaystoreappversion(list.version)
              //console.log("List is", list);
              //setLoading(false)
           });
        } catch (e) {
           setErrors("Failed To Load Data");
           //setLoading(false)
        }
        
      };
      useEffect(() => {
        getAssets()
        //getAssetsSearch()
      }, [filteredDataSource]);
    
    const pkg = require('../../package.json');
    const appversion = pkg.version;

  return (
    <>
    
    <View>
      
    {!loading 
   ? 
   <FlatList
    horizontal
    data={filteredDataSource}
    keyExtractor={item => item.id}
    renderItem={({item}) => (
      <>
      {appversion < item.version 
    ? 
    <>
    <View style={(globalstyles.AppUpdateAlertBoxCon)}>
      {item.news ? 
      <><Text style={(globalstyles.AppUpdateAlertText)}>
          {item.news}
      </Text>
      </>
      : null}
      
      {item.updatelinkone ? 
      <View style={(globalstyles.AppUpdateAlertButtonCon)}><Text style={(globalstyles.AppUpdateAlertButton)} onPress={() => Linking.openURL(item.updatelinkone) }>
          {item.updatelinkonelabel}
      </Text>
      </View>
      :null
      }
      </View>
    </>
    : 
          null
        }
      </>
      


    )}
  />
  
   : 
   null
   }   
    </View>
    
    
    </>
  )
}

export default AlertUpdate