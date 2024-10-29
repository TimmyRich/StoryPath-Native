import { View, Text, Button } from 'react-native';
import React, { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { getProjects } from '../components/RESTful'

export default function Projects() {
  const router = useRouter();

  // State to hold the list of projects and the project to be edited
  const [projects, setProjects] = useState([]);

  // Fetch all projects from the database and add them to the projects list
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const myProjects = await getProjects();
        setProjects(myProjects.filter((project) => project.is_published === true));
        console.log("Fetched Projects:", myProjects); // Log after setting the state
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects(); // Call the fetch function on component mount
  }, []);
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View>
        <Text style={{ fontSize: 18, paddingVertical: 10 }}>Projects Page</Text>
        {projects.map( (project, index) => (
          <View style={{ paddingVertical: 10 }} key={index}>
            <Button onPress={() => router.push("/project_home")} title={project.title}/>
          </View>
        ))}
        

        <View style={{ paddingVertical: 10 }}>
          <Button onPress={() => router.back()} title="Go Back" />
        </View>
      </View>
    </View>
  );
}
