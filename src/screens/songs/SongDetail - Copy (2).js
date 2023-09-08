import React, {Component, useRef, useState} from 'react';
import {
  Button,
  View,
  Text,
  Image,
  Share,
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

import RNFetchBlob from 'rn-fetch-blob';

function SongDetail({props, navigation, onPress}) {
  const route = useRoute();

  const ViewShotRef = useRef();
  const [extrathings, setExtrathings] = useState(true);

  async function captureViewShot() {
    setExtrathings(false);
    const imageURI = await ViewShotRef.current.capture();
    setExtrathings(true);
    Share.share({title: 'Image', url: imageURI});
  }

  let dirs = RNFetchBlob.fs.dirs;
  async function downloadImage() {
    let date = new date();
    let image_url = route.params.songImgUrl;
    RNFetchBlob.config({
      // response data will be saved to this path if it has access right.
      path: dirs.DocumentDir + '/richi',
    })
      .fetch('GET', image_url, {
        //some headers ..
      })
      .then(res => {
        // the path should be dirs.DocumentDir + 'path-to-file.anything'
        //console.log('The file saved to ', res.path());
      });
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
                fileName: 'Your-File-Name',
                format: 'jpg',
                quality: 1.0,
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
        {/* <Button title="Home" onPress={() => navigation.navigate('Home')} /> */}
        <View style={(globalstyles.TextCenter, globalstyles.BtnLoadMoreOutCon)}>
          <Text
            style={globalstyles.BtnLoadMoreInnText}
            //onClick={showMoreItems}
            onPress={() => navigation.navigate('Home')}>
            Go to Home ...
          </Text>
        </View>
        <TouchableOpacity style={globalstyles.BtnConDetail1}>
          <Text style={globalstyles.BtnConDetailText}>
            <Icon
              name="ios-heart-outline"
              style={globalstyles.BtnConDetailTextIcon}
            />
            <Icon name="ios-heart" style={globalstyles.BtnConDetailTextIcon} />
          </Text>
          <Text style={globalstyles.BtnConDetailText}>
            <Icon
              name="ios-download-outline"
              style={globalstyles.BtnConDetailTextIcon}
              onPress={downloadImage}
            />
            {/* <Icon name="ios-download"  style={globalstyles.BtnConDetailTextIcon} 
          onPress={captureViewShot} /> */}
          </Text>
          <Text style={globalstyles.BtnConDetailText}>
            {/* <Icon name="ios-share-social" style={globalstyles.BtnConDetailTextIcon} /> */}
            <Icon
              name="ios-share-social-outline"
              style={globalstyles.BtnConDetailTextIcon}
              onPress={captureViewShot}
            />
          </Text>
          <Text style={globalstyles.BtnConDetailText}>
            <Icon
              name="ios-bookmark-outline"
              style={globalstyles.BtnConDetailTextIcon}
            />
            <Icon
              name="ios-bookmark"
              style={globalstyles.BtnConDetailTextIcon}
            />
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default SongDetail;
