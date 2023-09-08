import React, {Component, useEffect, useContext, useState} from 'react';
import {WebView} from 'react-native-webview';
import {BtnBackToHome, BtnComingSoon} from '../../components/MediaExport'
import { Button,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  VirtualizedList,
} from 'react-native';
import {globalstyles} from '../../styles/GlobalStyles';
import firestore from '@react-native-firebase/firestore';
import {useRoute} from '@react-navigation/native';
import Loader from '../../components/Loader';
import Icon from 'react-native-vector-icons/Ionicons';
import {RadioButton} from 'react-native-paper';
import BtnRadioBtn from '../../components/BtnRadioButton';

const Musicplayer = ({props, navigation, buttonTitle, ...rest}) => {
  const route = useRoute();
  const [languagechecked, setLanguagechecked] = React.useState('');
  const [loading, setLoading] = useState(false);
  const [pageloadlimit, setPageloadlimit] = useState(4);
  const [errors, setErrors] = useState(null);
  const [allLoaded, setAllLoaded] = useState(false);
  const [lastloded, setLastloded] = useState(null);
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  
  // Get post data
  const getAssets = async () => {
    const field = 'timestamp';
    try {
      setLoading(false);
      const list = [];
      firestore()
      .collection("songbooks")
      .where("videolink", "not-in", [""])
        //.orderBy(field, 'asc')
        //.where('songlanguage', '==', languagechecked)
        
        .limit(pageloadlimit)
        .get()
        .then(function (querySnapshot) {
          const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
          querySnapshot.forEach(function (doc) {
            list.push(doc.data());
          });
          //console.log('first', list.length);
          setFilteredDataSource(list);
          setLastloded(lastVisible.data());
          setLoading(false);
        });
    } catch (error) {
      setErrors('Failed To Load Data, Please try after some time...');
      setLoading(false);
    }
  };

  const getAssetsMore = async () => {
    const field = 'timestamp';
    //console.log('222 Number', lastloded);
    try {
      const list = [];
      firestore()
      .collection("songbooks")
      .where("videolink", "not-in", [""])
        //.orderBy(field, 'asc')
        //.where('songlanguage', '==', languagechecked)
        //.where('videolink', '!==', null)
        .startAfter(lastloded[field])
        .limit(pageloadlimit)
        .get()
        .then(function (querySnapshot) {
          const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
          querySnapshot.forEach(function (doc) {
            list.push(doc.data());
          });
          if (list.length < 1 ) {
            setAllLoaded(true);
          }
          //('333 list', list.length);
          setLastloded(lastVisible.data());
          setFilteredDataSource([...filteredDataSource, ...list]);
          setLoading(false);
        });
    } catch (error) {
      setErrors('Failed To Load Data, Please try after some time...');
      setLoading(false);
      //console.log('more some errors is', error);
    }
  };

  useEffect(() => {
    setLoading(true);
    setAllLoaded(false);
    getAssets();
  }, [languagechecked]);

  const DATA = [];

  const getItem = (data, index) => ({
    songdata: filteredDataSource[index],
    id: Math.random().toString(12).substring(0),
  });

  const EmptyList = () => (
    <>
      {/* <Text style={globalstyles.SongsListTitleNoDataText}>Loading...</Text> */}
      <View style={globalstyles.Divider1}></View>
      {loading ? <Loader /> : <Text>{errors}</Text>}
    </>
  );
  const FooterList = () => (
    <>
      {allLoaded == true ? (
        <>
          <Text style={globalstyles.SongsListTitleNoDataText}>
            That's all, for now, many more are coming soon.
          </Text>
          <View style={globalstyles.Divider5}></View>
        </>
      ) : (
        <>
        <View style={globalstyles.Divider2}></View>
        <Loader />
        </>
      )}
    </>
  );

  useEffect(() => {
    setTimeout(() => setLoading(true), 3000);
  }, []);


  return (
    <>
      <SafeAreaView 
      style={[globalstyles.BodyMainOutCon, globalstyles.SafeareaBodyCon]}
      //style={{ paddingBottom: Platform.OS === 'android' ? 120 : 110 }}
      >
        {/* <RadioButton.Group
          onValueChange={newValue => setLanguagechecked(newValue)}
          value={languagechecked}>
          <View style={globalstyles.FilterRadiolblCon}>
            <ScrollView horizontal>
              <BtnRadioBtn labelTitle="English" labelLanguage="English" />
              <BtnRadioBtn labelTitle="ગુજરાતી" labelLanguage="Gujarati" labelStatus="checked"/>
              <BtnRadioBtn labelTitle="हिन्दी" labelLanguage="Hindi" />
              <BtnRadioBtn labelTitle="मराठी" labelLanguage="Marathi" />
              <BtnRadioBtn labelTitle="Español" labelLanguage="Spanish" />
            </ScrollView>
          </View>
        </RadioButton.Group> */}
        {/* <View>
          <Text>New btn checking - {languagechecked}</Text>
        </View> */}
        {!loading ? (
          <VirtualizedList
          data={filteredDataSource}
          initialNumToRender={pageloadlimit}
          ListEmptyComponent={EmptyList}
          onEndReached={getAssetsMore}
          onEndReachedThreshold={0}
          keyExtractor={item => item.key}
          getItemCount={data => data.length}
          ListFooterComponent={FooterList}
          getItem={getItem}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Socialdownload', {
                  id: item.songdata.id,
                  posttitle: item.songdata.posttitle,
                  videolink: item.songdata.videolink,
                  audiolink: item.songdata.audiolink,
                  songImgUrl: item.songdata.songImgUrl,
                  weburl: item.songdata.weburl,
                  postmetatitle: item.songdata.postmetatitle,
                })
              }>
            
            <View
              key={item.songdata.key}
              style={[globalstyles.HorScrollMainCon]}>
              <View style={globalstyles.SongsListDataRowCon}>
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
              
              <View>
                <Text> {item.songdata.videolink}</Text>
              </View>
              <View style={globalstyles.Divider5}></View>
              <View style={[globalstyles.DownloadimgbtnSmall,globalstyles.BorderGray, globalstyles.DownloadimgbtnColor]}>
                <View style={[globalstyles.BtnConDetail1, globalstyles.BtnConDetailSmall]}>
                  <Text style={globalstyles.BtnConDetailText}>
                    <Icon
                      name="ios-logo-youtube"
                      style={[globalstyles.BtnConDetailTextIcon, globalstyles.ColorRed, globalstyles.BtnIconSmall]}
                    />
                  </Text>

                  <Text style={globalstyles.BtnConDetailText}>
                    <Icon
                      name="ios-share-social-outline"
                      style={[globalstyles.BtnConDetailTextIcon, globalstyles.ColorRed, globalstyles.BtnIconSmall]}
                    />
                  </Text>

                  <Text style={globalstyles.BtnConDetailText}>
                    <Icon
                      name="ios-globe-outline"
                      style={[globalstyles.BtnConDetailTextIcon, globalstyles.ColorRed, globalstyles.BtnIconSmall]}
                    />
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
          )}
        />
        ) : (
          <>
            <View style={globalstyles.Divider5}></View>
            <Loader />
          </>
        )}
        <View style={globalstyles.Divider1}></View>
        {/* <BtnComingSoon />
      <View style={globalstyles.Divider1}></View>
      <BtnBackToHome
        buttonTitle="Send your Testimony"
        onPress={() => navigation.navigate('Testimony')}
      />
      <View style={globalstyles.Divider1}></View>
      <BtnBackToHome
        buttonTitle="Send your Suggestion"
        onPress={() => navigation.navigate('Contact')}
      /> */}
      
      </SafeAreaView>
      
    </>
  );
};

export default Musicplayer;
