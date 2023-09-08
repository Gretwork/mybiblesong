import { Button, View,  Text,  Image,   Dimensions, ScrollView, StyleSheet, FlatList } from 'react-native';
import React, { useState, useEffect} from 'react';
import {globalstyles} from '../../styles/GlobalStyles';
import firestore from '@react-native-firebase/firestore';

function Quotesslider({props, navigation}) {
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState(null);
  const [filteredDataSource, setFilteredDataSource] = useState([]);

  const dimensions = Dimensions.get('window');
  const imageHeight = Math.round(dimensions.width * 9/16 );
  const imageWidth = dimensions.width-30

  const getAssets = async () =>{
    try {
       const list = [];
       //console.log("Break");
       firestore().collection("bibleverses")
       .orderBy('timestamp', 'asc').limit(1)
       .get()
       .then(function(querySnapshot){
          querySnapshot.forEach(function(doc){
             list.push(doc.data());
          });
          setFilteredDataSource(list);
          //setMasterDataSource(list);
          //console.log("Bible verses List is", list);
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
            

          <View >
            {item.bibleversesimage ? 
          <>
          
            <Image
            source={{ uri: item.bibleversesimage }}
            //resizeMode="cover" 
            style={(globalstyles.HorScrollBoxBibleVersImg)}
            //width={imageWidth} height={imageHeight}
          
            />
          </>
          : <Image
          source={{ uri: item.bibleversesimage }}
          //resizeMode="cover" 
          style={(globalstyles.HorScrollBoxBibleVersImg)}
          //width={imageWidth} height={imageHeight}
        
          />
          }
	
	<View style={globalstyles.HorScrollBoxConVersCon}>
	  <View style={globalstyles.HorScrollBoxConVersTextCon}>
		<Text  style={globalstyles.HorScrollBoxConVersText}>{item.bibleversestext}</Text>
	  </View>
	  <View style={globalstyles.HorScrollBoxConVersInfoCon}>
		<Text  style={globalstyles.HorScrollBoxConVersInfo}>{item.biblebookname}-{item.biblebookchapter}:{item.bibleverseno}</Text>
	  </View>
	</View>
</View>
            </View>
          </View>
        </View>
      )}
    />
     : null}   
      </View>
    </>
  );
}

export default Quotesslider;
// ... other code from the previous section

