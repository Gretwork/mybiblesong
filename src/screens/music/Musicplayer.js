import React, { useState,useEffect, useCallback, useRef } from 'react';
import {  Button,  VirtualizedList, SafeAreaView, View,  Text,  Image,  ScrollView,  TouchableOpacity} from 'react-native';
import {globalstyles} from '../../styles/GlobalStyles';
import firestore from '@react-native-firebase/firestore';
//import {BtnBackToHome} from '../../components/MediaExport';
import Loader from '../../components/Loader';
import Icon from 'react-native-vector-icons/Ionicons';
import { RadioButton } from 'react-native-paper';
import BtnRadioBtn from '../../components/BtnRadioButton';
import {useRoute} from '@react-navigation/native';


function Musicplayer ({props, navigation}) {
  const route = useRoute();
  const [languagechecked, setLanguagechecked] = React.useState('Hindi');
  const [loading, setLoading] = useState(false);
  const [pageloadlimit, setPageloadlimit] = useState(5);
  const [errors, setErrors] = useState(null);
  const [allLoaded, setAllLoaded] = useState(false);
  const [lastloded, setLastloded] = useState(null);
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  
  // Get post data
  const getAssets = async () => {
    const field = 'timestamp';
    const todaysDate = new Date();
    todaysDate.setUTCHours.toLocaleString();
    try {
      setLoading(true);
      const list = [];
      firestore()
        .collection('musicbook')
        .orderBy(field, 'desc')
        .limit(pageloadlimit)
        .where('songlanguage', '==', languagechecked)
        .where("timestamp", "<=", todaysDate)
        .get()
        .then(function (querySnapshot) {
          const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
          querySnapshot.forEach(function (doc) {
            list.push(doc.data());
          });
          //console.log('first data', list)
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
    const todaysDate = new Date();
    todaysDate.setUTCHours.toLocaleString();
    try {
      const list = [];
      firestore()
        .collection('musicbook')
        .orderBy(field, 'desc')
        .limit(pageloadlimit)
        .where('songlanguage', '==', languagechecked)
        .where("timestamp", "<=", todaysDate)
        .startAfter(lastloded[field])
        .get()
        .then(function (querySnapshot) {
          const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
          querySnapshot.forEach(function (doc) {
            list.push(doc.data());
          });
          if (list.length < 1 ) {
            setAllLoaded(true);
          }
          //console.log('333 list', list.length);
          //console.log('2 data', list)
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

  const [isRefreshing, setIsRefreshing] = useState(false)

  const onRefresh = () => {
    //set isRefreshing to true
    //setLoading(true);
    getAssets();
    // and set isRefreshing to false at the end of your callApiMethod()
}
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
        <View style={globalstyles.Divider10}></View>
        <View style={globalstyles.Divider10}></View>
        </>
      )}
    </>
  );

 

  return (
    <>
     <SafeAreaView 
      //style={[globalstyles.BodyMainOutCon,]}
      style={[globalstyles.BodyMainOutCon, globalstyles.SafeareaBodyCon]}
      //style={{ paddingBottom: Platform.OS === 'android' ? 120 : 110 }}
      >
        <RadioButton.Group
          onValueChange={newValue => setLanguagechecked(newValue)}
          value={languagechecked}>
          <View style={globalstyles.FilterRadiolblCon}>
            <ScrollView horizontal>
              <BtnRadioBtn labelTitle="English" labelLanguage="English" />
              <BtnRadioBtn labelTitle="ગુજરાતી" labelLanguage="Gujarati" />
              <BtnRadioBtn labelTitle="हिन्दी" labelLanguage="Hindi" labelStatus="checked"  />
              <BtnRadioBtn labelTitle="मराठी" labelLanguage="Marathi" />
              <BtnRadioBtn labelTitle="Español" labelLanguage="Spanish" />
            </ScrollView>
          </View>
        </RadioButton.Group>
         
        {!loading ? (
          <VirtualizedList
            data={filteredDataSource}
            initialNumToRender={pageloadlimit}
            ListEmptyComponent={EmptyList}
            onRefresh={onRefresh}
            refreshing={isRefreshing}
            onEndReached={getAssetsMore}
            onEndReachedThreshold={0}
            keyExtractor={item => item.key}
            getItemCount={data => data.length}
            ListFooterComponent={FooterList}
            getItem={getItem}
            renderItem={({item}) => (
              <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('VideoPlayer', {
                      id: item.songdata.id,
                      posttitle: item.songdata.posttitle,
                      videolink: item.songdata.videolink,
                      audiolink: item.songdata.audiolink,
                      songImgUrl: item.songdata.songImgUrl,
                      weburl: item.songdata.weburl,
                      postmetatitle: item.songdata.postmetatitle,
                    })
                  }>
                  <View style={globalstyles.HorScrollMainCon}>
                    <View key={item.songdata.id}>
                      <View style={globalstyles.HorScrollBoxCon}>
                        {item.songdata.songImgUrl ? (
                          <>
                            <View  style={
                                  (globalstyles.WebviewYouTubeSmallCon)
                                }>
                            <Image source={{uri: item.songdata.songImgUrl}}
                                style={(globalstyles.WebviewYouTubeSmall)}
                            />
                           {/* <ImageZoom source={{uri: item.songdata.songImgUrl}}
                           minScale={0.5}
                           maxScale={3}
                           renderLoader={() => <CustomLoader />}
                           style={(globalstyles.WebviewYouTubeSmall)}
                           resizeMode="cover"
                           /> */}
                            </View>
                          </>
                        ) : (
                          null
                        )}
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
            <View style={globalstyles.Divider5}></View>
          </>
        )}
       <View style={globalstyles.Divider5}></View>
      </SafeAreaView>
      
    </>
  );
}

export default Musicplayer;
// ... other code from the previous section

