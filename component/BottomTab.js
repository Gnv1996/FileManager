import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Video from "./Video.js";
import Music from "./Music.js";
import Image from "./Image.js";
import  MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
 



const Tab=createMaterialBottomTabNavigator();

const BottomTab=()=>{
    return(
        <Tab.Navigator >

            <Tab.Screen name='Music' component={Music} options={{
                tabBarIcon:({color})=>(
                    <MaterialCommunityIcons color={'blue'} name='music' size={26} />
                )
            }}/>
            <Tab.Screen name='Video' component={Video} options={{
                tabBarIcon:({color})=>(
                    <MaterialCommunityIcons color={color} name='video' size={26} />
                )
            }}/>
            <Tab.Screen name='Image' component={Image} options={{
                tabBarIcon:({color})=>(
                    <MaterialCommunityIcons color={color} name='image' size={26} />
                )
            }}/>
        </Tab.Navigator>
    )
} 
export default BottomTab;