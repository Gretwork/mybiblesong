import React, {Component} from 'react';
import {Text, View, Linking, ScrollView, TouchableOpacity,} from 'react-native';
import {globalstyles} from '../../styles/GlobalStyles';
import Icons from 'react-native-vector-icons/Ionicons';
import {RadioButton} from 'react-native-paper';
import BtnRadioBtn from '../../components/BtnRadioButton';
import BtnRippleEffect from '../../components/BtnRippleEffect';

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

          <View style={[globalstyles.IconRowBoxCon, globalstyles.BgColorYoutube]}>
            <View style={[globalstyles.IconRowBoxIconCon]}>
              <Icons  name="globe-outline"  style={[globalstyles.IconRowBoxIconImg, globalstyles.ColorWhite]} />
            </View>
              <Text style={[globalstyles.IconRowBoxLblText, globalstyles.ColorWhite]} onPress={() => Linking.openURL('https://www.mybiblesong.com') }>
              Visit our Website
              </Text>
          </View>
          <View style={[globalstyles.IconRowBoxCon, globalstyles.BgColorYoutube]}>
            <View style={[globalstyles.IconRowBoxIconCon]}>
              <Icons  name="at-circle-outline"  style={[globalstyles.IconRowBoxIconImg, globalstyles.ColorWhite]} />
            </View>
            <BtnRippleEffect  onPress={() => navigation.navigate('Contact')} > 
              <Text style={[globalstyles.IconRowBoxLblText, globalstyles.ColorWhite]}>
                eMail Us @
              </Text>
            </BtnRippleEffect>
          </View>

          <View style={globalstyles.Divider2}></View>
          <View style={globalstyles.HLineGray1}></View>
          <View style={globalstyles.Divider2}></View>
          
          {/* <View style={[globalstyles.IconRowBoxCon, globalstyles.BgColorLinkedin]}>
            <View style={[globalstyles.IconRowBoxIconCon]}>
              <Icons  name="language"  style={[globalstyles.IconRowBoxIconImg, globalstyles.ColorWhite]} />
            </View>
              <Text style={[globalstyles.IconRowBoxLblText, globalstyles.ColorWhite]}>
              Select Language Below - {languagechecked} 
              </Text>
          </View>
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
        <View style={globalstyles.Divider2}></View> */}
        
          <View style={[globalstyles.IconRowBoxCon, globalstyles.BgColorInstagram]}>
            <View style={[globalstyles.IconRowBoxIconCon]}>
              <Icons  name="logo-instagram"  style={[globalstyles.IconRowBoxIconImg, globalstyles.ColorWhite]} />
            </View>
              <Text style={[globalstyles.IconRowBoxLblText, globalstyles.ColorWhite]} 
              onPress={() => Linking.openURL('https://www.instagram.com/mybiblesong/') }>
                Follow Us on Instagram
              </Text>
          </View>
          <View style={[globalstyles.IconRowBoxCon, globalstyles.BgColorYoutube]}>
            <View style={[globalstyles.IconRowBoxIconCon]}>
              <Icons  name="logo-youtube" style={[globalstyles.IconRowBoxIconImg, globalstyles.ColorWhite]} />
            </View>
              <Text style={[globalstyles.IconRowBoxLblText, globalstyles.ColorWhite]}  onPress={() => Linking.openURL('https://www.youtube.com/@mybiblesong') }>
              Subscribe Us on Youtube
              </Text>
          </View>
          <View style={[globalstyles.IconRowBoxCon, globalstyles.BgColorFacebook]}>
            <View style={[globalstyles.IconRowBoxIconCon]}>
              <Icons  name="logo-facebook"  style={[globalstyles.IconRowBoxIconImg, globalstyles.ColorWhite]}/>
            </View>
              <Text style={[globalstyles.IconRowBoxLblText, globalstyles.ColorWhite]}  onPress={() => Linking.openURL('https://www.facebook.com/mybiblesong/') }>
              Follow Us on Facebook
              </Text>
          </View>
          <View style={[globalstyles.IconRowBoxCon, globalstyles.BgColorPinterest]}>
            <View style={[globalstyles.IconRowBoxIconCon]}>
              <Icons  name="logo-pinterest" style={[globalstyles.IconRowBoxIconImg, globalstyles.ColorWhite]} />
            </View>
              <Text style={[globalstyles.IconRowBoxLblText, globalstyles.ColorWhite]}  onPress={() => Linking.openURL('https://www.pinterest.com/mybiblesong/') }>
              Follow Us on Pinterest
              </Text>
          </View>
          <View style={[globalstyles.IconRowBoxCon,globalstyles.BgColorTwitter]}>
            <View style={[globalstyles.IconRowBoxIconCon]}>
              <Icons  name="logo-twitter"  style={[globalstyles.IconRowBoxIconImg, globalstyles.ColorWhite]}/>
            </View>
              <Text style={[globalstyles.IconRowBoxLblText, globalstyles.ColorWhite]}  onPress={() => Linking.openURL('https://www.twitter.com/mybiblesong/') }>
              Follow Us on Twitter
              </Text>
          </View> 



          <View style={globalstyles.HLineGray1}></View>

          <View style={globalstyles.Divider2}></View>

          

          <View style={[globalstyles.IconRowBoxCon, globalstyles.BgColorYoutube]}>
            <View style={[globalstyles.IconRowBoxIconCon]}>
              <Icons  name="cafe" style={[globalstyles.IconRowBoxIconImg, globalstyles.ColorWhite]} />
            </View>
              <Text style={[globalstyles.IconRowBoxLblText, globalstyles.ColorWhite]}  onPress={() => Linking.openURL('https://www.mybiblesong.com/donate') }>
              Buy a Coffee for Us
              </Text>
          </View>

          <View style={globalstyles.HLineGray1}></View>

           
          <View style={[globalstyles.IconRowBoxCon, globalstyles.BgColorYoutube]}>
            <View style={[globalstyles.IconRowBoxIconCon]}>
              <Icons  name="happy" style={[globalstyles.IconRowBoxIconImg, globalstyles.ColorWhite]} />
            </View>
              <Text style={[globalstyles.IconRowBoxLblText, globalstyles.ColorWhite]} >
              More Features Are Coming Soon...
              </Text>
          </View>

          <View style={globalstyles.HLineGray1}></View>

          <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Appinfo')
                  }>
          <View style={[globalstyles.IconRowBoxCon, globalstyles.BgColorYoutube]}>
            <View style={[globalstyles.IconRowBoxIconCon]}>
              <Icons  name="return-down-forward-outline" style={[globalstyles.IconRowBoxIconImg, globalstyles.ColorWhite]} />
            </View>
              <Text style={[globalstyles.IconRowBoxLblText, globalstyles.ColorWhite]} >
              Quick Tour
              </Text>
          </View></TouchableOpacity>
          


          <View style={globalstyles.Divider2}></View>
          <Text>Current Version {version}</Text>
          <View style={globalstyles.Divider2}></View>
        </View>
      </ScrollView>
    );
}

export default Settingsscreen;
