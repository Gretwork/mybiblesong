import React, {useState, useEffect} from 'react';
import { Button,
  View,
  Text,
  Linking,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  VirtualizedList,
} from 'react-native';
import {globalstyles} from '../../styles/GlobalStyles';
import firestore from '@react-native-firebase/firestore';
//import {BtnBackToHome, BtnComingSoon} from '../../components/MediaExport';
import {useRoute} from '@react-navigation/native';
import Loader from '../../components/Loader';
import Icon from 'react-native-vector-icons/Ionicons';
import Share from 'react-native-share';

//import ViewShot from 'react-native-view-shot';
//import Share from 'react-native-share';
//import RNFetchBlob from 'rn-fetch-blob';
import {RadioButton} from 'react-native-paper';
import BtnRadioBtn from '../../components/BtnRadioButton';



function Quoteslisting({props, navigation, onPress}) {
  const route = useRoute();
  const [languagechecked, setLanguagechecked] = React.useState('English');
  const [loading, setLoading] = useState(false);
  const [pageloadlimit, setPageloadlimit] = useState(3);
  const [errors, setErrors] = useState(null);
  const [allLoaded, setAllLoaded] = useState(false);
  const [lastloded, setLastloded] = useState(null);
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  
  // Get post data
  const getAssets = async () => {
    const field = 'timestamp';
    try {
      setLoading(true);
      const list = [];
      firestore()
        .collection('bibleverses')
        .orderBy(field, 'desc')
        .where('language', '==', languagechecked)
        .limit(pageloadlimit)
        .get()
        .then(function (querySnapshot) {
          const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
          querySnapshot.forEach(function (doc) {
            list.push(doc.data());
          });
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
        .collection('bibleverses')
        .orderBy(field, 'desc')
        .where('language', '==', languagechecked)
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
          //console.log('333 list', list.length);
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

const [versesdata, setVersesdata] = useState([null]);

const versesdatafun = () => { 
  //setVersesdata(item)   
  // if (versesdata != null) {
  //   sharethis()
  // } 
  setTimeout(() => sharethis(), 1000);
};


const url = " - www.mybiblesong.com";
const titletext = " - www.mybiblesong.com";

const verse = versesdata? versesdata.bibleversestext : null;
const book = versesdata? versesdata.biblebookname : null;
const bookchap = versesdata? versesdata.biblebookchapter : null;
const chapno = versesdata? versesdata.bibleverseno : null;


const messagedata = '"'+ verse + '" ' + ' - ' + book +' - '+ bookchap +' : ' + chapno;
const message = verse ? messagedata : null;
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
    setVersesdata()
  };

  useEffect(() => {
    // 👇️ Check if NOT undefined or null
    if (versesdata !== undefined && versesdata !== null) {
      //console.log('✅ variable is NOT undefined or null');
      
    }
  
    // 👇️ Check if undefined or null
    if (verse === undefined || verse === null) {
      //console.log('✅ variable is undefined or null');
      return;
    } else {
      //console.log('⛔️ variable is NOT undefined or null');
      sharethis()
    }
  }, [versesdata]);
  
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
        {/* {loading ? <Loader /> : null } */}
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
              // <TouchableOpacity
              //   onPress={() =>
              //     navigation.navigate('Quotesdownload', {
              //       id: item.songdata.id,
              //       bibleverseno: item.songdata.bibleverseno,
              //       biblebookchapter: item.songdata.biblebookchapter,
              //       biblebookname: item.songdata.biblebookname,
              //       songImgUrl: item.songdata.songImgUrl,
              //       weburl: item.songdata.weburl,
              //       bibleversestext: item.songdata.bibleversestext,
              //     })
              //   }>
              <View
                key={item.songdata.id}
                style={[globalstyles.HorScrollMainCon]}>
                <View style={[globalstyles.QuoteListingMainCon, globalstyles.BorderGray]}>
                  <Text style={globalstyles.QuoteListingMainText}>
                     {item.songdata.bibleversestext} 
                  </Text>
                  <View style={globalstyles.QuoteListingVerseCon}>
                      <Text style={[globalstyles.HorScrollBoxConVersInfo, globalstyles.ColorDark]}>
                        {item.songdata.biblebookname} - {item.songdata.biblebookchapter} : {item.songdata.bibleverseno}
                      </Text>
                    </View>
                </View>
                <View style={[globalstyles.DownloadimgbtnSmall,globalstyles.BorderGray, globalstyles.DownloadimgbtnColor]}>
                  <View style={[globalstyles.BtnConDetail1, globalstyles.BtnConDetailSmall]}>
                    {/* <Text style={globalstyles.BtnConDetailText}>
                      <Icon
                        name="ios-download-outline"
                        style={[globalstyles.BtnConDetailTextIcon, globalstyles.ColorRed, globalstyles.BtnIconSmall]}
                      />
                    </Text> */}
                    
                    <Text style={globalstyles.BtnConDetailText} onPress={async () => {
                        //setVersesdata(item.songdata),   await sharethis();
                        setVersesdata(item.songdata)
                        //versesdatafun()
                    }} 
                    >
                      <Icon
                        name="ios-share-social-outline"
                        style={[globalstyles.BtnConDetailTextIcon, globalstyles.ColorRed, globalstyles.BtnIconSmall]}
                      />
                    </Text>
                    <TouchableOpacity onPress={() => Linking.openURL('https://www.mybiblesong.com/quotes')}>
                    <Text style={globalstyles.BtnConDetailText}>
                      <Icon
                        name="ios-globe-outline"
                        style={[globalstyles.BtnConDetailTextIcon, globalstyles.ColorRed, globalstyles.BtnIconSmall]}
                      />
                    </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            // </TouchableOpacity>
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

export default Quoteslisting;
// ... other code from the previous section
