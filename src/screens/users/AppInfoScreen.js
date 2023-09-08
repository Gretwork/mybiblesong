import React, {useState, useEffect} from 'react';
import {  Button,  VirtualizedList, FlatList, SafeAreaView, View,  Text,  Image,  ScrollView,  TouchableOpacity} from 'react-native';
import {globalstyles} from '../../styles/GlobalStyles';
import firestore from '@react-native-firebase/firestore';
import Loader from '../../components/Loader';
import Icon from 'react-native-vector-icons/Ionicons';

function AppInfoScreen({props, navigation}) {
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState(null);
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  

  const getAssets = async () =>{
    setLoading(false)
    try {
       const list = [];
       //console.log("Break");
       firestore().collection("appinfodata").orderBy('timestamp', 'asc').get()
       .then(function(querySnapshot){
          querySnapshot.forEach(function(doc){
             list.push(doc.data());
             setLoading(false)
          });
          setFilteredDataSource(list);
          //console.log("List is", list.length);
          setLoading(false)
       });
    } catch (e) {
       setErrors("Failed To Load Data");
    }
  };
  useEffect(() => {
    getAssets()
    //getAssetsSearch()
  }, []);

   

  return (
    <>
    <ScrollView style={globalstyles.BodyMainOutCon}>
      {/* <TextInput value={code} onChangeText={text => setCode(text)} />*/}
      <View >
      {!loading 
     ? 
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
          <View  style={( globalstyles.HorScrollMainCon)}>
          <View key={item.id} style={globalstyles.HorScrollBoxCon}>
            <View style={globalstyles.HorScrollBoxConFaqCon}>
            <View >
             <Text style={( globalstyles.FaqTitle)}>{item.title}</Text>
            </View>
            <View>
             <Text style={( globalstyles.FaqDesc)}>{item.desc.replace(/LINEBREAK/g, '\n')}</Text>
            </View> 
            </View>
            <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(item.pagelink)
                  }>
            <View style={globalstyles.Downloadimgbtn}>
                <View style={globalstyles.BtnConDetail1}>
                  <Text style={globalstyles.BtnConDetailText}>
                    <Icon
                      name="ios-return-down-forward-outline"
                      style={
                        globalstyles.BtnConDetailTextIconWhite
                      }
                    />
                  </Text>
                </View>
            </View>
            </TouchableOpacity>
          </View> 
        </View>
      )}
    />
     : 
     <>
        <View style={globalstyles.Divider5}></View>
        <Loader />
        </>
     }   

        

      </View>
        <View style={globalstyles.Divider5}></View> 
      </ScrollView>
    </>
  );
}

export default AppInfoScreen;
// ... other code from the previous section