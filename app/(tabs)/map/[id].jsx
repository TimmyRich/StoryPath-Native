import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import MapView, { Marker } from 'react-native-maps';

export default function Map() {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>Map Goes Here:</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,   // Set this to any default lat/lng you prefer
          longitude: -122.4324, // Example coordinates for San Francisco
          latitudeDelta: 0.0922, // Zoom levels
          longitudeDelta: 0.0421,
        }}
      >
        {/* Example of a marker you can add */}
        <Marker
          coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
          title="Marker Title"
          description="Marker Description"
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%', // Full width of the screen
    height: 400,   // Define the height you want for the map
  },
});
