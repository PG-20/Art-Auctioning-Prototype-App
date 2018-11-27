import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import ArtScreen from '../screens/ArtScreen';
import PaintingScreen from '../screens/PaintingScreen';
import CameraScreen from '../screens/CameraScreen'
import {Icon} from "expo";
import Colors from "../constants/Colors";

const HomeStack = createStackNavigator({
    Home: HomeScreen,
});

HomeStack.navigationOptions = {
    tabBarIcon: ({ focused }) => (
        <Icon.Entypo
            name={'shop'}
            size={26}
            style={{ marginBottom: -3 }}
            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
        />
    ),
};

const LinksStack = createStackNavigator({
    Art: ArtScreen,
    Painting: PaintingScreen,
    CameraScreen: CameraScreen,
});

LinksStack.navigationOptions = {
    tabBarIcon: ({ focused }) => (
        <Icon.MaterialCommunityIcons
            name={'gavel'}
            size={26}
            style={{ marginBottom: -3 }}
            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
        />
    ),
};


export default createBottomTabNavigator({
    HomeStack,
    LinksStack,
},{
    tabBarOptions: {
        showLabel: false
    }
});
