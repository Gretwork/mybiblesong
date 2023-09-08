import React, {useState, useEffect} from 'react';
import {
  Button,
  VirtualizedList,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {globalstyles} from '../../styles/GlobalStyles';
import firestore from '@react-native-firebase/firestore';
import {BtnBackToHome} from '../../components/MediaExport';
import Loader from '../../components/Loader';
import Icon from 'react-native-vector-icons/Ionicons';

function Festivallisting({props, navigation}) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [filteredDataSource, setFilteredDataSource] = useState([]);

  const getAssets = async () => {
    setLoading(false);
    try {
      const list = [];
      //console.log("Break");
      firestore()
        .collection('festivals')
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
      setErrors('Failed To Load Data');
    }
  };
  useEffect(() => {
    getAssets();
    //getAssetsSearch()
  }, [filteredDataSource]);

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
          </>
        )}

        <View style={globalstyles.Divider5}></View>
        {loading && (
          <>
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
        )}
        <View style={globalstyles.Divider5}></View>
      </ScrollView>
    </>
  );
}

export default Festivallisting;
// ... other code from the previous section
