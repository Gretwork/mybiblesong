import {StyleSheet,Dimensions } from 'react-native'
import {windowHeight, windowWidth} from './Dimentions'
import { pink100 } from 'react-native-paper/lib/typescript/styles/colors';

const dimensions = Dimensions.get('window');

export const globalstyles = StyleSheet.create({
  body: {
    backgroundColor:'white',
  },
  Container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  RowCon: {
    flex: 1,
    flexDirection: 'column',
  },
  HorSpaceLeft1:{
    marginLeft:10,
  },  
  HorSpaceLeft15:{
    marginLeft:15,
  },
  HorSpaceLeft2:{
    marginLeft:20,
  },
  HorSpaceRight1:{
    marginLeft:10,
  },  
  HorSpaceRight15:{
    marginLeft:15,
  },
  HorSpaceRight2:{
    marginLeft:20,
  },
  HorScrollMainCon : {
    flex: 1, flexDirection:'column',
    margin:0,
  },
  HorScrollBoxCon : {
    marginTop:10, marginBottom:0,
  },
  HorScrollBoxConImg : {
    marginRight:20, marginBottom:0, width: windowWidth / 1.19, 
    //height: windowHeight /3.2, 
    //height:Math.round(dimensions.width * 9/16 ), 
    aspectRatio:3/3,
    borderRadius:10,
    resizeMode:'cover'
  },
  HorScrollBoxBibleVersImgBig:{
    marginRight:20, marginBottom:0, borderRadius:10, width: windowWidth / 1.2, 
    height:Math.round(dimensions.width * 9/15 ),
    resizeMode:'cover'
  },
  HorScrollBoxBibleVersImg:{
    marginRight:20, marginBottom:0, borderRadius:10, width: windowWidth / 1.078, 
    height:Math.round(dimensions.width * 9/16 ),
    resizeMode:'cover'
  },
  HorScrollBoxBibleVersImgInn:{
    marginRight:0, marginBottom:0, borderRadius:10, 
    width: windowWidth / 1.078, 
    //width:dimensions.width-130,
    //height:Math.round(dimensions.width * 9/16 ), 
    resizeMode:'contain',
    aspectRatio:3/3,
    backgroundColor:'red',
  },
  AppUpdateAlertBoxCon : {
   padding:0, marginBottom:20, borderBottomColor:'#ccc', borderBottomWidth:1, borderStyle:'solid', 
   width: windowWidth / 1.1, 
   //shadowColor:'red', shadowOpacity:1,
  },
  AppUpdateAlertText :{ color:'black', fontSize:16, lineHeight:30, },
  AppUpdateAlertButtonCon:{  textAlign:'right', alignItems:'flex-end',  width: windowWidth / 1.07, paddingRight:15,},
  AppUpdateAlertButton:{ color:'white', fontSize:14, backgroundColor:'red', 
    padding:5, paddingHorizontal:10, marginTop:10, marginBottom:10,  borderRadius:5, 
  },
  WebviewYouTubeSmallCon:{  },
  
  WebviewYouTubeSmall:{ 
    /*display:'flex', alignItems:'center',  justifyContent:'center', overflow:'hidden',
    width: windowWidth / 1.078, margin:10, resizeMode:'contain', aspectRatio:5/3, borderRadius:10,
    */
    marginLeft:10, marginVertical:10, width: windowWidth / 1.060, 
    //height: windowHeight /3.2, 
    //height:Math.round(dimensions.width * 9/16 ), 
    aspectRatio:5/3,
    borderRadius:5,
    resizeMode:'cover'
   
  },
  WebviewYouTubeCover:{  
    position:'absolute', top:10, bottom:10, width: windowWidth / 1.078, backgroundColor:'black', zIndex:1,  opacity:0.5,
    display:'flex',   justifyContent:'center', 
  },
  WebviewYouTubeCoverIcon:{  
     color:'red', fontSize:'28',
  },
  WebviewVideoHor1:{ padding:10, marginTop:20, marginBottom:20,
    width: windowWidth / 1.078, height: windowHeight / 3.2, backgroundColor:'white',
  },
  WebviewFullHeight:{ padding:10, marginTop:20, marginBottom:20,
    width: windowWidth / 1.078, minHeight:1500, backgroundColor:'white',
  },
  WebviewFullHeightQuiz:{ padding:10, marginTop:20, marginBottom:20,
    width: windowWidth / 1.078, minHeight:1500, backgroundColor:'white',
  },
  WebviewVideoHorInn:{
    width: windowWidth / 1.2, height: windowHeight / 3.2, 
  },
  HorScrollBoxConVersCon :{
    position:'absolute',
    top:10,
    bottom:10,
    left:10,
    color:'white',
  },
  HorScrollBoxConVersTextCon :{
    color:'white',
    width:'95%',
  },
  HorScrollBoxConVersText :{
    color:'white', fontWeight:'400',
    fontSize:19, lineHeight:36,
    letterSpacing:0.2,
  },
  HorScrollBoxConVersInfoCon : {
    position:'absolute',
    bottom:10,
    left:10,
  },
  HorScrollBoxConVersInfo : {
   color:'white',
   fontStyle:'italic', fontSize:17,
   fontWeight:'500', letterSpacing:0.5,
  },
  BodyMainOutCon: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom:20,
  },
  SafeareaBodyCon:{
    marginBottom:10,
    paddingBottom:120,
  },
  SongsListTabMainCon:{
    position:'absolute', backgroundColor:'white', width: windowWidth/1, height: windowHeight/2, zIndex:999999,
    bottom:0, borderTopLeftRadius:10, borderTopRightRadius:10,  
  },
  SongsListTabInnCon:{
    position:'relative', height:65, marginTop:5, marginBottom:10,   width:windowWidth,
    borderBottomColor:'#cdcdcd', borderBottomWidth:2, borderStyle:'solid',  
  },
  SongsListData:{
    flex:1,  width: windowWidth/1,   height: windowHeight/4,
  },
  SongsListTabMenuCon: {
    position:'absolute',  top:10, left:10,  paddingBottom:10, padding:10, fontSize:16, color:'black', fontWeight:'600',
    borderBottomColor:'red', borderBottomWidth:2, borderStyle:'solid',
  },
  SongsListDataRowCon:{
      paddingLeft:90, paddingRight:15, position:'relative', minHeight:80,
    display:'flex',   justifyContent:'center', borderBottomColor:'#cdcdcd', borderBottomWidth:1, borderStyle:'solid',
  },
  SongsListNoBoxCon:{
   textAlign:'center',  color:'white', backgroundColor:'red',
    position:'absolute', left:10, top:10, borderRadius:10,
  },
  SongsListNoBoxText:{
    width:65, height:60, paddingTop:14, textAlign:'center',  color:'white', 
    fontSize:22, fontWeight:'600',  borderRadius:10,
    
  },
  SongsListTitleNoDataText:{
    backgroundColor:'#f6f6f6', padding:10, color:'black', 
  },
  SongsListTitleText:{
    color:'black', fontSize:16, fontWeight:'600', 
  },
  SongsListDescText:{
    color:'gray', fontSize:14, fontWeight:'400'
  },
  SongsListTabSearchCon: {
    position:'absolute', width: windowWidth/1.25, top:5, left:70,
  },
  SongsBannerCon:{
     marginTop:0, backgroundColor:'white',  zIndex:-1,
      width: windowWidth /1, height: windowHeight /2,    resizeMode:'cover',
  },
  SongDetailImageCon:{
    width: windowWidth/1.078, height: windowHeight/1.4, backgroundColor:'white'
  },
  SongDetailImage:{
     width: windowWidth /1.078,
     //height: windowHeight /1.4, 
     resizeMode:'contain', 
  },
  SongsListTabInnCon:{
    position:'relative', height:65, marginTop:5, marginBottom:10,   width:windowWidth,
    borderBottomColor:'#cdcdcd', borderBottomWidth:2, borderStyle:'solid',  
  },
  ImageZoomMainCon:{width: windowWidth /1.078,},
  BorderGray:{borderWidth:1, borderStyle:'solid', borderColor:'#d5d8d9',},
  QuoteListingMainCon:{
    display:'flex', padding:15, backgroundColor:'#fff', textAlign:'center', alignItems:'center',
    marginTop:20, marginBottom:0, borderTopRightRadius:10, borderTopLeftRadius:10,
  },
  QuoteListingMainText:{
    textAlign:'center', flex:1, alignContent:'center', paddingBottom:10,
    marginBottom:0, color:'#333', fontSize:18, fontWeight:'400', lineHeight:30,
  },
  PageTitle1:{ marginTop:18, marginBottom:20,
    fontSize:20, fontWeight:'400', color:'#333333'
  },
  IconGrayMid1: {
    fontSize:22, color:'#333', margin:10, marginRight:50, position:'relative', textAlign:'left'
  },
  TextCenter: {
    alignSelf: 'center',
  },
  TextLeft: {
    alignSelf: 'flex-start',
  },
  TextRight: {
    alignSelf: 'flex-end',
  },
  TextBold: {
    fontWeight:'600',
  },
  Textdemo: { fontSize:40, color:'green'
  },
  SearchPaddingBottom: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop:15,
    paddingBottom:130,
    backgroundColor:'#fff',
  },
  BodyInnConBox: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop:15,
    paddingBottom:130,
    backgroundColor:'#fff',
  },
  HLineGray1: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height:2,
    marginTop:20,
    backgroundColor:'#cccccc'
  },
  Divider1: {
    marginBottom:10,
  },
  Divider2: {
    marginBottom:20,
  },
  Divider3: {
    marginBottom:30,
  },
  Divider4: {
    marginBottom:40,
  },
  Divider5: {
    marginBottom:50,
  },
  Divider10: {
    marginBottom:100,
  },
  HorScrollBoxConFaqCon:{
    display:'flex', padding:15, backgroundColor:'#fff', 
    marginTop:20, marginBottom:0, borderTopLeftRadius:10, borderTopRightRadius:10,
  },
  FaqTitle:{  color:'#333', fontSize:24, display:'flex',  flexDirection:'row', borderBottomColor:'#f6f6f6', 
  borderBottomWidth:1,borderStyle:'solid', marginBottom:10, paddingBottom:10, },
  FaqDesc:{  fontSize:16, display:'flex',  flexDirection:'row',  lineHeight:30,},
  BtnConDetail1:{
    display:'flex', justifyContent:'space-around', alignItems:'center', textAlign:'center',
    flexDirection:'row',   textAlign:'center', 
    width:windowWidth/1.078, paddingTop:20, paddingBottom:20,
  },
  BtnConDetailSmall:{ paddingTop:10, paddingBottom:10},
  BtnConDetailText:{
     width:100, textAlign:'center', display:'flex', 
  },
  BtnConDetailTextIcon:{
    fontSize:30, fontWeight:'600', color:'#333', 
  },
  BtnIconSmall:{
    fontSize:24,
  },
  BtnConDetailTextIconWhite:{
    fontSize:30, fontWeight:'600', color:'#ffffff', 
  },
  BtnPdf:{
    backgroundColor:'green', padding:10,
  },
  Btn:{
    alignSelf: 'flex-start',
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    paddingHorizontal: 5,
    paddingVertical: 1,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#fff',
    color: 'red',
    fontSize: 18,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#fff',
  },
  BtnBig:{
    backgroundColor:'red',
    color:'#ffffff',
    padding:15, color:'#fff', textTransform:'uppercase'
  },
  BtnLoadMoreOutCon:{
    backgroundColor:'red', display:'flex', alignSelf:'center', justifyContent: 'center',
    color:'#ffffff', minWidth:100,
    padding:10, paddingHorizontal:20, color:'#fff', textTransform:'uppercase'
  },
  BtnLoadMoreInnText:{
   fontSize:14, color:'#fff', textTransform:'uppercase', 
  },
  TextCenter:{
    textAlign:'center',
  },
  Quotedemopage:{
    paddingVertical:50,
  },
  FilterRadiolblCon:{ 
    paddingBottom:20,  marginBottom:20, marginTop:10, marginLeft:10, paddingTop:0, paddingBottom:0,
  borderBottomLeftRadius:4, borderBottomRightRadius:4, color:'#fff', textTransform:'uppercase',
  display:'flex',justifyContent:'space-around', alignItems:'center', textAlign:'center',  overflow:'scroll',
  flexDirection:'row',   textAlign:'center', flexWrap:'nowrap', 
  width:windowWidth/1.078,
  },
  FilterRadiolbl:{ paddingHorizontal:5,   paddingVertical:4, backgroundColor:'#fff',
    borderRadius: 4,  marginRight:10,  borderRadius:5,},

  ImageBottomBorderNone: { marginRight:20, marginBottom:0, borderRadius:10, 
    width: windowWidth / 1.078,  resizeMode:'contain',
    aspectRatio:3/3, borderBottomLeftRadius:0, borderBottomRightRadius:0},
  Downloadimgbtn:{ backgroundColor:'#333', marginTop:-1, zIndex:-1, padding:15, marginBottom:20,
  borderBottomLeftRadius:4, borderBottomRightRadius:4, color:'#fff', textTransform:'uppercase',
  display:'flex', justifyContent:'space-around', alignItems:'center', textAlign:'center',
  flexDirection:'row',   textAlign:'center',  
  width:windowWidth/1.078, paddingTop:0, paddingBottom:0, 
},
DownloadimgbtnWhite:{ backgroundColor:'#fff', marginTop:-1, zIndex:-1, padding:15, marginBottom:20,
  borderBottomLeftRadius:4, borderBottomRightRadius:4, color:'#fff', textTransform:'uppercase',
  display:'flex', justifyContent:'space-around', alignItems:'center', textAlign:'center',
  flexDirection:'row',   textAlign:'center',  
  width:windowWidth/1.078, paddingTop:0, paddingBottom:0, 
},
DownloadimgbtnSmall:{ backgroundColor:'#333', marginTop:-2, zIndex:-1, padding:5, marginBottom:0,
borderBottomLeftRadius:4, borderBottomRightRadius:4, color:'#fff', textTransform:'uppercase',
display:'flex', justifyContent:'space-around', alignItems:'center', textAlign:'center',
flexDirection:'row',   textAlign:'center',  width:windowWidth/1.003, paddingTop:0, paddingBottom:0, 
},
DownloadimgbtnColor:{ backgroundColor:'#f5f5f5'},
  BtnComingSoon:{ fontSize:16, color:'#333333', fontStyle:'italic', fontWeight:'400'},
  Text24:{
    fontSize:24,
  },
  TextCaps:{
    textTransform:'uppercase',
  },
  BtnBlack:{
    backgroundColor:'#333333',
    color:'#ffffff',
  },
  BtnWhite:{
    backgroundColor:'#ffffff',
    color:'red',
  },
  BtnRed:{
    backgroundColor:'red',
    color:'white',
  },
  HomeViewAllBtn: {
    color:'red',
    position:'absolute', right:0, fontSize:14, marginTop:-20, 
  },
  ColorRed: {
    color: 'red',
  },
  ColorBlack: {
    color: '#333',
  },
  ColorDark: {
    color: '#333',
  },
  ColorWhite: {
    color: 'white',
  },
  LogoTextRed:{
    color:'red',
  },
  TitleBigOne: {
    fontWeight: '600',
    color: 'red',
    marginTop: 15,
    marginBottom: 15,
  },
  SectionDescription: {
    marginTop: 15,
    fontSize: 15,
    fontWeight: '400',
  },
  ImgConOne: {
    marginTop: 20,
    marginBottom: 20,
    resizeMode: 'contain',
    alignSelf: 'center',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgSmallOne: {
    height: 200,
    width: 200,
  },
  HeaderTitleLeft: {
    fontSize: 24,
    color:'#333',
  },
  HeadingH2:{
    fontFamily:'roboto',
    fontWeight:'700',
    fontSize:18,
    color:'#333333',
  }, 
  LogoTextHeaderLeft:{
    fontSize:26, color:'red', fontWeight:'600', marginLeft:8,
  },
  UserTopimg: {
    height: 40,
    width: 40,
    borderRadius: 75,
    marginRight: 20,
  },
  HeaderConMain: {
    display: 'flex',
    marginBottom:0,
    marginTop:0, padding:10,
    backgroundColor: '#ffffff',
    flexDirection: 'row', borderBottomColor:'#cdcdcd', borderBottomWidth:1, borderStyle:'solid',
  },
  SearchResultCon: {
    fontWeight: '400',
    color:'#333333',
    marginTop: 5,
    marginBottom: 5,
    paddingLeft:15,
    paddingRight:15,
    fontSize:14,
  },
  TopSearchIcon: {
    width: 20,
    height: 20,
    marginTop: 10,
  },
  TopSearchField: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    color: 'red',
    fontSize: 18,
    padding: 5,
  },
  HeaderSearcCon: {
    alignSelf: 'flex-start',
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    paddingHorizontal: 5,
    paddingVertical: 1,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#fff',
    color: 'red',
    fontSize: 18,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#fff',
  },
  TabBottomCon: {
    backgroundColor: 'orange',
    padding: 20,
    position: 'absolute',
    bottom: 0,
  },
  DetailSearchCon: {
    display: 'flex',
    marginTop:0, marginLeft:15, marginRight:15,
    padding:10,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
  },
  DetailSearchConField: {
    width: '90%',
    padding:2, paddingLeft:10,  
    fontSize:16,
    backgroundColor:'#f6f6f6',
  },
  IconRowBoxCon:{ backgroundColor:'#e7e7e7', padding:0, marginTop:10, flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'},
  IconRowBoxIconCon:{ margin:15,},
  IconRowBoxLblCon:{  backgroundColor:'blue'},
  IconRowBoxIconImg: {color:'#ff0000', fontSize:24},
  IconRowBoxLblText: {color:'#000000', fontSize:14},
  BgColorInstagram:{ backgroundColor:'#c32aa3'},
  BgColorTwitter:{ backgroundColor:'#1da1f2'},
  BgColorFacebook:{ backgroundColor:'#3b5998'},
  BgColorYoutube:{ backgroundColor:'#ff0000'},
  BgColorPinterest:{ backgroundColor:'#bd081c'},
  BgColorLinkedin:{ backgroundColor:'#0a66c2'},
  BtnRippleBoxCon:{ padding:10, },

  // Songs Display Style start here
  SongRowCon: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#ffffff',
    borderBottomColor: '#cccccc',
    borderBottomWidth: 1,
  },
  SongRowNumberCon: {
    padding: 5,
    overflow: 'hidden',
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    color: '#333333',
  },
  SongRowNumber: {
    color: '#333333',
    fontSize: 18,
  },
  SongRowHomeDetailCon: {
    padding: 5,
    overflow: 'hidden',
    color: '#000000',
  },
  SongRowHomeDetail: {
    color: '#666666',
    fontSize: 14,
    marginTop: 5,
    marginBottom: 5,
    flexWrap: 'wrap',
  },
  SongRowHomeButtonCon: {
    color: '#000000',
    fontSize: 14,
  },
  SongRowHomeButton: {
    backgroundColor: '#f6f6f6',
    color: '#ff0000',
    padding: 10,
  },
  FormRawCon:{
    position:'relative',
    display: 'flex',
    flexWrap:'wrap',
    alignItems:'stretch'
  },
  FormErrorMessage:{
    color:'red',  fontSize:14, marginTop:-10, marginBottom:10, lineHeight:30,
  },
  RawBoxCon:{ fontSize:16, lineHeight:30, color:'black', backgroundColor:'#e7e7e7', padding:10, marginTop:10, marginBottom:0, display:'flex', },
  FormInputHeight:{ backgroundColor:'red', height:100, maxHeight:100, display:'flex', minHeight:100},
  LoaderCon:{ display:'flex', position:'absolute', backgroundColor:'black', justifyContent:'center', alignItems:'center', 
  width: windowWidth /1, height: windowHeight /1, zIndex:999999, opacity:0.8},
  LoaderConText:{ color:'white', fontSize:22, },
});

export const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 5,
    marginBottom: 10,
    width: '100%',
    height: windowHeight / 15,
    borderColor: '#ccc',
    borderRadius: 3,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  iconStyle: {
    padding: 10,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: '#ccc',
    borderRightWidth: 1,
    width: 50,
  },
  input: {
    padding: 10,
    flex: 1,
    fontSize: 16,
    fontFamily: 'Lato-Regular',
    color: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputField: {
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
    width: windowWidth / 1.5,
    height: windowHeight / 15,
    fontSize: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
});

export const globalbtn = StyleSheet.create({
  btnred: {
    backgroundColor: 'red',
    color:'white',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});
//export default globalstyles


