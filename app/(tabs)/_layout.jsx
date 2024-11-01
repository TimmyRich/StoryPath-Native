import { View, Text, Button } from 'react-native'
import React from 'react'
import { Tabs, router, useLocalSearchParams } from 'expo-router'
import { Feather } from '@expo/vector-icons';
import { DrawerToggleButton } from '@react-navigation/drawer';

export default function _layout() {

  // ID for selected project
  const {id} = useLocalSearchParams()

  return (
   <Tabs screenOptions={{headerLeft: () => <DrawerToggleButton tintColor='#000' />}}>
    <Tabs.Screen name='project_home' options={{
      tabBarIcon: ({color}) => (
        <Feather name="list" size={24} color={color} />
      ),
      tabBarLabel: 'Project Home',
      headerTitle: 'Project Home'
    }} />
    <Tabs.Screen name='map' options={{
      tabBarIcon: ({color}) => (
        <Feather name="list" size={24} color={color} />
      ),
      tabBarLabel: 'Map',
      headerTitle: 'Map'
    }} />
    <Tabs.Screen name='qr_code_scanner' options={{
      tabBarIcon: ({color}) => (
        <Feather name="list" size={24} color={color} />
      ),
      tabBarLabel: 'QR Code Scanner',
      headerTitle: 'QR Code Scanner'
    }} />
   </Tabs>
  )
}