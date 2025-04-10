import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView, StatusBar, View, Switch } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import TravelEntryScreen from './screens/TravelEntryScreen';
import { useTheme, ThemeProvider } from './src/ThemeContext'; // Import the ThemeProvider and useTheme

export type RootStackParamList = {
  Home: undefined;
  TravelEntry: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <ThemeProvider> {/* Ensure ThemeProvider wraps the entire app */}
      <AppContent />
    </ThemeProvider>
  );
}

function AppContent() {
  const { theme, mode, toggleTheme } = useTheme(); // Get the theme and mode from the context

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <StatusBar
        barStyle={mode === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
      />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: 'Travel Diary',
              headerRight: () => (
                <View style={{ marginRight: 10 }}>
                  {/* Switch component for theme toggle */}
                  <Switch
                    value={mode === 'dark'}
                    onValueChange={toggleTheme} // Toggle theme on value change
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={mode === 'dark' ? '#f5dd4b' : '#f4f3f4'}
                  />
                </View>
              ),
            }}
          />
          <Stack.Screen
            name="TravelEntry"
            component={TravelEntryScreen}
            options={{ title: 'Add Travel Entry' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
