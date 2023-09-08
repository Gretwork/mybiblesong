import {
  View,
  TouchableOpacity,
  VirtualizedList,
  Text,
  StyleSheet, 
} from 'react-native';
import React, { useState, useEffect} from 'react';
import {globalstyles} from '../../styles/GlobalStyles';
import firestore from '@react-native-firebase/firestore'; 
import {Songbannerbigone} from '../../components/MediaExport'
import Loader from '../../components/Loader';

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
    setLoading (true)
    try {
      const list = [];
      //console.log("Break");
      firestore()
        .collection('songbooks')
        .orderBy('timestamp', 'desc')
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            list.push(doc.data());
          });
          setInfo(list);
          setFilteredDataSource(list);
          setMasterDataSource(list);
          //console.log("List is", list.length);
          //console.log("List is", list[0].bannersongsmain1);
          setLoading(false)
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
    songdata : filteredDataSource[index],
    id: Math.random().toString(12).substring(0),
    title: `Item - ${index+1}`,
    demoname:`++++ ${index+1}`,
  });
  


  const EmptyList = () => (
    <>
    <Text style={globalstyles.SongsListTitleNoDataText}>Search song...</Text>
    </>
  )

  return (
    <>
      {/* <TextInput value={code} onChangeText={text => setCode(text)} />
          <View style={globalstyles.SongsBannerCon}></View>
      */}
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
        {!loading ? <>
        <VirtualizedList
        //style={styles.container}
        data={filteredDataSource}
        initialNumToRender={4}
        ListEmptyComponent={EmptyList}
        //ItemSeparatorComponent={EmptyList}
        keyExtractor={item => item.key}
        getItemCount={data=>data.length}
        getItem={getItem}
        renderItem={({ item }) => (
          <TouchableOpacity  onPress={() =>
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
             
            <View style={globalstyles.SongsListDataRowCon}>
            <View style={globalstyles.SongsListNoBoxCon}>
              <Text style={globalstyles.SongsListNoBoxText}>
              {item.songdata.songnumber}
            </Text>
            </View>
            
            <Text numberOfLines={1} ellipsizeMode='tail' style={globalstyles.SongsListTitleText}>
              {item.songdata.songtitle}
            </Text>
            <Text numberOfLines={2} ellipsizeMode='tail' style={globalstyles.SongsListDescText}>
              {item.songdata.posttitle}
            </Text>
          </View>            
          </TouchableOpacity>
          )}
        />
        </> : <>
        {/* <Text style={{marginLeft:15, marginTop:15, fontSize:18, color:'black'}}>Loading...</Text> */}
        <Loader/>
        </>}
        
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
