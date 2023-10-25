import React, {Component, useRef, useState} from 'react';
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
import {useRoute} from '@react-navigation/native';
//import RenderHtml from 'react-native-render-html';
import {globalstyles} from '../../styles/GlobalStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
//import RNFetchBlob from 'rn-fetch-blob';
import RNFS from 'react-native-fs';

function SongDetail({props, navigation, onPress}) {
   
  const route = useRoute();
  const ViewShotRef = useRef();
  const [extrathings, setExtrathings] = useState(true);
  let imageId = route.params.id;
  let imageURI = route.params.songImgUrl;
  let imageURIMessage =
    'Download MyBibleSong App or Visit our Website www.mybiblesong.com';
  let imageURITitle = route.params.posttitle;
  
  async function captureViewShot(url, id, imageURI, imageId) {
    const path = `${RNFS.DocumentDirectoryPath}/${imageId}.jpg`;
    await RNFS.downloadFile({ fromUrl: imageURI, toFile: `file://${path}` }).promise
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err;
        });
    RNFS.readFile(`file://${path}`, 'base64').then((res) => {
        let shareOptionsUrl = {
            title: 'My Bible Song',
            message: 'Share MyBibleSong App with others',
            url: `data:image/jpeg;base64,${res}`, // use image/jpeg instead of image/jpg
            subject: 'Download MyBibleSong App or Visit our Website www.mybiblesong.com'
        };
        Share.open(shareOptionsUrl);
    })
  }

  

  return (
    <ScrollView>
       
 
      <View style={globalstyles.BodyMainOutCon}>
        <Text>{imageURI}</Text>
        {route.params.songImgUrl ? (
          <>
            {/* <Text>{route.params.postmetatitle}</Text> */}
            <ViewShot
              ref={ViewShotRef}
              options={{
                //fileName: 'Your-File-Name',
                format: 'jpg',
                quality: 1.0,
                result: 'base64',
              }}>
              <View style={globalstyles.SongDetailImageCon}>
                <Image
                  source={{uri: route.params.songImgUrl}}
                  //style={{ width:'96%', minHeight:400 }}
                  //resizeMode="contain"
                  style={globalstyles.SongDetailImage}
                />
              </View>
            </ViewShot>
          </>
        ) : null}
        {/* <Button title="Home" onPress={() => navigation.navigate('Songtab')} /> */}
        <TouchableOpacity onPress={() => Linking.openURL(route.params.weburl)}>
        
        <Text style={{flex:1, display:'flex', textAlign:'right', marginTop:10, marginRight:50, fontWeight:'600'}}>
          For English <Icon name="ios-arrow-down-outline" style={{textAlign:'right', fontSize:20, color:'#333333', fontWeight:'600'}} />
        </Text>
        </TouchableOpacity>
        <View style={globalstyles.BtnConDetail1}>
          {/* <Text style={globalstyles.BtnConDetailText}>
            <Icon
              name="ios-heart-outline"
              style={globalstyles.BtnConDetailTextIcon}
            />
            <Icon name="ios-heart" style={globalstyles.BtnConDetailTextIcon} />
          </Text> */}
          
          {/* <TouchableOpacity onPress={downloadImage}> */}
          <TouchableOpacity >
          <Text style={globalstyles.BtnConDetailText}>
            <Icon
              name="ios-download-outline"
              style={globalstyles.BtnConDetailTextIcon}
            />
          </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={captureViewShot}>
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
            <TouchableOpacity onPress={() => Linking.openURL('https://www.mybiblesong.com/home')}>
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
        <View style={globalstyles.Divider1}></View>
        <View style={(globalstyles.TextCenter, globalstyles.BtnLoadMoreOutCon)}>
          <Text
            style={globalstyles.BtnLoadMoreInnText}
            //onClick={showMoreItems}
            onPress={() => navigation.navigate('Songtab')}>
            Back to Home ...
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

export default SongDetail;
