import React, {Component} from 'react';
import {Text, View, Linking, ScrollView} from 'react-native';
import {globalstyles} from '../../styles/GlobalStyles';
import Icons from 'react-native-vector-icons/Ionicons';
import {RadioButton} from 'react-native-paper';
import BtnRadioBtn from '../../components/BtnRadioButton';

function Settingsscreen({props, navigation}) {

const [languagechecked, setLanguagechecked] = React.useState('English');

// App Version checking
const pkg = require('../../../package.json');
const version = pkg.version;
  
//export class Settingsscreen extends Component {
   
    return (
      <ScrollView>
        <View style={globalstyles.BodyMainOutCon}>
          <View style={globalstyles.Divider2}></View>
          <Text
            style={globalstyles.RawBoxCon}
            onPress={() => Linking.openURL('https://www.mybiblesong.com')}>
            <Icons name="globe-outline" style={[globalstyles.DetailSearchIcon, globalstyles.TextLeft]}
            /> Visit our Website</Text>

          <Text
            style={globalstyles.RawBoxCon}
            //</View>onPress={() => Linking.openURL('mailto:mybiblesong@gmail.com')}
            onPress={() => navigation.navigate('Contact')}
            >
            <Icons
              name="at-circle-outline"
              size={26}
              style={[globalstyles.DetailSearchIcon, globalstyles.TextLeft]}
            /> 
            eMail Us @
          </Text>
          <View style={globalstyles.Divider2}></View>
          <View style={globalstyles.HLineGray1}></View>
          <View style={globalstyles.Divider2}></View>
          <Text
            style={globalstyles.RawBoxCon}>
            <Icons name="language" style={[globalstyles.DetailSearchIcon, globalstyles.TextLeft]}
            /> Select Language - {languagechecked} </Text>

          <RadioButton.Group
          onValueChange={newValue => setLanguagechecked(newValue)}
          value={languagechecked}>
          <View style={globalstyles.FilterRadiolblCon}>
            <ScrollView horizontal>
              <BtnRadioBtn labelTitle="English" labelLanguage="English" labelStatus="checked" />
              <BtnRadioBtn labelTitle="Gujarati" labelLanguage="Gujarati" />
              <BtnRadioBtn labelTitle="Hindi" labelLanguage="Hindi" />
              <BtnRadioBtn labelTitle="Marathi" labelLanguage="Marathi" />
              <BtnRadioBtn labelTitle="Spanish" labelLanguage="Spanish" />
            </ScrollView>
          </View>
        </RadioButton.Group>
        

        <View style={globalstyles.HLineGray1}></View>
        <View style={globalstyles.Divider2}></View>
        
          <View style={[globalstyles.IconRowBoxCon]}>
            <View style={[globalstyles.IconRowBoxIconCon]}>
              <Icons  name="logo-instagram"  size={26} style={[globalstyles.IconRowBoxIconImg]} />
            </View>
             
              <Text
                style={globalstyles.IconRowBoxLblText}
                onPress={() => Linking.openURL('https://www.instagram.com/mybiblesong/') }>
                Follow Us on Instagram
              </Text>
          </View>
          <Text
            style={globalstyles.RawBoxCon}
            onPress={() =>
              Linking.openURL(
                'https://www.youtube.com/@mybiblesong',
              )
            }>
            <Icons
              name="logo-youtube"
              size={26}
              style={[globalstyles.DetailSearchIcon, globalstyles.TextLeft]}
            />{' '}
            Subscribe Us on Youtube
          </Text>

          

          <Text
            style={globalstyles.RawBoxCon}
            onPress={() =>
              Linking.openURL('https://www.facebook.com/mybiblesong/')
            }>
            <Icons
              name="logo-facebook"
              size={26}
              style={[globalstyles.DetailSearchIcon, globalstyles.TextLeft]}
            />
            Follow Us on Facebook
          </Text>

          

          <Text
            style={globalstyles.RawBoxCon}
            onPress={() =>
              Linking.openURL('https://www.pinterest.com/mybiblesong/')
            }>
            <Icons
              name="logo-pinterest"
              size={26}
              style={[globalstyles.DetailSearchIcon, globalstyles.TextLeft]}
            />
            Follow Us on Pinterest
          </Text>

          

          <Text
            style={globalstyles.RawBoxCon}
            onPress={() =>
              Linking.openURL('https://www.twitter.com/mybiblesong/')
            }>
            <Icons
              name="logo-twitter"
              size={26}
              style={[globalstyles.DetailSearchIcon, globalstyles.TextLeft]}
            />{' '}
            Follow Us on Twitter
          </Text>

          <View style={globalstyles.HLineGray1}></View>

          <View style={globalstyles.Divider2}></View>

          <Text
            style={globalstyles.RawBoxCon}
            onPress={() =>
              Linking.openURL('https://www.mybiblesong.com/donate')
            }>
            <Icons
              name="happy-outline"
              size={26}
              style={[globalstyles.DetailSearchIcon, globalstyles.TextLeft]}
            />{' '}
            Buy a Coffee for Us
          </Text>

          <View style={globalstyles.HLineGray1}></View>

          <Text style={globalstyles.RawBoxCon}>
            <Icons
              name="thumbs-up-outline"
              size={26}
              style={[globalstyles.DetailSearchIcon, globalstyles.TextLeft]}
            />{' '}
            More Features Are Coming Soon...
          </Text>
          <View style={globalstyles.Divider2}></View>
          <Text>Current Version {version}</Text>
          <View style={globalstyles.Divider2}></View>
        </View>
      </ScrollView>
    );
}

export default Settingsscreen;
