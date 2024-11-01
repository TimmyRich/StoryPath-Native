// Import necessary modules from React, React Native, and Expo
import React, { useContext, useState } from "react";
import { SafeAreaView, View, Image, TextInput, Dimensions, Button } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { UserContext } from "./_layout";

// Get the screen width for styling
const { width } = Dimensions.get("window");

// Define the styles for the components
const styles = {
    container: {
        padding: 20,
        alignItems: "center", // Center the content horizontally
    },
    photoFullView: {
        marginBottom: 20,
        width: width * 0.5, // Adjust the circle size to 50% of the screen width
        height: width * 0.5,
        borderRadius: width * 0.25, // Make the border radius half of the width for a circle
        overflow: "hidden", // Ensure the image stays within the circle
        justifyContent: "center", // Center content within the circle
        alignItems: "center",
    },
    photoEmptyView: {
        width: width * 0.5,
        height: width * 0.5,
        borderRadius: width * 0.25,
        borderWidth: 3,
        borderColor: "#999",
        borderStyle: "dashed",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },
    photoFullImage: {
        width: "100%",
        height: "100%",
        borderRadius: width * 0.25, // Ensures the image itself is circular
    },
    buttonView: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
    },
    input: {
      width: '80%',
      height: 40,
      borderColor: '#ccc',
      borderWidth: 1,
      paddingHorizontal: 10,
      marginBottom: 20,
      marginTop: 30, // Add space above the input field
    }
};

// Main App component
export default function App() {
    const [photoState, setPhotoState] = useState({});
    const {username, setUsername} = useContext(UserContext)

    async function handleChangePress() {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            setPhotoState(result.assets[0]);
        }
    }

    async function handleRemovePress() {
        setPhotoState({});
    }

    const hasPhoto = Boolean(photoState.uri);

    function Photo(props) {
        if (hasPhoto) {
            return (
                <View style={styles.photoFullView}>
                    <Image
                        style={styles.photoFullImage}
                        resizeMode="cover"
                        source={{ uri: photoState.uri }}
                    />
                </View>
            );
        } else {
            return <View style={styles.photoEmptyView} />;
        }
    }

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Photo />
                <View style={styles.buttonView}>
                    <Button
                        onPress={handleChangePress}
                        title={hasPhoto ? "Change Photo" : "Add Photo"}
                    />
                    {hasPhoto && <Button onPress={handleRemovePress} title="Remove Photo" />}
                </View>
                {/* Username Input */}
            <TextInput
              style={styles.input}
              placeholder="Enter your username"
              value={username}
              onChangeText={setUsername}
            />
            </View>
            
        </SafeAreaView>
    );
}
