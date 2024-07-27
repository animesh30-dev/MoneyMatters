import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { ActivityIndicator, Settings, Text, View } from "react-native";
import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";
import { Suspense, useEffect, useState } from "react";
import { SQLiteProvider } from "expo-sqlite/next";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./screens/Home";
import SignInScreen from "./screens/SignInScreen";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
} from "firebase/auth";
import { auth } from "./firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserInfo } from "./types";
import SettingsScreen from "./screens/SettingsScreen";
import { getHeaderTitle } from '@react-navigation/elements';

WebBrowser.maybeCompleteAuthSession();
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const loadDatabase = async () => {
  const dbName = "mySQLiteDB.db";
  const dbAsset = require("./assets/mySQLiteDB.db");
  const dbUri = Asset.fromModule(dbAsset).uri;
  const dbFilePath = `${FileSystem.documentDirectory}SQLite/${dbName}`;

  const fileInfo = await FileSystem.getInfoAsync(dbFilePath);
  if (!fileInfo.exists) {
    await FileSystem.makeDirectoryAsync(
      `${FileSystem.documentDirectory}SQLite`,
      { intermediates: true }
    );
    await FileSystem.downloadAsync(dbUri, dbFilePath);
  }
};

export default function App() {
  const [dbLoaded, setddbLoaded] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "766362153685-audlprp7hen6qk5g89s3peeehrq5eku7.apps.googleusercontent.com",
  });
  React.useEffect(() => {
    if (response?.type == "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(
        response.params.id_token
      );
      signInWithCredential(auth, credential);
    }
  }, [response]);

  React.useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log(JSON.stringify(user, null, 2));
        setUserInfo(user);
      } else {
        console.log("no user");
      }
    });
    return () => unsub();
  }, [auth]);

  useEffect(() => {
    loadDatabase()
      .then(() => setddbLoaded(true))
      .catch((e) => console.log(e));
  }, []);

  if (!dbLoaded)
    return (
      <View style={{ flex: 1 }}>
        <ActivityIndicator size={"large"} />
        <Text>Loading... Please wait</Text>
      </View>
    );

  return (
    <NavigationContainer>
      <Suspense
        fallback={
          <View style={{ flex: 1 }}>
            <ActivityIndicator size={"large"} />
            <Text>Loading....</Text>
          </View>
        }
      >
        <SQLiteProvider databaseName="mySQLiteDB.db" useSuspense>
        <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={() => (
          <Stack.Navigator>
            <Stack.Screen
              name="Money Matters"
              component={Home}
              options={{
                title: "Money Matters",
                headerStyle: { backgroundColor: 'white' },
                headerTintColor: 'black',
                headerTitleStyle: { fontWeight: 'bold' },
                headerTitleAlign: 'center'
              }}
            />
            {/* Add other stack screens here if needed */}
          </Stack.Navigator>
        )}
      />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
        </SQLiteProvider>
      </Suspense>
    </NavigationContainer>
  );
  // : (
  //   <SignInScreen promptAsync={promptAsync} />
  // );
}
