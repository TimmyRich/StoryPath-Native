import { View, Text, Button } from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { getProject } from '../../../components/RESTful';

export default function ProjectHome() {
  const [project, setProject] = useState({})
  const {id} = useLocalSearchParams();

  

  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <Text style={{fontSize:18}}>Project Home Page</Text>
      <Text>{id}</Text>
    </View>
  )
}