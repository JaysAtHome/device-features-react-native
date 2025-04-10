import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import TravelEntryScreen from './screens/TravelEntryScreen';

export type RootStackParamList = {
  Home: undefined;
  TravelEntry: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Travel Diary' }} 
        />
        <Stack.Screen 
          name="TravelEntry" 
          component={TravelEntryScreen} 
          options={{ title: 'Add Travel Entry' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
