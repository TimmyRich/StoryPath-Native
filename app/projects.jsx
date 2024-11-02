import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { getProjects } from '../components/RESTful';
import { getProjectParticipantCount } from '../components/RESTful';

export default function Projects() {
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const myProjects = await getProjects();
        const publishedProjects = myProjects.filter((project) => project.is_published === true);
        
        // Fetch participant counts for each published project
        const updatedProjects = await Promise.all(
          publishedProjects.map(async (project) => {
            try {
              let participant_count = await getProjectParticipantCount(project.id);
              participant_count = participant_count[0]? participant_count[0]["number_participants"] : 0
              return { ...project, participant_count: participant_count }; // Add the count to the project object
            } catch (error) {
              console.error("Error when getting participant counts:", error);
              return { ...project, participant_count: 0 }; // Handle error case
            }
          })
        );

        setProjects(updatedProjects); // Update state with the updated project array
        console.log("Fetched Projects:", updatedProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, [refresh]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Projects Page</Text>

      <TouchableOpacity style={styles.refreshButton} onPress={() => setRefresh(!refresh)}>
        <Text style={styles.refreshButtonText}>Refresh Projects</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.projectList}>
        {projects.map((project, index) => (
          <TouchableOpacity
            key={index}
            style={styles.projectButton}
            onPress={() => router.push(`/project_home/${project.id}`)}
          >
            <Text style={styles.projectButtonText}>{`${project.title} | Participants: ${project.participant_count}`}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f0f4f7',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  refreshButton: {
    backgroundColor: '#5cb85c',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  refreshButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  projectList: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 10,
  },
  projectButton: {
    backgroundColor: '#007bff',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginVertical: 5,
    width: '100%',
    alignItems: 'center',
  },
  projectButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  backButton: {
    backgroundColor: '#6c757d',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 15,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
