import React, {useState, useEffect} from 'react';
import {  Button,  VirtualizedList, SafeAreaView, View,  Text,  Image,  ScrollView,  TouchableOpacity} from 'react-native';
import {globalstyles} from '../../styles/GlobalStyles';
import firestore from '@react-native-firebase/firestore';
import {BtnBackToHome} from '../../components/MediaExport';
import Loader from '../../components/Loader';
import Icon from 'react-native-vector-icons/Ionicons';
import { RadioButton } from 'react-native-paper';
import BtnRadioBtn from '../../components/BtnRadioButton';
import {useRoute} from '@react-navigation/native';
//import { ImageZoom } from '@likashefqet/react-native-image-zoom';
import ImageZoomEffect from '../../components/ImageZoomEffect';
import defaultimage from '../../assets/demoimg.png';

function Sociallisting({props, navigation}) {
  const route = useRoute();
  const [languagechecked, setLanguagechecked] = React.useState('English');
  const [loading, setLoading] = useState(false);
  const [pageloadlimit, setPageloadlimit] = useState(3);
  const [errors, setErrors] = useState(null);
  const [allLoaded, setAllLoaded] = useState(false);
  const [lastloded, setLastloded] = useState(null);
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  // Get post data
  const getAssets = async () => {
    const field = 'timestamp';
    const todaysDate = new Date();
    todaysDate.setUTCHours.toLocaleString();
    try {
      setLoading(true);
      const list = [];
      firestore()
        //firestore()
        //.collection("biblequotes").orderBy('timestamp', 'desc')
        .collection('biblequotes')
        .orderBy(field, 'desc')
        .where('language', '==', languagechecked)
        .limit(pageloadlimit)
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
        .collection('biblequotes')
        .orderBy(field, 'desc')
        .limit(pageloadlimit)
        .where('language', '==', languagechecked)
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

  useEffect(() => {
    setLoading(true);
    setAllLoaded(false);
    getAssets();
  }, [languagechecked]);

  const [isRefreshing, setIsRefreshing] = useState(false)

  const onRefresh = () => {
    //set isRefreshing to true
    getAssets();
    // and set isRefreshing to false at the end of your callApiMethod()
  }

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
      style={[globalstyles.BodyMainOutCon, globalstyles.SafeareaBodyCon]}
      //style={{ paddingBottom: Platform.OS === 'android' ? 120 : 110 }}
      >
        <RadioButton.Group
          onValueChange={newValue => setLanguagechecked(newValue)}
          value={languagechecked}>
          <View style={globalstyles.FilterRadiolblCon}>
            <ScrollView horizontal>
              <BtnRadioBtn labelTitle="English" labelLanguage="English" labelStatus="checked"/>
              <BtnRadioBtn labelTitle="ગુજરાતી" labelLanguage="Gujarati" />
              <BtnRadioBtn labelTitle="हिन्दी" labelLanguage="Hindi" />
              <BtnRadioBtn labelTitle="मराठी" labelLanguage="Marathi" />
              <BtnRadioBtn labelTitle="Español" labelLanguage="Spanish" />
            </ScrollView>
          </View>
        </RadioButton.Group>
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
            onRefresh={onRefresh}
            refreshing={isRefreshing}
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
                      songImgUrl: item.songdata.biblequotesimage,
                      weburl: item.songdata.weburl,
                      postmetatitle: item.songdata.postmetatitle,
                    })
                  }>
                  <View style={globalstyles.HorScrollMainCon}>
                    <View key={item.songdata.id}>
                      <View style={globalstyles.HorScrollBoxCon}>
                        {item.songdata.biblequotesimage ? (
                          <>
                            <View style={globalstyles.HorSpaceLeft15}>
                             {/*  <Image
                              //   source={{uri: item.songdata.biblequotesimage}}
                              //   style={
                              //     (globalstyles.HorScrollBoxBibleVersImgInn,
                              //     globalstyles.ImageBottomBorderNone)
                              //   }
                              // />*/}
                             {loading ? 
                            
                              <Image
                                source={defaultimage}
                                styleclass={(globalstyles.HorScrollBoxBibleVersImgInn, globalstyles.ImageBottomBorderNone)}
                              />
                            
                              :
                              <ImageZoomEffect   imgurl={{uri: item.songdata.biblequotesimage}}  
                              styleclass={(globalstyles.HorScrollBoxBibleVersImgInn, globalstyles.ImageBottomBorderNone)} 
                              //onLoad={handleImageLoad}
                              
                              />
                            }
                              

                              {/* <Text style={( globalstyles.Downloadimgbtn)}>Download</Text> */}
                              <View style={globalstyles.Downloadimgbtn}>
                                <View style={globalstyles.BtnConDetail1}>
                                  <Text style={globalstyles.BtnConDetailText}>
                                    <Icon
                                      name="ios-download-outline"
                                      style={
                                        globalstyles.BtnConDetailTextIconWhite
                                      }
                                    />
                                  </Text>

                                  <Text style={globalstyles.BtnConDetailText}>
                                    <Icon
                                      name="ios-share-social-outline"
                                      style={
                                        globalstyles.BtnConDetailTextIconWhite
                                      }
                                    />
                                  </Text>

                                  <Text style={globalstyles.BtnConDetailText}>
                                    <Icon
                                      name="ios-globe-outline"
                                      style={
                                        globalstyles.BtnConDetailTextIconWhite
                                      }
                                    />
                                  </Text>
                                </View>
                              </View>
                            </View>
                          </>
                        ) : (
                          <>
                            <View style={globalstyles.Divider1}></View>
                            <Loader />
                          </>
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
       <View style={globalstyles.Divider5}></View>
      </SafeAreaView>
      
    </>
  );
}

export default Sociallisting;
// ... other code from the previous section
