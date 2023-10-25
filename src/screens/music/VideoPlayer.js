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
import RNFetchBlob from 'rn-fetch-blob';
import {WebView} from 'react-native-webview';


function VideoPlayer({props, navigation, onPress}) {
  const route = useRoute();
  const ViewShotRef = useRef();
  const [extrathings, setExtrathings] = useState(true);

  let imageURI = route.params.songImgUrl;
  let imageURIMessage =
    'Download MyBibleSong App or Visit our Website www.mybiblesong.com';
  let imageURITitle = route.params.posttitle;
    
const url = " - Visit - www.mybiblesong.com";
const titletext = " - www.mybiblesong.com";
const message = "Subscribe and Share - https://www.youtube.com/@mybiblesong";
const options = {
  titletext,
  url,
  message,
};

  // let imageURI = route.params.songImgUrl;
  // let imageURIMessage =
  //   'Download MyBibleSong App or Visit our Website www.mybiblesong.com';
  // let imageURITitle = route.params.posttitle;
  const sharethis = async (customOptions = options) => {
    try {
      await Share.open(customOptions);
    
    } catch (err) {
      //console.log(err);
    }
     
  };

  return (
    <ScrollView>
       
 
      <View style={globalstyles.BodyMainOutCon}>
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
                {/* <Image
                  source={{uri: route.params.songImgUrl}}
                  //style={{ width:'96%', minHeight:400 }}
                  //resizeMode="contain"
                  style={globalstyles.SongDetailImage}
                /> */}
                <WebView
            javaScriptEnabled={true}
            domStorageEnabled={true}
            source={{uri: route.params.videolink}}
            //style={globalstyles.WebviewVideoHor1} videolink
            style={globalstyles.SongDetailImage}
          />
              </View>
            </ViewShot>
          </>
        ) : null}
        {/* <Button title="Home" onPress={() => navigation.navigate('Songtab')} /> */}
        <View style={globalstyles.Divider1}></View>
        <TouchableOpacity onPress={() => Linking.openURL(route.params.weburl)}>
        
        <Text style={{flex:1, display:'flex', textAlign:'right', marginTop:10, marginRight:55, fontWeight:'600'}}>
        <Icon name="ios-arrow-down-outline" style={{textAlign:'right', fontSize:20, color:'#333333', fontWeight:'600'}} /> Subscribe our Channel, Visit Website <Icon name="ios-arrow-down-outline" style={{textAlign:'right', fontSize:20, color:'#333333', fontWeight:'600'}} />
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
          
          <TouchableOpacity 
          //</View>onPress={downloadImage}
          onPress={() => Linking.openURL('vnd.youtube://@mybiblesong').then(supported => {
            if (supported) {
               return Linking.openURL('vnd.youtube://@mybiblesong');
            } else {
               return Linking.openURL('https://www.youtube.com/@mybiblesong');
            }
         })}
          >
          <Text style={globalstyles.BtnConDetailText}>
            <Icon
              name="ios-logo-youtube"
              style={[globalstyles.BtnConDetailTextIcon,globalstyles.ColorRed]}
            />
          </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={async () => { await sharethis(); }}>
          <Text style={globalstyles.BtnConDetailText}>
            <Icon
              name="ios-share-social-outline"
              style={[globalstyles.BtnConDetailTextIcon,globalstyles.ColorRed]}
            />
          </Text>
          </TouchableOpacity>
          {route.params.weburl ? (
            <>
            <TouchableOpacity onPress={() => Linking.openURL(route.params.weburl)}>
              <Text style={globalstyles.BtnConDetailText}>
                <Icon
                  name="ios-globe-outline"
                  style={[globalstyles.BtnConDetailTextIcon,globalstyles.ColorRed]}
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

export default VideoPlayer;
