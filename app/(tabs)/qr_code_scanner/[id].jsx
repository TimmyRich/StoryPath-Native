
// Import necessary modules from React, React Native, and Expo
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { UserContext } from '../../_layout';
import { postTrackingData, getTrackingData, getLocations } from '../../../components/RESTful';
import { ProjectContext } from '../_layout';
import { router } from 'expo-router';

export default function QrCodeScanner() {
  const [scanned, setScanned] = useState(false);
  const [visited, setVisited] = useState([])
  const [permission, requestPermission] = useCameraPermissions();
  const {username} = useContext(UserContext)
  const { project } = useContext(ProjectContext)

  const fetchVisitedLocations = async () => {
    try {
      const tracking_data = await getTrackingData(username, project.id);
      const visitedLocations = tracking_data.map(data => data["location_id"])
      setVisited(visitedLocations)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchVisitedLocations()
  })

  if (!permission) {
    // Camera permissions are still loading
    return <View style={styles.container}><Text>Requesting permissions...</Text></View>;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant permission" />
      </View>
    );
  }

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    data = data.split('|')
    if (data[0] !=  project.id) {
      console.log('Missmathced project_ID')
      return
    }
    tracking_data = {
      project_id: data[0],
      location_id: data[1],
      points: data[2],
      participant_username: username
    }

    if (visited.some(location_id => location_id == tracking_data.location_id)) {
      console.log("Already Visited this Location")
      return
    }
    
    try {
      await postTrackingData(tracking_data);
      console.log(`Posted:`, tracking_data);
    } catch (error) {
      console.error('Error posting tracking data:', error);
    }

    // Route back to home page and display location details for the location just scanned
    router.push({
      pathname: `/project_home/${project.id}`,
      params: {
        location_id: tracking_data.location_id
      }
    })
  };

  return (
    <View style={styles.container}>
      <CameraView 
        style={styles.camera} 
        type='front'
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
      >
      </CameraView>
      {scanned && (
        <View style={styles.scanResultContainer}>
          <Button title="Tap to Scan Again" onPress={() => setScanned(false)} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  scanResultContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 15,
  },
  scanResultText: {
    fontSize: 16,
    marginBottom: 10,
  },
});