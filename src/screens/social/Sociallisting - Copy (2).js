import React, {useState, useEffect} from 'react';
import {  Button,  VirtualizedList,  View,  Text,  Image,  ScrollView,  TouchableOpacity} from 'react-native';
import {globalstyles} from '../../styles/GlobalStyles';
import firestore from '@react-native-firebase/firestore';
import {BtnBackToHome} from '../../components/MediaExport';
import Loader from '../../components/Loader';
import Icon from 'react-native-vector-icons/Ionicons';
import { RadioButton } from 'react-native-paper';
import BtnRadioBtn from '../../components/BtnRadioButton';

function Sociallisting({props, navigation}) {
  const [languagechecked, setLanguagechecked] = React.useState('English');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [allLoaded, setAllLoaded] = useState(false);
  const [lastloded, setLastloded] = useState(null);
  const [filteredDataSource, setFilteredDataSource] = useState([]);

  const getAssets = async () => {
    setLoading(true);
    try {
      const list = [];
      //console.log("Break");
      firestore()
        .collection('biblequotes')
        .where('songlanguage', '==', languagechecked)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            list.push(doc.data());
            setLoading(false);
          });
          setFilteredDataSource(list);
          //console.log("List is", list);
          setLoading(false);
        });
    } catch (e) {
      setErrors('Sorry, Please try after some time...');
      setLoading(false);
    }
  };
  useEffect(() => {
    getAssets();
    //getAssetsSearch()
  }, [languagechecked,filteredDataSource]);

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
    </>
  );
  return (
    <>
      <ScrollView style={globalstyles.BodyMainOutCon}>
        {/* <TextInput value={code} onChangeText={text => setCode(text)} />*/}
        <RadioButton.Group style={globalstyles.FilterRadiolblCon} onValueChange={newValue => setLanguagechecked(newValue)} value={languagechecked}>
      {/* <View style={globalstyles.FilterRadiolblCon}> 
      <View style={globalstyles.FilterRadiolbl}><RadioButton.Item label="English" value="English"  status='checked' /></View>
      <View style={globalstyles.FilterRadiolbl}><RadioButton.Item label="Gujarati" value="Gujarati" /></View>
      <View style={globalstyles.FilterRadiolbl}><RadioButton.Item label="Hindi" value="Hindi" /></View>
      </View>  */}
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
          {!loading ? (
          <>
            <VirtualizedList
              //style={styles.container}
              data={filteredDataSource}
              initialNumToRender={3}
              ListEmptyComponent={EmptyList}
              //ItemSeparatorComponent={EmptyList}
              keyExtractor={item => item.key}
              getItemCount={data => data.length}
              getItem={getItem}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Socialdownload', {
                      id: item.songdata.id,
                      posttitle: item.songdata.posttitle,
                      videolink: item.songdata.videolink,
                      audiolink: item.songdata.audiolink,
                      songImgUrl: item.songdata.songImgUrl,
                      weburl: item.songdata.weburl,
                      postmetatitle: item.songdata.postmetatitle,
                    })
                  }>
                  <View style={globalstyles.HorScrollMainCon}>
                    <View key={item.songdata.id}>
                      <View style={globalstyles.HorScrollBoxCon}>
                        {item.songdata.songImgUrl ? (
                          <>
                            <View>
                              <Image
                                source={{uri: item.songdata.songImgUrl}}
                                style={
                                  (globalstyles.HorScrollBoxBibleVersImgInn,
                                  globalstyles.ImageBottomBorderNone)
                                }
                              />
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
            
          </>
        ) : (
          <>
            <View style={globalstyles.Divider5}></View>
            <Loader />
            {errors? <><Text>{errors}</Text></>: null}
          </>
        )}

        <View style={globalstyles.Divider5}></View>
        {!loading ? <>
            <View style={globalstyles.Divider1}></View>
            <BtnBackToHome
              buttonTitle="Send your Testimony"
              onPress={() => navigation.navigate('Testimony')}
            />
            <View style={globalstyles.Divider2}></View>
            <BtnBackToHome
              buttonTitle="Send your Suggestion"
              onPress={() => navigation.navigate('Contact')}
            />
          </>
          :
          null
          
        }
        <View style={globalstyles.Divider5}></View>
      </ScrollView>
    </>
  );
}

export default Sociallisting;
// ... other code from the previous section
