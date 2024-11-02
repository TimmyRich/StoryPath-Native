import { View, Text, Button } from 'react-native'
import React, { useState, useEffect, createContext } from 'react'
import { Tabs, router, useLocalSearchParams } from 'expo-router'
import { Feather } from '@expo/vector-icons';
import { DrawerToggleButton } from '@react-navigation/drawer';

// provide project as context
export const ProjectContext = createContext()

export default function _layout() {

  // ID for selected project
  const {id} = useLocalSearchParams()

  // Store project in state
  const [project, setProject] = useState()

  return (
    <ProjectContext.Provider value={{project, setProject}}>
      <Tabs screenOptions={{headerLeft: () => <DrawerToggleButton tintColor='#000' />}}>
        <Tabs.Screen name='project_home/[id]' options={{
          tabBarIcon: ({color}) => (
            <Feather name="list" size={24} color={color} />
          ),
          tabBarLabel: 'Project Home',
          headerTitle: 'Project Home'
        }} />
        <Tabs.Screen name='map/[id]' options={{
          tabBarIcon: ({color}) => (
            <Feather name="list" size={24} color={color} />
          ),
          tabBarLabel: 'Map',
          headerTitle: 'Map'
        }} />
        <Tabs.Screen name='qr_code_scanner/[id]' options={{
          tabBarIcon: ({color}) => (
            <Feather name="list" size={24} color={color} />
          ),
          tabBarLabel: 'QR Code Scanner',
          headerTitle: 'QR Code Scanner'
        }} />
      </Tabs>
    </ProjectContext.Provider>
   
  )
}