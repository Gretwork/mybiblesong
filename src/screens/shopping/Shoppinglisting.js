import React, { useState,useEffect, useCallback, useRef } from 'react';
import {  Button,  VirtualizedList, SafeAreaView, View,  Text,  Image,  ScrollView, Linking, TouchableOpacity} from 'react-native';
import {globalstyles} from '../../styles/GlobalStyles';
import firestore from '@react-native-firebase/firestore';
//import {BtnBackToHome} from '../../components/MediaExport';
import Loader from '../../components/Loader';
//import Icon from 'react-native-vector-icons/Ionicons';
import { RadioButton } from 'react-native-paper';
import BtnRadioBtn from '../../components/BtnRadioButton';
import {useRoute} from '@react-navigation/native';

 
function Shoppinglisting ({props, navigation}) {
  const route = useRoute();
  const [languagechecked, setLanguagechecked] = React.useState('Gujarati');
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
        .collection('shoppingbag')        
        .orderBy(field, 'desc')        
        .limit(pageloadlimit)
        .where('shoplanguage', '==', languagechecked)
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
        .collection('shoppingbag')      
        .orderBy(field, 'desc')
        .limit(pageloadlimit)
        //.where('shoplanguage', '==', languagechecked)
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
    shopdata: filteredDataSource[index],
    id: Math.random().toString(12).substring(0),
  });

  const EmptyList = () => (
    <>
      {/* <Text style={globalstyles.shopsListTitleNoDataText}>Loading...</Text> */}
      <View style={globalstyles.Divider1}></View>
      {loading ? <Loader /> : <Text>{errors}</Text>}
    </>
  );
  const FooterList = () => (
    <>
      {allLoaded == true ? (
        <>
          <Text style={globalstyles.shopsListTitleNoDataText}>
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

 

  return (
    <>
     <SafeAreaView 
      //style={[globalstyles.BodyMainOutCon,]}
      style={[globalstyles.BodyMainOutCon,]}
      //style={{ paddingBottom: Platform.OS === 'android' ? 120 : 110 }}
      >
        
        {/* <RadioButton.Group
          onValueChange={newValue => setLanguagechecked(newValue)}
          value={languagechecked}>
          <View style={globalstyles.FilterRadiolblCon}>
            <ScrollView horizontal>
              <BtnRadioBtn labelTitle="हिन्दी" labelLanguage="Hindi" />
              <BtnRadioBtn labelTitle="ગુજરાતી" labelLanguage="Gujarati" labelStatus="checked" />
              <BtnRadioBtn labelTitle="English" labelLanguage="English" />
              <BtnRadioBtn labelTitle="मराठी" labelLanguage="Marathi" />
              <BtnRadioBtn labelTitle="Español" labelLanguage="Spanish" />
            </ScrollView>
          </View>
        </RadioButton.Group> */}
         
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
                  // onPress={() =>
                  //   navigation.navigate('VideoPlayer', {
                  //     id: item.shopdata.id,
                  //     posttitle: item.shopdata.posttitle,
                  //     videolink: item.shopdata.videolink,
                  //     audiolink: item.shopdata.audiolink,
                  //     shopImgUrl: item.shopdata.shopImgUrl,
                  //     weburl: item.shopdata.weburl,
                  //     postmetatitle: item.shopdata.postmetatitle,
                  //   })
                  // }
                  onPress={() => Linking.openURL(item.shopdata.weburl)}
                  >
                  <View style={globalstyles.HorScrollMainCon}>
                    <View key={item.shopdata.id}>
                      <View style={globalstyles.HorScrollBoxCon}>
                        {item.shopdata.shopImgUrl ? (
                          <>
                            <View>
                            
                            <Image
                                source={{uri: item.shopdata.shopImgUrl}}
                                style={
                                  (globalstyles.WebviewYouTubeSmall)
                                }
                              />
                              
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
            <View style={globalstyles.Divider10}></View>
            <Loader />
          </>
        )}
       <View style={globalstyles.Divider10}></View>
      </SafeAreaView>
      
    </>
  );
}

export default Shoppinglisting;
// ... other code from the previous section

