import { Button,  View,  Text,  Image, TouchableOpacity,  TextInput, StyleSheet,  ScrollView,  FlatList } from 'react-native';
import React, {Component, useState, useEffect, useCallback} from 'react';
import {globalstyles} from '../styles/GlobalStyles';
import firestore from '@react-native-firebase/firestore';
import Songslider from '../screens/songs/Songslider';
import Socialslider from '../screens/social/Socialslider';
import Quotesslider from '../screens/quotes/Quotesslider';
import Quizslider from '../screens/quiz/Quizslider';
import Testimonialslider from '../screens/testimonials/Testimonialslider';
import Prayerslider from '../screens/prayer/Prayerslider';
import Contactformslider from '../screens/form/Contactformslider';
//import Quizlisting from './quiz/Quizlisting';
import AlertUpdate from '../components/AlertUpdate';
import Vanchanslider from './vanchan/Vanchanslider';
//import { LogoRound} from '../components/Imagesall'
//import Festivalslider from './festival/Festivalslider';

function Homescreen({props, navigation}) {

  return (
    <>
    <ScrollView style={(globalstyles.BodyInnConBox)}>
          
          <AlertUpdate/>
          
          <View style={globalstyles.Divider2}></View>

          <Text style={globalstyles.HeadingH2}>Bible Verses of the Day</Text>
          <TouchableOpacity onPress={() => { navigation.navigate('Verses') }}>
          <Text style={globalstyles.HomeViewAllBtn}>View All</Text>
          </TouchableOpacity>
          <Quotesslider/>
          
          <View style={globalstyles.Divider2}></View>
          <Text style={globalstyles.HeadingH2}>Bible Quotes</Text>
          <TouchableOpacity onPress={() => { navigation.navigate('Quotes') }}>
          <Text style={globalstyles.HomeViewAllBtn}>View All</Text>
            <Socialslider/>
          </TouchableOpacity>

          <View style={globalstyles.Divider2}></View>
           
          <Text style={globalstyles.HeadingH2}>Bible Songs</Text>
          <TouchableOpacity onPress={() => { navigation.navigate('Songs') }}>
          <Text style={globalstyles.HomeViewAllBtn}>View All</Text>
            <Songslider/>
          </TouchableOpacity>

          <View style={globalstyles.Divider2}></View>

          <Text style={globalstyles.HeadingH2}>Scriptures</Text>
          <TouchableOpacity onPress={() => { navigation.navigate('Vanchan') }}>
          <Text style={globalstyles.HomeViewAllBtn}>View All</Text>
          <Vanchanslider/>
          </TouchableOpacity>

          <View style={globalstyles.Divider2}></View>
          
          <Text style={globalstyles.HeadingH2}>Bible Quiz</Text>
          <TouchableOpacity onPress={() => { navigation.navigate('Quiz') }}>
          <Quizslider/>
          </TouchableOpacity>
          
          <View style={globalstyles.Divider2}></View>
          <Text style={globalstyles.HeadingH2}>Testimonials</Text>
          <TouchableOpacity onPress={() => { navigation.navigate('TestimonyForm') }}>
            <Testimonialslider/>
          </TouchableOpacity>
          
          <View style={globalstyles.Divider2}></View>
          <Text style={globalstyles.HeadingH2}>Prayer Requests</Text>
          <TouchableOpacity onPress={() => { navigation.navigate('PrayerForm') }}>
            <Prayerslider/>
          </TouchableOpacity>
          
          <View style={globalstyles.Divider2}></View>
          <Text style={globalstyles.HeadingH2}>Suggestion / Contact</Text>
          <TouchableOpacity onPress={() => { navigation.navigate('Contact') }}>
            <Contactformslider/>
          </TouchableOpacity>          
          <View style={globalstyles.Divider5}></View>
        
        </ScrollView>
    </>
  );
}

export default Homescreen;
// ... other code from the previous section


