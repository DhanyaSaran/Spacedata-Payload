import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { RFValue } from "react-native-responsive-fontsize";
import Ionicons from "react-native-vector-icons/Ionicons";
import History from "../screens/History";
import Payloads from "../screens/Payloads";


const Tab = createMaterialBottomTabNavigator();
           
const BottomTabNavigator = () => {
    return (
      
        <Tab.Navigator
        barStyle={  styles.bottomTabStyle}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color }) => {
                    let iconName;
                    if (route.name === 'History') {
                        iconName = focused
                            ? 'alarm'
                            : 'alarm-outline';
                    } else if (route.name === 'Payloads') {
                        iconName = focused ? 'create' : 'create-outline';
                    }
                    return <Ionicons name={iconName} size={RFValue(25)} color={color} style={styles.icons}/>;
                },
            })}

            activeColor={"#ee8249"}
            inactiveColor={"white"}
           
        >
            
            <Tab.Screen name="History" component={History} />
            <Tab.Screen name="Payloads" component={Payloads} />
        </Tab.Navigator>
    );
}

export default BottomTabNavigator


const styles = StyleSheet.create({
    bottomTabStyle: {
      backgroundColor: "#2f345d",
      height: "8%",
      borderTopLeftRadius: RFValue(30),
      borderTopRightRadius: RFValue(30),
      overflow: "hidden",
      position: "absolute",
      
    },
    
    icons: {
      width: RFValue(40),
      height: RFValue(40)
    }
  });