import { Button, Img,  View,  Text,  Image,  TextInput,  ScrollView, StyleSheet,VirtualizedList, FlatList } from 'react-native';
import React, {Component, useState, useEffect, useCallback} from 'react';
import {globalstyles} from '../../styles/GlobalStyles';
import firestore from '@react-native-firebase/firestore';
import {BtnBackToHome, BtnComingSoon} from '../../components/MediaExport';
import Loader from '../../components/Loader';


function Vanchanlisting({props, navigation}) {
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState(null);
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  

  const getAssets = async () =>{
    setLoading(true)
    try {
       const list = [];
       //console.log("Break");
       firestore().collection("vanchan").get()
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
    }
  };
  useEffect(() => {
    getAssets()
    //getAssetsSearch()
  }, [filteredDataSource]);

  const DATA = [];

  const getItem = (data, index) => ({
    songdata : filteredDataSource[index],
    id: Math.random().toString(12).substring(0),
    title: `Item - ${index+1}`,
    demoname:`++++ ${index+1}`,
  });
  
  const getItemCount = (data) => 10;
  
  const Item = ({ title,demoname, songdata }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.title}>{songdata}</Text>
      <Text style={styles.title}>{demoname}</Text>
    </View>
  );

  const EmptyList = () => (
    <>
    <Text style={globalstyles.SongsListTitleNoDataText}>Tray to search something like song number, song title...</Text>
    </>
  )

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
            : null
            }
            </View>
          </View>
          <View style={globalstyles.Divider1}></View>
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
      <View style={globalstyles.Divider1}></View>

        
        <View style={globalstyles.Divider1}></View>
        {!loading && 
        <> 
        <BtnBackToHome
          buttonTitle="Send your Testimony"
          onPress={() => navigation.navigate('Testimony')}
        />
        <View style={globalstyles.Divider1}></View>
        <BtnBackToHome
          buttonTitle="Send your Suggestion"
          onPress={() => navigation.navigate('Contact')}
        />
        </>
        }
        <View style={globalstyles.Divider2}></View> 
      </ScrollView>
    </>
  );
}

export default Vanchanlisting;
// ... other code from the previous section

