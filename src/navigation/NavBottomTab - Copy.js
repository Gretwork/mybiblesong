import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Songs from '../screens/songs/Songs';
//import Searchscreen from '../screens/search/Searchscreen';
//import Downloadscreen from '../screens/users/Downloadscreen';
import Homescreen from '../screens/Homescreen';
import Settingsscreen from '../screens/users/Settingsscreen';
//import Loginscreen from '../screens/users/Loginscreen';
//import SignupScreen from '../screens/users/SignupScreen';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Musicplayer from '../screens/music/Musicplayer';
//import LoginWithPhoneScreen from '../screens/users/LoginWithPhoneScreen';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/Ionicons';
//import Contactform from '../screens/form/Contactform';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const NavBottomTab = () => {
    return (
      <>
        <Header />
        <Stack.Screen
          name="Home"
          component={Songs}
          options={{headerShown: false}}
        />
        <Tab.Navigator
          initialRouteName="Home"
          activeColor="#ffffff"
          inactiveColor="#888888"
          barStyle={{backgroundColor: '#333333'}}>
          <Tab.Screen
            name="Home"
            component={Homescreen}
            options={{
              tabBarLabel: 'Home',
              tabBarIcon: ({color}) => (
                <Icon name="ios-home" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="Songs"
            component={Songs}
            options={{
              tabBarLabel: 'Songs',
              tabBarIcon: ({color}) => (
                <Icon name="ios-search" size={24} color={color} />
              ),
            }}
          />
          {/* <Tab.Screen
            name="Search."
            component={Contactform}
            options={{
              tabBarLabel: 'Form',
              tabBarIcon: ({color}) => (
                <Icon name="ios-globe" size={24} color={color} />
              ),
            }}
          /> */}
          <Tab.Screen
            name="Music"
            component={Musicplayer}
            options={{
              tabBarLabel: 'Enjoy',
              tabBarIcon: ({color}) => (
                <Icon name="ios-musical-notes" color={color} size={26} />
              ),
            }}
          /> 
          <Tab.Screen
            name="Settings"
            component={Settingsscreen}
            options={{
              tabBarLabel: 'More',
              tabBarIcon: ({color}) => (
                <Icon name="ios-menu" color={color} size={26} />
              ),
            }}
          />
        </Tab.Navigator>
      </>
    );
}

export default NavBottomTab;
