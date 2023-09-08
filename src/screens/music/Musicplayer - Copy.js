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
        .collection('songbooks')
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
        .collection('songbooks')
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

  useEffect(() => {
    setTimeout(() => setLoading(true), 3000);
  }, []);


  return (
    <>
      <ScrollView>
      {loading ? 
        <>
        <View style={globalstyles.BodyMainOutCon}>
        <WebView
            javaScriptEnabled={true}
            domStorageEnabled={true}
            source={{uri: 'https://www.youtube.com/embed/8okEqwWY584'}}
            style={globalstyles.WebviewVideoHor1}
          />
          <View style={globalstyles.Divider3}></View>
          <WebView
            javaScriptEnabled={true}
            domStorageEnabled={true}
            source={{uri: 'https://www.youtube.com/embed/3amtzCKdtZg'}}
            style={globalstyles.WebviewVideoHor1}
          />
          <View style={globalstyles.Divider3}></View>
          <WebView
            javaScriptEnabled={true}
            domStorageEnabled={true}
            source={{uri: 'https://www.youtube.com/embed/L3tVuUJDTYs'}}
            style={globalstyles.WebviewVideoHor1}
          />
          <View style={globalstyles.Divider3}></View>
          <WebView
            javaScriptEnabled={true}
            domStorageEnabled={true}
            source={{uri: 'https://www.youtube.com/embed/-dtb0kgol6M'}}
            style={globalstyles.WebviewVideoHor1}
          />
          <View style={globalstyles.Divider3}></View>
          <WebView
            javaScriptEnabled={true}
            domStorageEnabled={true}
            source={{uri: 'https://www.youtube.com/embed/bcJUoX5LJPw'}}
            style={globalstyles.WebviewVideoHor1}
          />
          <View style={globalstyles.Divider3}></View>
          <WebView
            javaScriptEnabled={true}
            domStorageEnabled={true}
            source={{uri: 'https://www.youtube.com/embed/YquunFGnS_M'}}
            style={globalstyles.WebviewVideoHor1}
          />
          <View style={globalstyles.Divider1}></View>
          {/* <BtnComingSoon />
          <View style={globalstyles.Divider1}></View> */}
          {/* <BtnBackToHome buttonTitle="Go to Home" onPress={() => navigation.navigate('Home')}/>   */}
        </View>
        </>
        :
        <>
        <View style={globalstyles.Divider5}></View>
        <Loader />
        </>
        }
      </ScrollView>
    </>
  );
};

export default Musicplayer;
