import React, {useState, useEffect} from 'react';
import {
  Button,
  View,
  Text,
  Image,
  Dimensions,
  ScrollView,
  StyleSheet,
  FlatList,
} from 'react-native';
import {globalstyles} from '../../styles/GlobalStyles';
import firestore from '@react-native-firebase/firestore';
import {BtnBackToHome, BtnComingSoon} from '../../components/MediaExport';
import Loader from '../../components/Loader';

function Testimoniallisting({props, navigation}) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [filteredDataSource, setFilteredDataSource] = useState([]);

  const dimensions = Dimensions.get('window');
  const imageHeight = Math.round((dimensions.width * 9) / 16);
  const imageWidth = dimensions.width - 30;

  const getAssets = async () => {
    setLoading(true)
    try {
      const list = [];
      //console.log("Break");
      firestore()
        .collection('testimonials')
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            list.push(doc.data());
          });
          setFilteredDataSource(list);
          //setMasterDataSource(list);
          //console.log("Testimonials List is", list);
          setLoading(false)
        });
    } catch (e) {
      setErrors('Failed To Load Data');
    }
  };
  useEffect(() => {
    getAssets();
    //getAssetsSearch()
  }, [filteredDataSource]);

  return (
    <>
      <View style={globalstyles.BodyMainOutCon}>
        {!loading ? (
          <FlatList
            //horizontal
            //horizontal
            //pagingEnabled={true}
            // showsHorizontalScrollIndicator={true}
            //contentContainerStyle={{paddingBottom:50}}
            data={filteredDataSource}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              //<View key={item.id} style={globalstyles.Container}>
              <View style={globalstyles.HorScrollMainCon}>
                <View key={item.id}>
                  <View style={globalstyles.HorScrollBoxCon}>
                    {item.testimonialbannerbig1 ? (
                      <>
                        <View>
                          <Image
                            source={{uri: item.testimonialbannerbig1}}
                            //resizeMode="cover"
                            style={globalstyles.HorScrollBoxBibleVersImg}
                            //width={imageWidth} height={imageHeight}
                          />
                          {/* <View style={globalstyles.HorScrollBoxConVersCon}>
                      <View style={globalstyles.HorScrollBoxConVersTextCon}>
                        <Text  style={globalstyles.HorScrollBoxConVersText}>{item.quizquestion}</Text>
                      </View>
                      <View style={globalstyles.HorScrollBoxConVersInfoCon}>
                        <Text  style={globalstyles.HorScrollBoxConVersInfo}>{item.quizbook}-{item.festival}</Text>
                      </View>
                    </View> */}
                        </View>
                      </>
                    ) : null}
                  </View>
                </View>
              </View>
            )}
          />
        ) : 
        <>
        <View style={globalstyles.Divider5}></View>
        <Loader />
        </>
        
        }

        <View style={globalstyles.Divider1}></View>
        {!loading && <>
        
        <View style={globalstyles.Divider1}></View>
        <BtnBackToHome
          buttonTitle="Send your Testimony"
          onPress={() => navigation.navigate('Testimony')}
        />
        </>}
      </View>
    </>
  );
}

export default Testimoniallisting;
// ... other code from the previous section
