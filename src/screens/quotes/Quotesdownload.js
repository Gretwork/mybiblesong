import React, {Component, useEffect, useRef, useState} from 'react';
import {
  Button,
  View,
  Text,
  Image,
  Linking,
  ScrollView,
  TouchableOpacity,  
  PermissionsAndroid,
  Platform, 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useRoute} from '@react-navigation/native';
//import RenderHtml from 'react-native-render-html';
import {globalstyles} from '../../styles/GlobalStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob';

const url = " - www.mybiblesong.com";
const titletext = "Download MyBibleSong App or Visit our Website www.mybiblesong.com";

function Quotesdownload({props, navigation, onPress}) {
const route = useRoute();

const ViewShotRef = useRef();
const [extrathings, setExtrathings] = useState(true);
const [mainData, setMainData] = useState(null)

const verse = mainData?.bibleversestext;
const book = mainData?.biblebookname;
const bookchap = mainData?.biblebookchapter;
const chapno = mainData?.bibleverseno;


const message = verse + ' - ' + book +' - '+ bookchap +' : '+ chapno ;

const options = {
  titletext,
  url,
  message,
};

// useEffect(async () => {
//   const mainData = await JSON.parse(AsyncStorage.getItem('quotesdetails'))
//   console.log('Langdata', mainData)
//   setMainData(mainData)
// }, [])

  const mainDataget = async () => {
    try {
      const savedUser = await AsyncStorage.getItem("quotesdetails");
      const mainData = JSON.parse(savedUser);
      setMainData(mainData)
      //console.log('download page ',mainData);
    } catch (error) {
      //console.log('download page errr',error);
    }
  };

useEffect ( ()=>{
  mainDataget()
},[])


  // let imageURI = route.params.songImgUrl;
  // let imageURIMessage =
  //   'Download MyBibleSong App or Visit our Website www.mybiblesong.com';
  // let imageURITitle = route.params.posttitle;
  const share = async (customOptions = options) => {
    try {
      await Share.open(customOptions);
    } catch (err) {
      //console.log(err);
    }
  };

  return (
    <ScrollView>
      <View style={globalstyles.BodyMainOutCon}>
        
            {/* <Text>{route.params.postmetatitle}</Text> */}
            <ViewShot
              ref={ViewShotRef}
              options={{
                //fileName: 'Your-File-Name',
                format: 'jpg',
                quality: 1.0,
                result: 'base64',
              }}>
              <View  >
                {/* <Image  source={{uri: route.params.bibleversestext}}
                  style={globalstyles.SongDetailImage}
                /> */}
                 <View style={[globalstyles.QuoteListingMainCon, globalstyles.BorderGray]}>
                  <Text style={globalstyles.QuoteListingMainText}>
                     {mainData?.bibleversestext}  
                     {mainData?.verse}  
                     
                    {/*Number - {route.params.name}*/}
                  </Text>
                  <View style={globalstyles.QuoteListingVerseCon}>
                  <Text style={[globalstyles.HorScrollBoxConVersInfo, globalstyles.ColorDark]}>
                        {mainData?.biblebookname} - {mainData?.biblebookchapter} : {mainData?.bibleverseno}
                        {/* Language - {route.params.language} */}
                      </Text>
                    </View>
                </View>
              </View>
            </ViewShot>
           
        {/* <Button title="Home" onPress={() => navigation.navigate('Home')} /> */}
        <TouchableOpacity onPress={() => Linking.openURL(route.params.weburl)}>
        
        <Text style={{flex:1, display:'flex', textAlign:'right', marginTop:10, marginRight:70, fontWeight:'600'}}>
          For more <Icon name="ios-arrow-down-outline" style={{textAlign:'right', fontSize:20, color:'#333333', fontWeight:'600'}} />
        </Text>
        </TouchableOpacity>
        <View style={globalstyles.BtnConDetail1}>
          
          <TouchableOpacity  onPress={async () => { await share(); }}  >
          <Text style={globalstyles.BtnConDetailText}>
            <Icon
              name="ios-share-social-outline"
              style={globalstyles.BtnConDetailTextIcon}
            />
          </Text>
          </TouchableOpacity>
          {route.params.weburl ? (
            <>
            <TouchableOpacity onPress={() => Linking.openURL(route.params.weburl)}>
              <Text style={globalstyles.BtnConDetailText}>
                <Icon
                  name="ios-globe-outline"
                  style={globalstyles.BtnConDetailTextIcon}
                />
              </Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
            <TouchableOpacity onPress={() => Linking.openURL('https://www.mybiblesong.com/quotes')}>
              <Text style={globalstyles.BtnConDetailText}>
                <Icon
                  name="ios-globe-outline"
                  style={globalstyles.BtnConDetailTextIcon}
                  
                />
              </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
        <View style={globalstyles.Divider3}></View>
        <View style={globalstyles.BtnConDetail1}>
          <View style={(globalstyles.TextCenter, globalstyles.BtnLoadMoreOutCon)}>
            <Text
              style={[globalstyles.BtnLoadMoreInnText, globalstyles.TextCenter]}
              //onClick={showMoreItems}
              onPress={() => navigation.navigate('Verses')}>
              View All
            </Text>
          </View>
          <View style={(globalstyles.TextCenter, globalstyles.BtnLoadMoreOutCon)}>
            <Text
              style={[globalstyles.BtnLoadMoreInnText, globalstyles.TextCenter]}
              //onClick={showMoreItems}
              onPress={() => navigation.navigate('Home')}>
              Go Home
            </Text>
          </View>
        </View>
        
        <View style={globalstyles.Divider3}></View>
        
      </View>
    </ScrollView>
  );
}

export default Quotesdownload;
