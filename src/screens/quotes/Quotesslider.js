import { Button, View,  Text,  Image,  FlatList, TouchableOpacity } from 'react-native';
import React, {useState, useEffect} from 'react';
import {globalstyles} from '../../styles/GlobalStyles';
import firestore from '@react-native-firebase/firestore';
import Loader from '../../components/Loader';
import { Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';



function Quotesslider({props, navigation}) {
  

  const [loading, setLoading] = useState(true)
  const [errors, setErrors] = useState(null);
  const [filteredDataSource, setFilteredDataSource] = useState([]);

  const getAssets = async () =>{
    const todaysDate = new Date();
    todaysDate.setUTCHours.toLocaleString();
    try {
       const list = [];
       //console.log("Break");
       firestore().collection("bibleverses")       
       .orderBy('timestamp', 'desc')
       .limit(4)
       .where('timestamp', '<=', todaysDate)
       .get()
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
       setLoading(false)
    }
  };
  useEffect(() => {
    getAssets()
    //getAssetsSearch()
  }, [filteredDataSource]);

  const imageUrl = "https://firebasestorage.googleapis.com/v0/b/gaogeet.appspot.com/o/mybiblesong%2Fsongapp%2Fversesbanner%2Fmybiblesong-verses-banner-1.jpg?alt=media&token=1dce422c-1680-4c66-bf8a-56cd6e323aed";

  const [versesdata, setVersesdata] = useState([null]);
  
  const changepopup = (item) => { 
  const bodytext = 'versesdata';
  const pageurl = `mybiblesong://app/Quotesdownload/${bodytext}`; 
  //alert('11', item)
  AsyncStorage.setItem('quotesdetails', JSON.stringify(item))
  //console.log('first', item)
  setVersesdata([item])
  Linking.openURL(`mybiblesong://app/Quotesdownload/`); 
  //Linking.openURL('mybiblesong://app/Quotesdownload')
  //console.log('first', bodytext)
  //const pageurl = `mybiblesong://app/Quotesdownload`;
  }
  
  
  return (
    <>
      {!loading 
     ? 
     <FlatList
      horizontal
      data={filteredDataSource}
      keyExtractor={item => item.id}
      renderItem={({item,id}) => (
          <View key={item.id} style={( globalstyles.HorScrollMainCon)}>
            <TouchableOpacity 
            //onPress={()=> changepopup('item')}
            onPress={() => changepopup(item)}
            //onPress={() => Linking.openURL(pageurl)}
            //onPress={() => Linking.openURL(pageurl) || setVersesdata(item.songdata)}
            //onPress={() => navigation.navigate('Details', { personDetailsId: item.id })}
            // onPress={() => Linking.openURL(pageurl, 
            // {
            //   id: item.id,
            //   bibleversestext: item.bibleversestext,
            //   bibleverseno: item.bibleverseno,
            //   biblebookchapter: item.biblebookchapter,
            //   biblebookname: item.biblebookname,
            // })}
            >
          <View >
            <View style={globalstyles.HorScrollBoxCon}>
          <View>
          <Image
            source={{ uri: imageUrl }}
            style={(globalstyles.HorScrollBoxBibleVersImgBig)} />
                <View style={globalstyles.HorScrollBoxConVersCon}>
                  <View style={globalstyles.HorScrollBoxConVersTextCon}>
                  <Text numberOfLines={4} style={globalstyles.HorScrollBoxConVersText}>
                    {item.bibleversestext.length < 115
                    ? `${item.bibleversestext}`
                    : `${item.bibleversestext.substring(0, 110)}...`}
                  </Text>
                  </View>
                  <View style={globalstyles.HorScrollBoxConVersInfoCon}>
                  <Text  style={globalstyles.HorScrollBoxConVersInfo}>{item.biblebookname}-{item.biblebookchapter}:{item.bibleverseno}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          </TouchableOpacity>
        </View>
      )}
    />
     : 
     <Loader/>
     }   
    </>
  );
}

export default Quotesslider;
// ... other code from the previous section

