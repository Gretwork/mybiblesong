import {
  Button,
  Img,
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  StyleSheet,
  FlatList,
} from 'react-native';
import React, {Component, useState, useEffect, useCallback} from 'react';
import {globalstyles} from '../styles/GlobalStyles';
import firestore from '@react-native-firebase/firestore';
import {DocumentSnapshot} from 'firebase/firestore';

function Logourlone({props, navigation}) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [filteredDataSource, setFilteredDataSource] = useState([]);

  const getAssets = async () => {
    try {
      const list = [];
      //console.log("Break");
      firestore()
        .collection('songappimages')
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            list.push(doc.data());
          });
          setFilteredDataSource(list);
          //console.log("List is", list);
        });
    } catch (e) {
      setErrors('Failed To Load Data');
    }
  };
  useEffect(() => {
    getAssets();
  }, []);
  return (
    <>
      {!loading ? (
        <FlatList
          data={filteredDataSource}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <>
              {item.bannersongsmain1 ? (
                <Image
                  key={item.id}
                  style={[globalstyles.UserTopimg, globalstyles.TextRight]}
                  //style={[globalstyles.LogoHeaderRight]}
                  source={{uri: item.logoround1}}
                  alt="MBS"
                />
              ) : null}
            </>
          )}
        />
      ) : null}
    </>
  );
}


function Songbannerbigone({props, navigation}) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [filteredDataSource, setFilteredDataSource] = useState([]);

  const getAssets = async () => {
    try {
      const list = [];
      //console.log("Break");
      firestore()
        .collection('songappimages')
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            list.push(doc.data());
          });
          setFilteredDataSource(list);
          //console.log("List is", list[0].bannersongsmain1);
        });
    } catch (e) {
      setErrors('Failed To Load Data');
    }
  };
  useEffect(() => {
    getAssets();
  }, []);
  return (
    <>
      {!loading ? (
        <FlatList
          data={filteredDataSource}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <>
              {item.bannersongsmain1 ? (
                <Image
                  key={item.id}
                  style={[globalstyles.SongsBannerCon]}
                  source={{uri: item.bannersongsmain1}}
                  alt="Welcome"
                />
              ) : null}
            </>
          )}
        />
      ) : null}
    </>
  );
}

function SmallButton(props) {
  return <Button title="Small Detail" style={{padding: '0px 10px'}} />;
}

function BigButton() {
  return <Button title="Big Detail" style={{padding: '20px 40px'}} />;
}

export {SmallButton, BigButton, Logourlone, Songbannerbigone};

export const Logo = require('../assets/logo.png');
export const IconHome = require('../assets/icons/icon_house.png');
export const IconSearch = require('../assets/icons/icon_search2.png');
export const IconDownload = require('../assets/icons/icon_download.png');
export const IconSettings = require('../assets/icons/icon_adjust-horiz.png');
