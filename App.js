import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserContextProvider } from './context/userContext';
import FirstPage from './pages/FirstPage';
import SecondPage from './pages/SecondPage';
import Thirdpage from './pages/Thirdpage';

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    // <View style ={styles.container}>
    <UserContextProvider>
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown : false}} name="FirstPage" component={FirstPage} />
      <Stack.Screen options={{ headerShown : false}} name="SecondPage" component={SecondPage} />
      <Stack.Screen options={{ headerShown : false}} name="Thirdpage" component={Thirdpage} />
    </Stack.Navigator>
  </NavigationContainer>
  </UserContextProvider>
  // </View>
  );
}


