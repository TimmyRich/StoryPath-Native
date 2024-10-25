import { View, Text, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { Drawer } from "expo-router/drawer";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Feather } from "@expo/vector-icons";
import { router, usePathname } from "expo-router";

const CustomDrawerContent = (props) => {
  const pathname = usePathname();

  useEffect(() => {
    console.log("Current Path", pathname);
  }, [pathname]);

  const username = "s4697223"

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.infoContainer}>
        <View style={styles.infoDetailsContainer}>
          <Text style={styles.appTitle}>StoryPath</Text>
        </View>
      </View>

      {/** Display User Profile Name here */}
      <View style={styles.infoContainer}>
          <Text style={styles.appTitle}>{`Current User: ${username}`}</Text>
        </View>
      
      <DrawerItem
        icon={({ color, size }) => (
          <Feather
            name="list"
            size={size}
            color={pathname == "/" ? "#fff" : "#000"}
          /> 
        )}
        label={"Welcome"}
        labelStyle={[
          styles.navItemLabel,
          { color: pathname == "/" ? "#fff" : "#000" },
        ]}
        style={{ backgroundColor: pathname == "/" ? "#333" : "#fff" }}
        onPress={() => {
          router.push("/");
        }}
      />
      <DrawerItem
        icon={({ color, size }) => (
          <Feather
            name="list"
            size={size}
            color={pathname == "/profile" ? "#fff" : "#000"}
          />
        )}
        label={"Profile"}
        labelStyle={[
          styles.navItemLabel,
          { color: pathname == "/profile" ? "#fff" : "#000" },
        ]}
        style={{ backgroundColor: pathname == "/profile" ? "#333" : "#fff" }}
        onPress={() => {
          router.push("/profile");
        }}
      />
      <DrawerItem
        icon={({ color, size }) => (
          <Feather
            name="list"
            size={size}
            color={pathname == "/projects" ? "#fff" : "#000"}
          />
        )}
        label={"Projects"}
        labelStyle={[
          styles.navItemLabel,
          { color: pathname == "/projects" ? "#fff" : "#000" },
        ]}
        style={{ backgroundColor: pathname == "/projects" ? "#333" : "#fff" }}
        onPress={() => {
          router.push("/projects");
        }}
      />
      <DrawerItem
        icon={({ color, size }) => (
          <Feather
            name="list"
            size={size}
            color={pathname == "/about" ? "#fff" : "#000"}
          />
        )}
        label={"About"}
        labelStyle={[
          styles.navItemLabel,
          { color: pathname == "/about" ? "#fff" : "#000" },
        ]}
        style={{ backgroundColor: pathname == "/about" ? "#333" : "#fff" }}
        onPress={() => {
          router.push("/about");
        }}
      />
    </DrawerContentScrollView>
  );
};

export default function Layout() {
  return (
    <Drawer drawerContent={(props) => <CustomDrawerContent {...props} />} screenOptions={{headerShown: false}}>
      <Drawer.Screen name="index" options={{headerShown: true, headerTitle: "Home"}}  />
      <Drawer.Screen name="profile" options={{headerShown: true, headerTitle: "Profile"}} />
      <Drawer.Screen name="projects" options={{headerShown: true, headerTitle: "Projects"}} />
      <Drawer.Screen name="about" options={{headerShown: true, headerTitle: "About"}} />
    </Drawer>
  );
}

const styles = StyleSheet.create({
  navItemLabel: {
    marginLeft: -20,
    fontSize: 18,
  },
  infoContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  infoDetailsContainer: {
    marginTop: 25,
    marginLeft: 10,
  },
  appTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  }
});
