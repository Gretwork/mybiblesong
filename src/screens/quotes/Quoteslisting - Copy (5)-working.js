import React, {useState, useEffect} from 'react';
import {
  Button,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  PermissionsAndroid,
  Platform, FlatList,
  VirtualizedList,
} from 'react-native';
import {globalstyles} from '../../styles/GlobalStyles';
import firestore from '@react-native-firebase/firestore';
import { startAt } from 'firebase/firestore';
import { collection, query, orderBy, startAfter, limit, getDocs } from "firebase/firestore";  
//import {BtnBackToHome, BtnComingSoon} from '../../components/MediaExport';
import {useRoute} from '@react-navigation/native';
import Loader from '../../components/Loader';
import Icon from 'react-native-vector-icons/Ionicons';

//import ViewShot from 'react-native-view-shot';
//import Share from 'react-native-share';
//import RNFetchBlob from 'rn-fetch-blob';
import { RadioButton } from 'react-native-paper';



function Quoteslisting({props, navigation, onPress}) {
  const route = useRoute();
  
  const [languagechecked, setLanguagechecked] = React.useState('English');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [perpageload, setPerpageload] = useState(3);
  const [lastloded, setLastloded] = useState(null);
  const [activity, setActivity] = useState([])
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [filteredDataSourcemore, setFilteredDataSourcemore] = useState([]);
  
  const dimensions = Dimensions.get('window');
  const imageHeight = Math.round((dimensions.width * 9) / 16);
  const imageWidth = dimensions.width - 30;
 
  // Get post data
  const getAssets = async () => {
    //setLoading(true);
    try {
      const list = [];
      //console.log("Break");
        firestore()
        .collection('demodata')
        //.where('language', '==', languagechecked)
        .orderBy('timestamp', 'asc')
        .limit(3)
        .get()
        .then(function (querySnapshot) {
          const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
          querySnapshot.forEach(function (doc) {
            list.push(doc.data());
          });
          const loadnumber = list.length;
          setFilteredDataSource(list);
          setLastloded(lastVisible.data());
          console.log("Bible verses Language", list, 'and', loadnumber);
          setLoading(false);
        });
        //     .then((querySnapshot) => {
//        const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
//        const postList = []
//        querySnapshot.forEach((doc) => {
//          postList.push(doc.data());
//        })

//        if (lastVisible !== undefined) {
//         console.log('setting 11')
//         setFilteredDataSource([...list, ...postList])
//          setList([...list, ...postList]);
//          setLastloded(lastVisible.data());

//        } else {
//          setNotify("nothing to load.");
//          return;
//        }
        
    } catch (e) {
      setErrors('Failed To Load Data, Please try after some time...');
      setLoading(false);
      console.log('some errors is')
    }
  };

  const getAssetsMore = async () => {
    const field = "timestamp";
    //setLoading(true);
    console.log('4444 last loded ', lastloded)
    try {
      const list = [];
      //console.log("Break");
      firestore()
        .collection('demodata')
        //.where('language', '==', languagechecked)
        .orderBy('timestamp', 'asc')
        .startAfter(lastloded[field])
        //.startAt()
        .limit(3)
        .get()
        .then(function (querySnapshot) {
          const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
          querySnapshot.forEach(function (doc) {
            list.push(doc.data());
            
          });
          console.log('456', list)
          console.log('5555555 more dat function')
          const loadnumber = list.length;
          //setFilteredDataSource(list);
          //setFilteredDataSource(list);
          setFilteredDataSourcemore(...filteredDataSource, ...list);
          setFilteredDataSource([...filteredDataSource, ...list])
          //setLastloded(filteredDataSource.length);
          //setLastloded(querySnapshot.docs[querySnapshot.docs.length - 1]);
          console.log("77777 ",filteredDataSource,'with', filteredDataSource.length, 'and', loadnumber);
          setLoading(false);
        });
        
    } catch (e) {
      setErrors('Failed To Load Data, Please try after some time...');
      setLoading(false);
      console.log('some errors is')
    }
  }

  

  useEffect(() => {
    getAssets();
    console.log('First alert', filteredDataSource.length)
    console.log ('last visiable item', perpageload)
    //getAssetsSearch()
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
      <Loader />
      {loading? <Text>{errors}</Text>:null}
       
    </>
  );

  return (
    <>
      <ScrollView style={globalstyles.BodyMainOutCon}>
      <RadioButton.Group  onValueChange={newValue => setLanguagechecked(newValue)} value={languagechecked}>
      <View  style={globalstyles.FilterRadiolblCon}> 
      <ScrollView horizontal>
      <View style={globalstyles.FilterRadiolbl}><RadioButton.Item color='red' uncheckedColor='#333'  label="English" value="English"  status='checked' /></View>
      <View style={globalstyles.FilterRadiolbl}><RadioButton.Item color='red' uncheckedColor='#333' label="Gujarati" value="Gujarati" /></View>
      <View style={globalstyles.FilterRadiolbl}><RadioButton.Item color='red' uncheckedColor='#333' label="Hindi" value="Hindi" /></View>
      <View style={globalstyles.FilterRadiolbl}><RadioButton.Item color='red' uncheckedColor='#333' label="Marathi" value="Marathi" /></View>
      <View style={globalstyles.FilterRadiolbl}><RadioButton.Item  color='red' uncheckedColor='#333' label="Spanish" value="Spanish" /></View>
      </ScrollView>
      </View>
      
      </RadioButton.Group>
      {!loading ? (
          <VirtualizedList
            //style={styles.container}
            onEndReached={getAssetsMore}
            onEndReachedThreshold={0}
            //scrollEventThrottle={16}
            data={filteredDataSource}
            initialNumToRender={3}
            ListEmptyComponent={EmptyList}
            //ItemSeparatorComponent={EmptyList}
            keyExtractor={item => item.key}
            getItemCount={data => data.length}
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
                  //key={item.songdata.id}
                  style={globalstyles.HorScrollMainCon}>
                  <View style={globalstyles.QuoteListingMainCon}>
                    <Text style={globalstyles.QuoteListingMainText}>
                      {/* {item.songdata.bibleversestext} */}
                      {item.songdata.name}
                    </Text>
                    {/* <View style={globalstyles.QuoteListingVerseCon}>
                      <Text style={globalstyles.HorScrollBoxConVersInfo}>
                        {item.songdata.biblebookname}-
                        {item.songdata.biblebookchapter}:
                        {item.songdata.bibleverseno}
                      </Text>
                    </View> */}
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
        <View style={globalstyles.Divider2}></View>
      </ScrollView>
    </>
  );
}

export default Quoteslisting;
// ... other code from the previous section
