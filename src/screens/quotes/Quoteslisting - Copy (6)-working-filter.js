import React, {useState, useEffect} from 'react';
import {
  Button,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  VirtualizedList,
} from 'react-native';
import {globalstyles} from '../../styles/GlobalStyles';
import firestore from '@react-native-firebase/firestore';
//import { startAt } from 'firebase/firestore';
//import { collection, query, orderBy, startAfter, limit, getDocs } from "firebase/firestore";
//import {BtnBackToHome, BtnComingSoon} from '../../components/MediaExport';
import {useRoute} from '@react-navigation/native';
import Loader from '../../components/Loader';
import Icon from 'react-native-vector-icons/Ionicons';

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
  const [activity, setActivity] = useState([]);
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [filteredDataSourcemore, setFilteredDataSourcemore] = useState([]);

  

  // Get post data
  const getAssets = async () => {
    const field = 'timestamp';
    try {
      setLoading(true);
      const list = [];
      firestore()
        .collection('demodata')
        .orderBy(field, 'asc')
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
          console.log('111 list', list.length, '111 number ', lastVisible.data());
          setLoading(false);
        });
    } catch (error) {
      setErrors('Failed To Load Data, Please try after some time...');
      setLoading(false);
      console.log('some errors is', error);
    }
  };

  const getAssetsMore = async () => {
    const field = 'timestamp';
    console.log('222 Number', lastloded);
    try {
      const list = [];
      firestore()
        .collection('demodata')
        .orderBy(field, 'asc')
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
          console.log('333 list', list.length);
          setLastloded(lastVisible.data());
          setFilteredDataSource([...filteredDataSource, ...list]);
          console.log(
            '77777 ',
            filteredDataSource,
            'with',
            filteredDataSource.length,
          );
          setLoading(false);
        });
    } catch (error) {
      setErrors('Failed To Load Data, Please try after some time...');
      setLoading(false);
      console.log('more some errors is', error);
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
  const HeaderList = () => (
    <>
      <View style={globalstyles.Divider1}></View>
      {loading ? <Loader /> : <Text>{errors}</Text>}
    </>
  );
  const FooterList = () => (
    <>
      <View style={globalstyles.Divider1}></View>
      {allLoaded == true ? (
        <>
          <View style={globalstyles.Divider1}></View>
          <Text style={globalstyles.SongsListTitleNoDataText}>
            That's all, for now, many more are coming soon.
          </Text>
          <View style={globalstyles.Divider1}></View>
        </>
      ) : (
        <Loader />
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
            //style={styles.container}
            onEndReached={getAssetsMore}
            onEndReachedThreshold={0}
            keyExtractor={item => item.key}
            getItemCount={data => data.length}
            //scrollEventThrottle={150}
            //ItemSeparatorComponent={EmptyList}
            //ListHeaderComponent={}
            ListFooterComponent={FooterList}
            //onResponderEnd={FooterListNo}
            getItem={getItem}
            renderItem={({item}) => (
              // <TouchableOpacity
              //   onPress={() =>
              //     navigation.navigate('Socialdownload', {
              //       id: item.songdata.id,
              //       posttitle: item.songdata.posttitle,
              //       videolink: item.songdata.videolink,
              //       audiolink: item.songdata.audiolink,
              //       songImgUrl: item.songdata.songImgUrl,
              //       weburl: item.songdata.weburl,
              //       postmetatitle: item.songdata.postmetatitle,
              //     })
              //   }>
              <View
                key={item.songdata.key}
                style={globalstyles.HorScrollMainCon}>
                <View style={globalstyles.QuoteListingMainCon}>
                  <Text style={globalstyles.QuoteListingMainText}>
                    {/* {item.songdata.bibleversestext}  */}
                    Number - {item.songdata.name}
                  </Text>
                  <View style={globalstyles.QuoteListingVerseCon}>
                      <Text style={globalstyles.HorScrollBoxConVersInfo}>
                        {/* {item.songdata.biblebookname}-
                        {item.songdata.biblebookchapter}:
                        {item.songdata.bibleverseno} */}
                        Language - {item.songdata.language}
                      </Text>
                    </View>
                </View>
                <View style={globalstyles.DownloadimgbtnWhite}>
                  <View style={globalstyles.BtnConDetail1}>
                    <Text style={globalstyles.BtnConDetailText}>
                      <Icon
                        name="ios-download-outline"
                        style={globalstyles.BtnConDetailTextIcon}
                      />
                    </Text>

                    <Text style={globalstyles.BtnConDetailText}>
                      <Icon
                        name="ios-share-social-outline"
                        style={globalstyles.BtnConDetailTextIcon}
                      />
                    </Text>

                    <Text style={globalstyles.BtnConDetailText}>
                      <Icon
                        name="ios-globe-outline"
                        style={globalstyles.BtnConDetailTextIcon}
                      />
                    </Text>
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
