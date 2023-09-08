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
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
//import RenderHtml from 'react-native-render-html';
import {globalstyles} from '../../styles/GlobalStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob';
import ImageZoomEffect from '../../components/ImageZoomEffect';

function Socialdownload({props, navigation, onPress}) {
  const route = useRoute();
  const ViewShotRef = useRef();
  const [extrathings, setExtrathings] = useState(true);

  let imageURI = route.params.songImgUrl;
  let imageURIMessage =
    'Download MyBibleSong App or Visit our Website www.mybiblesong.com';
  let imageURITitle = route.params.posttitle;
  function captureViewShot() {
    
    //setExtrathings(false);
    //setExtrathings(true);
    let imagePath = null;
    RNFetchBlob.config({
      fileCache: true,
    })
      .fetch('GET', imageURI)
      // the image is now dowloaded to device's storage
      .then(resp => {
        // the image path you can use it directly with Image component
        imagePath = resp.path();
        return resp.readFile('base64');
      })
      .then(async base64Data => {
        var base64Data = `data:image/png;base64,` + base64Data;
        // here's base64 encoded image
        await Share.open({
          title: imageURITitle,
          message: imageURIMessage,
          url: base64Data,
        });
        // remove the file from storage
        return fs.unlink(imagePath);
      });
    //Share.open({title: 'Image', url: imageURI});
    //console.log('url is', imageURI)
  }

  let dirs = RNFetchBlob.fs.dirs;
  
  function downloadImage() {
    let date = new date();
    let image_url = route.params.songImgUrl;
    RNFetchBlob.config({
      // response data will be saved to this path if it has access right.
      //path: dirs.DocumentDir + '/mybiblesong',
      path: '/mybiblesong',
    })
      .fetch('GET', image_url, {
        //some headers ..
      })
      .then(res => {
        // the path should be dirs.DocumentDir + 'path-to-file.anything'
        //console.log('The file saved to ', res.path());
      });
  }

  let imgUrl = route.params.songImgUrl;
  let imgDesc = route.params.posttitle;
  let newImgUri = imgUrl.lastIndexOf('/');
  let imageName = imgUrl.substring(newImgUri);

  //let dirs = RNFetchBlob.fs.dirs;
  let path =
    Platform.OS === 'ios'
      ? dirs['MainBundleDir'] + imageName
      : dirs.PictureDir + imageName;

  function downloadImage() {
    if (Platform.OS == 'android') {
      RNFetchBlob.config({
        fileCache: true,
        appendExt: 'png',
        indicator: true,
        IOSBackgroundTask: true,
        path: path,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path: path,
          description: imgDesc,
        },
      })
        .fetch('GET', imgUrl)
        .then(res => {
          //console.log(res, 'end downloaded')
        });
    } else {
      CameraRoll.save(imgUrl);
    }
  }

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
               
                {/* <ImageZoom source={{uri: route.params.songImgUrl}}
                    minScale={0.5} maxScale={3} renderLoader={() => <CustomLoader />}
                    style={globalstyles.SongDetailImage}
                    resizeMode="cover" /> */}
                <ImageZoomEffect   imgurl={{uri: route.params.songImgUrl}}  styleclass={globalstyles.SongDetailImage} />
              </View>
            </ViewShot>
          </>
        ) : null}
        {/* <Button title="Home" onPress={() => navigation.navigate('Home')} /> */}
        <TouchableOpacity onPress={() => Linking.openURL(route.params.weburl)}>
        
        <Text style={{flex:1, display:'flex', textAlign:'right', marginTop:10, marginRight:50, fontWeight:'600'}}>
          For more <Icon name="ios-arrow-down-outline" style={{textAlign:'right', fontSize:20, color:'#333333', fontWeight:'600'}} />
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
          
          <TouchableOpacity onPress={downloadImage}>
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
            onPress={() => navigation.navigate('Home')}>
            Back to Home ...
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

export default Socialdownload;
