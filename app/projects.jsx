import { View, Text, Button, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { getProjects } from '../components/RESTful';

export default function Projects() {
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const myProjects = await getProjects();
        setProjects(myProjects.filter((project) => project.is_published === true));
        console.log("Fetched Projects:", myProjects);
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
            <Text style={styles.projectButtonText}>{project.title}</Text>
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
