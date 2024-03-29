import { Button,  View,  Text,  Image,  TextInput,  ScrollView, StyleSheet, FlatList } from 'react-native';
import React, {Component, useState, useEffect, useCallback} from 'react';
import {globalstyles} from '../../styles/GlobalStyles';
import firestore from '@react-native-firebase/firestore';
import Loader from '../../components/Loader';
//import auth from '@react-native-firebase/auth';  
//import { query, where } from "firebase/firestore";

//import { Searchbar } from 'react-native-paper';


function Songslider({props, navigation}) {
// If null, no SMS has been sent
const [confirm, setConfirm] = useState(null);
const [info , setInfo] = useState([]);
const [code, setCode] = useState('');
const [loading, setLoading] = useState(false)
const [searchinput, setSearchinput] = useState(null);
const [errors, setErrors] = useState(null);


const [search, setSearch] = useState('');
const [filteredDataSource, setFilteredDataSource] = useState([]);
const [masterDataSource, setMasterDataSource] = useState([]);


// Start the fetch operation as soon as
  // the page loads

// Fetch the required data using the get() method

const getAssets = async () =>{
  setLoading(true)
  try {
     const list = [];
     //console.log("Break");
     firestore().collection("songbanner")
     .orderBy('timestamp', 'desc').limit(4)
     .get()
     .then(function(querySnapshot){
        querySnapshot.forEach(function(doc){
           list.push(doc.data());
        });
        setInfo(list);
        setFilteredDataSource(list);
        setMasterDataSource(list);
        //console.log("List is", list);
        setLoading(false)
     });
  } catch (e) {
     setErrors("Failed To Load Data");
     setLoading(false)
  }
};

//Call when component is rendered
useEffect(() => {
  getAssets()
  //getAssetsSearch()
}, [filteredDataSource]);

  



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
    //contentContainerStyle={{paddingBottom:250}}
      data={filteredDataSource}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        //<View key={item.id} style={globalstyles.Container}>
          <View key={item.id} style={( globalstyles.HorScrollMainCon)}>
          <View >
            <View style={globalstyles.HorScrollBoxCon}>
            {item.songbannerimage ? 
            <>
                <View >
                    <Image
                    source={{ uri: item.songbannerimage }}
                    //resizeMode="contain"
                    style={( globalstyles.HorScrollBoxConImg)}
                    />
                    {/* <Text>{item.songfromto}</Text> */}
                </View>
            </>
            : null
            }
            </View>
          </View>
        </View>
      )}
    />
     : 
     <Loader/>
     }
       
      </View>
      {/* <View style={globalstyles.Divider10}></View> */}
    </>
  );
}

export default Songslider;
// ... other code from the previous section

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50
  },
  logo: {
    height: 100,
    width: 100,
    borderRadius:50,
    resizeMode: 'cover',
  },
  text: {
    fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 28,
    marginBottom: 10,
    color: '#051d5f',
  },
  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    marginVertical: 35,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2e64e5',
    fontFamily: 'Lato-Regular',
  },
});
