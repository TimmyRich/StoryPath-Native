import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { getProject } from '../../../components/RESTful';
import { ProjectContext } from '../_layout';
import { getTrackingData } from '../../../components/RESTful';
import { UserContext } from '../../_layout';
import { useFocusEffect } from '@react-navigation/native';

export default function ProjectHome() {
  const [score, setScore] = useState(0);
  const { project, setProject } = useContext(ProjectContext);
  const { username } = useContext(UserContext);
  const { id } = useLocalSearchParams();

  useFocusEffect(
    React.useCallback(() => {
      const fetchVisitedLocations = async () => {
        try {
          const tracking_data = await getTrackingData(username, id);
          const totalScore = tracking_data.reduce((acc, location) => acc + location.points, 0);
          setScore(totalScore);
          console.log(tracking_data);
        } catch (error) {
          console.error(error);
        }
      };

      const fetchProject = async () => {
        try {
          const myProject = await getProject(id);
          setProject(myProject[0]);
        } catch (error) {
          console.error("Error Fetching Project...");
        }
      };

      fetchProject();
      fetchVisitedLocations();
    }, [username, id]) // include dependencies
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Project Home</Text>
      <Text style={styles.title}>
        {project ? project.title : "Fetching Project Title..."}
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Instructions</Text>
        <Text style={styles.sectionContent}>
          {project ? project.instructions : "Fetching Project Instructions..."}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Initial Clue</Text>
        <Text style={styles.sectionContent}>
          {project ? project.initial_clue : "Fetching Initial Clue..."}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Total Score</Text>
        <Text style={styles.sectionContent}>
          {score}
        </Text>
      </View>

      {project ? null : <ActivityIndicator size="large" color="#000" />}
      <Text style={styles.projectId}>Project ID: {id}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  sectionContent: {
    fontSize: 14,
    color: '#555',
  },
  projectId: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
    marginTop: 10,
  },
});
