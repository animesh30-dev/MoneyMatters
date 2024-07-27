import { signOut } from "firebase/auth";
import { Pressable, Text, View,StyleSheet } from "react-native";
import { auth } from "./../firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SettingsScreen() {
  return (
    <View style={styles.settingsContainer} >
      
    
     <Pressable
        onPress={async () => {
          await signOut(auth);
          await AsyncStorage.removeItem("@user");
        }}
        style={({ pressed }) =>
          pressed
            ? [styles.buttonInnerContainer, styles.pressed]
            : styles.buttonInnerContainer
        }
        android_ripple={{ color: "#527BAB" }}
      >
        <Text  style={styles.buttonText}> Sign Out !!</Text>
        </Pressable>
     </View>
  );
}

const styles = StyleSheet.create({
  settingsContainer:{
    flex:1,
    padding:16,
    margin:50,
    alignItems:'center',
    
  },
   buttonInnerContainer: {
    marginTop:16,
    backgroundColor: "#0E2137",
    borderRadius: 28,
    paddingVertical: 16,
    paddingHorizontal: 16,
    width:125,
    elevation: 2,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
  },
  pressed: {
    opacity: 0.75,
  },
  text:{
    fontSize:24,
    fontWeight:'600'}
  
});