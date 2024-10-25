import { View, Text, Button } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';

export default function Projects() {
  const router = useRouter();
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View>
        <Text style={{ fontSize: 18, paddingVertical: 10 }}>Projects Page</Text>

        <View style={{ paddingVertical: 10 }}>
          <Button onPress={() => router.push(`/(tabs)/project_home`)} title="Project 1" />
        </View>

        <View style={{ paddingVertical: 10 }}>
          <Button onPress={() => router.back()} title="Go Back" />
        </View>
      </View>
    </View>
  );
}
