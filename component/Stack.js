import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import FileSystem from "./FileSystem";
import BottomTab from "./BottomTab";
import  MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const StackTab=createStackNavigator()

const Stack=()=>{
    return(
        <StackTab.Navigator>
            <StackTab.Screen name='File Manager' component={FileSystem} initialRouteName="File Manager"
      activeColor="#e91e63"
      barStyle={{ backgroundColor: 'tomato' }} />
            <StackTab.Screen name='Folder' component={BottomTab}  options={{
                tabBarIcon:({color})=>(
                    <MaterialCommunityIcons color={'blue'} name='folder' size={26} />
                )
            }}/>
        </StackTab.Navigator>
    )
}
export default Stack;