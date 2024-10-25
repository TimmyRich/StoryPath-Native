import { Text, View } from "react-native";
import ShowMap from "../components/ShowMap";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Welcome Page</Text>
      <ShowMap/>
    </View>
  );
}
