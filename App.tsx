import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import TravelEntryScreen from './screens/TravelEntryScreen';
import { ThemeProvider, useThemeContext } from './src/ThemeContext';
import { Button } from 'react-native';
import { StatusBar } from 'expo-status-bar'; // Import StatusBar
import * as Notifications from 'expo-notifications';

export type RootStackParamList = {
  Home: undefined;
  TravelEntry: undefined;
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
}); 

const Stack = createNativeStackNavigator<RootStackParamList>();

// App navigation wrapped in custom theme context
const AppNavigator = () => {
  const { isDark, toggleTheme } = useThemeContext();
  const theme = isDark ? DarkTheme : DefaultTheme;

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: isDark ? '#121212' : '#f8f8f8',
          },
          headerTitleStyle: {
            color: isDark ? '#ffffff' : '#000000',
          },
          headerTintColor: isDark ? '#ffffff' : '#000000',
          headerRight: () => (
            <Button
              onPress={toggleTheme}
              title={isDark ? '☀️' : '🌙'}
              color={isDark ? '#ffffff' : '#000000'}
            />
          ),
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Travel Diary' }} />
        <Stack.Screen name="TravelEntry" component={TravelEntryScreen} options={{ title: 'Add Travel Entry' }} />
      </Stack.Navigator>

      {/* Manually control the StatusBar */}
      <StatusBar style={isDark ? 'light' : 'dark'} />
    </NavigationContainer>
  );
};

// Root app wrapped in ThemeProvider
export default function App() {
  return (
    <ThemeProvider>
      <AppNavigator />
    </ThemeProvider>
  );
}
