import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';

export default function About() {
  const router = useRouter();
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>About Page</Text>
      <Text style={styles.description}>
        This StoryPath player is a way for you to interact with location-based experiences that have been authored by other users on the StoryPath Web App. To get started, navigate to the Welcome page in the app drawer. From there, sign in to your profile and explore the list of available projects!
      </Text>
      <Button onPress={() => router.push('/')} title='Get Started' style={styles.button} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    marginTop: 10,
  },
});
