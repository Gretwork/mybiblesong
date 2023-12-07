import {  View,   Image,  FlatList } from 'react-native';
import React, {useState, useEffect,} from 'react';
import {globalstyles} from '../../styles/GlobalStyles';
import firestore from '@react-native-firebase/firestore';
 
//import auth from '@react-native-firebase/auth';  
//import { query, where } from "firebase/firestore";
import Loader from '../../components/Loader';


function Socialslider({props, navigation}) {
  const [loading, setLoading] = useState(true)
  const [errors, setErrors] = useState(null);
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  

  const getAssets = async () =>{
    const todaysDate = new Date();
    todaysDate.setUTCHours.toLocaleString();
    try {
       const list = [];
       //console.log("Break");
       firestore()
       .collection("biblequotes")       
       .orderBy('timestamp', 'desc')
       .limit(4)
       .where("timestamp", "<=", todaysDate)
       .get()
       .then(function(querySnapshot){
          querySnapshot.forEach(function(doc){
             list.push(doc.data());
          });
          setFilteredDataSource(list);
          //console.log("List is", list);
          setLoading(false)
       });
    } catch (e) {
       setErrors("Failed To Load Data");
       setLoading(false)
    }
    
  };
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
                    style={( globalstyles.HorScrollBoxConImg)}
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
     : 
     <>
     <Loader/>
     </>
     }   
      </View>
      {/* <View style={globalstyles.Divider10}></View> */}
    </>
  );
}

export default Socialslider;


