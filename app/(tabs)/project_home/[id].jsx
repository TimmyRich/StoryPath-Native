import { View, Text, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { getProject } from '../../../components/RESTful';

export default function ProjectHome() {
  const [project, setProject] = useState({})
  const {id} = useLocalSearchParams();

  // Fetch the selected project from the database and add them to the projects list
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const myProject = await getProject(id);
        setProject(myProject[0])
      } catch (error) {
        console.error("Error Fetching Project...")
        console.error(error)
      }
    };
    fetchProject(); // Call the fetch function on component mount
  }, [setProject]);

  console.log(project)
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <Text style={{fontSize:18}}>Project Home Page</Text>
      <Text>{`${project.title}`}</Text>
      <View>
        <Text>Instructions</Text>
        <Text>{project.instructions}</Text>
        <Text>Initial Clue</Text>
        <Text>{project.initial_clue}</Text>
      </View>
      <Text>{id}</Text>
    </View>
  )
}