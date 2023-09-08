import {
  Button,
  View,
  SafeAreaView,
  TouchableOpacity,
  VirtualizedList,
  Text,
  Image,
  StyleSheet,
  FlatList,
} from 'react-native';
import React, { useState, useEffect} from 'react';
import {globalstyles} from '../../styles/GlobalStyles';
import firestore from '@react-native-firebase/firestore';
import { Query, orderBy, limit } from "firebase/firestore";  
import {Songbannerbigone} from '../../components/MediaExport'


import {Searchbar} from 'react-native-paper';

function Songs({props, navigation}) { 
  const [info, setInfo] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [searchinput, setSearchinput] = useState(null);
  const [errors, setErrors] = useState(null);

  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  // Start the fetch operation as soon as
  // the page loads

  // Fetch the required data using the get() method

  const getAssets = async () => {
    try {
      const list = [];
      //console.log("Break");
      firestore()
        .collection('songbooks')
        .orderBy('timestamp', 'asc')
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            list.push(doc.data());
          });
          setInfo(list);
          setFilteredDataSource(list);
          setMasterDataSource(list);
          //console.log("List is", list);
          //console.log("List is", list[0].bannersongsmain1);
        });
    } catch (e) {
      setErrors('Failed To Load Data');
    }
  };

  //Call when component is rendered
  

  const searchFilterFunction = text => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.description
          ? item.description.toUpperCase()
          : // ? item.posttitle.toLowerCase().includes(filteredDataSource.toLowerCase())
            ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  useEffect(() => {
    getAssets();
    //getAssetsSearch()
  }, [searchinput]);
  
  const DATA = [];

  const getItem = (data, index) => ({
    songdata : masterDataSource[index],
    id: Math.random().toString(12).substring(0),
    title: `Item - ${index+1}`,
    demoname:`++++ ${index+1}`,
  });
  
  const getItemCount = (data) => 500;
  
  const Item = ({ title,demoname, songdata }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.title}>{songdata}</Text>
      <Text style={styles.title}>{demoname}</Text>
    </View>
  );

  return (
    <>
      {/* <TextInput value={code} onChangeText={text => setCode(text)} />
          <View style={globalstyles.SongsBannerCon}></View>
      */}
       <SafeAreaView style={styles.container}>
      <VirtualizedList
        data={masterDataSource}
        initialNumToRender={10}
        renderItem={({ item }) => (
          // <>
          // <Text>{item.title} s</Text>
          // <Text>{item.demoname}</Text>
          // <Text style={{display:'flex', backgroundColor:'red', color:'white'}}>{item.songdata.songnumber}</Text>
          // <Text>{item.songdata.songtitle}</Text>
          // </>
          <TouchableOpacity key={item.id} onPress={() =>
            navigation.navigate('Details', {
              id: item.songdata.id,
              posttitle: item.songdata.posttitle,
              videolink: item.songdata.videolink,
              audiolink: item.songdata.audiolink,
              songImgUrl: item.songdata.songImgUrl,
              weburl:item.songdata.weburl,
              postmetatitle: item.songdata.postmetatitle,
            })
          }>
            <View key={item.songdata.id} style={globalstyles.SongsListDataRowCon}>
              <Text style={globalstyles.SongsListNoBox}>
                {item.songdata.songnumber}
              </Text>
              <Text numberOfLines={1} ellipsizeMode='tail' style={globalstyles.SongsListTitleText}>
                {item.songdata.songtitle}
              </Text>
              <Text numberOfLines={2} ellipsizeMode='tail' style={globalstyles.SongsListDescText}>
                {item.songdata.posttitle}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.key}
        getItemCount={getItemCount}
        getItem={getItem}
      />
    </SafeAreaView>
      <Songbannerbigone style={globalstyles.SongsBannerCon} />
      <View style={globalstyles.SongsListTabMainCon}>
        <View style={globalstyles.SongsListTabInnCon}>
          <Text style={globalstyles.SongsListTabMenuCon}>All</Text>
          <Searchbar
            placeholder="Search Here..."
            onChangeText={text => searchFilterFunction(text)}
            value={search}
            style={globalstyles.SongsListTabSearchCon}
          />
        </View>
        
        {/* <FlatList
          data={filteredDataSource}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TouchableOpacity key={item.id} onPress={() =>
              navigation.navigate('Details', {
                id: item.id,
                posttitle: item.posttitle,
                videolink: item.videolink,
                audiolink: item.audiolink,
                songImgUrl: item.songImgUrl,
                weburl:item.weburl,
                postmetatitle: item.postmetatitle,
              })
            }>
              <View key={item.id} style={globalstyles.SongsListDataRowCon}>
                <Text style={globalstyles.SongsListNoBox}>
                  {item.songnumber}
                </Text>
                <Text numberOfLines={1} ellipsizeMode='tail' style={globalstyles.SongsListTitleText}>
                  {item.songtitle}
                </Text>
                <Text numberOfLines={2} ellipsizeMode='tail' style={globalstyles.SongsListDescText}>
                  {item.posttitle}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        /> */}
        <View style={globalstyles.Divider1}></View>
      </View>
    </>
  );
}

export default Songs;
// ... other code from the previous section

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
  },
  logo: {
    height: 100,
    width: 100,
    borderRadius: 50,
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
