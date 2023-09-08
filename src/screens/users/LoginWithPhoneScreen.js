import React, {useContext, useState, useEffect} from 'react';
import {Button, View, Text, Image,StyleSheet, TextInput, ScrollView, FlatList} from 'react-native';
import FormInput from '../../components/FormInput';
import FormButton from '../../components/FormButton';
import SocialButton from '../../components/SocialButton';
import {AuthContext} from '../../navigation/AuthProvider';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {globalstyles} from '../../styles/GlobalStyles';
import { query, where } from "firebase/firestore";
import { Searchbar } from 'react-native-paper';




export default function PhoneLoginScreen({props, navigation}) {
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
    try {
       const list = [];
       //console.log("Break");
       firestore().collection("songbooks").orderBy("timestamp", "asc").get()
       .then(function(querySnapshot){
          querySnapshot.forEach(function(doc){
             list.push(doc.data());
          });
          setInfo(list);
          setFilteredDataSource(list);
          setMasterDataSource(list);
          //console.log("List is", list);
       });
    } catch (e) {
       setErrors("Failed To Load Data");
    }
  };
 

  //Call when component is rendered
  useEffect(() => {
    getAssets()
    //getAssetsSearch()
  }, [searchinput,filteredDataSource]);

  
  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.description
          ? item.description.toUpperCase()
         // ? item.posttitle.toLowerCase().includes(filteredDataSource.toLowerCase())
          : ''.toUpperCase();
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

//   const getAssetsSearch = async () =>{
//     try {
//        const searchlist = [];
//        console.log("searching...");
//        firestore()
//   .collection('songbooks')
//   // Filter results
//   .where('postmetatitle', 'in', '3')
//   //.orderBy('age', 'desc')
//   .get()
//   .then(function(querySnapshot){
//     querySnapshot.forEach(function(doc){
//       searchlist.push(doc.data());
//        console.log('something is...')
//     });
//     //setInfo(...searchlist);
//     setInfo([...searchlist])
//     console.log("Wow is", searchlist);
//  });
//     } catch (e) {
//        setErrors("Failed To Load Data");
//     }
//   };

  

  return (
    <>
      {/* <TextInput value={code} onChangeText={text => setCode(text)} />*/}
      <View>
         <Searchbar
      placeholder="Search Here..."
      onChangeText={(text) => searchFilterFunction(text)}
      value={search}
    />
    
      {!loading 
     ? 
     <FlatList
      data={filteredDataSource}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <View key={item.id} style={globalstyles.Container}>
          {/* {item.featuredImage && (
            <img key={item.id} source={{uri: item.img}} />
          )}
          {!item.featuredImage && (
            <img
              key={item.id}
              alt="Loading..."
              src="https://cdn.pixabay.com/photo/2021/06/14/15/19/kid-6336155__340.jpg"
            />
          )} */}
          <View style={globalstyles.RowCon}>
            <View style={globalstyles.SongRowCon}>
            {item.songImgUrl ? 
            <>
            <Text>{item.postmetatitle}</Text>
            <View style={globalstyles.ImgConOne}>
            <Image
            source={{ uri: item.songImgUrl }}
            style={{ width:'90%', minHeight:400 }}
            resizeMode="contain"
            />
          </View>
            </>
            : null
            }
              <View style={globalstyles.SongRowNumberCon}>
                <Text style={globalstyles.SongRowNumber}>
                  {item.videolink} {item.audiolink}
                  {item.posttitle}
                </Text>
              </View>
              <View style={globalstyles.SongRowHomeDetailCon}>
                <Text style={globalstyles.SongRowHomeDetail}>
                  Thank you GOD
                </Text>
              </View>
              <View style={globalstyles.SongRowHomeButtonCon}>
                <Text
                  style={globalstyles.SongRowHomeButton}
                  onPress={() =>
                    navigation.navigate('Details', {
                      posttitle: item.posttitle,
                      videolink: item.videolink,
                      audiolink: item.audiolink,
                      songImgUrl: item.songImgUrl,
                      postmetatitle: item.postmetatitle,
                    })
                  }>
                  Read More...
                </Text>
              </View>
            </View>
          </View>
          {/* <Text
            style={
              (globalstyles.Container,
              globalstyles.TextCenter,
              globalstyles.TitleBigOne)
            }>
            {item.node.title}
          </Text> */}

          {/* <Button
          title="Go to Profile"
          onPress={() =>
            this.props.navigation.navigate("Post", {
              id: item.node.id,
            })
          }
        /> */}
        </View>
      )}
    />
     : null}
        <View style={globalstyles.Divider10}></View>
      </View>
    </>
  );
}

//export default PhoneLoginScreen;

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
