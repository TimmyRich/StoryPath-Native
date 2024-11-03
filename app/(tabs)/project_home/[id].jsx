import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { getProject, getTrackingData, getLocations, getLocation } from '../../../components/RESTful';
import { ProjectContext } from '../_layout';
import { UserContext } from '../../_layout';
import { useFocusEffect } from '@react-navigation/native';
import WebView from 'react-native-webview';

export default function ProjectHome() {
  const [score, setScore] = useState(0);
  const { project, setProject } = useContext(ProjectContext);
  const [visited, setVisited] = useState([]);
  const [locations, setLocations] = useState([]);
  const { username } = useContext(UserContext);
  const { id, location_id } = useLocalSearchParams();
  const [targetLocation, setTargetLocation] = useState();

  useFocusEffect(
    React.useCallback(() => {
      const fetchVisitedLocations = async () => {
        try {
          const tracking_data = await getTrackingData(username, id);
          setVisited(tracking_data);
          const totalScore = tracking_data.reduce((acc, location) => acc + location.points, 0);
          setScore(totalScore);
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

      const fetchLocations = async () => {
        try {
          const locations = await getLocations(id);
          setLocations(locations);
        } catch (error) {
          console.error("Error Fetching Locations");
          console.error(error);
        }
      };

      const fetchTargetLocation = async () => {
        if (location_id) {
          try {
            const location = await getLocation(location_id);
            setTargetLocation(location[0]);
          } catch (error) {
            console.error("Error Fetching Location");
            console.error(error);
          }
        }
      };

      fetchProject();
      fetchVisitedLocations();
      fetchLocations();
      fetchTargetLocation();
    }, [username, id, location_id]) // include dependencies
  );

  const numLocations = locations.length;
  console.log(targetLocation);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Project Home</Text>
      <Text style={styles.title}>
        {targetLocation ? targetLocation.location_name : project?.title || "Fetching Project Title..."}
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Instructions:</Text>
        <Text style={styles.sectionContent}>
          {project ? project.instructions : "Fetching Project Instructions..."}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Clue:</Text>
        <Text style={styles.sectionContent}>
          {targetLocation ? targetLocation.clue : project?.initial_clue || "Fetching Initial Clue..."}
        </Text>
      </View>

      {targetLocation && (
        <View style={styles.webviewContainer}>
          <Text style={styles.sectionTitle}>Location Content:</Text>
          <WebView
            originWhitelist={['*']}
            source={{ html: targetLocation.location_content }}
            style={styles.webview}
          />
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Total Score:</Text>
        <Text style={styles.sectionContent}>
          {score}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Locations Visited:</Text>
        <Text style={styles.sectionContent}>
          {`${visited.length}/${numLocations}`}
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
  webviewContainer: {
    height: 200, // Set a fixed height for the WebView container
    marginBottom: 15,
  },
  webview: {
    flex: 1,
  },
});
