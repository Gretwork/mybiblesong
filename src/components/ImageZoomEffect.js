import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {windowHeight, windowWidth} from '../styles/Dimentions';
import { ImageZoom } from '@likashefqet/react-native-image-zoom';
import Loader from '../components/Loader'

const ImageZoomEffect = ({imgurl, styleclass, sizemode, ...rest}) => {
  return (
    <ImageZoom 
        source={imgurl}
        minScale={0} 
        maxScale={3} 
        renderLoader={() => <Loader />}
        //style={globalstyles.SongDetailImage}
        style={styleclass}
        resizeMode={sizemode}
        {...rest}
        />
  );
};

export default ImageZoomEffect;

