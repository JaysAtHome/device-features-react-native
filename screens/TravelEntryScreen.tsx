import React, { useEffect, useState } from 'react';
import { View, Text, Button, Image, StyleSheet, SafeAreaView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useTheme } from '../src/ThemeContext'; // Import the useTheme hook

const TravelEntryScreen = () => {
  const { theme } = useTheme(); // Get the current theme
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [address, setAddress] = useState<string>('');
  const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);
  const navigation = useNavigation();

  const takePicture = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Camera permission is required to take pictures.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImageUri(uri);
      getLocationAndAddress();
    }
  };

  const getLocationAndAddress = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access location was denied.');
      return;
    }

    const locationData = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });
    setLocation(locationData.coords);

    const addressData = await Location.reverseGeocodeAsync({
      latitude: locationData.coords.latitude,
      longitude: locationData.coords.longitude,
    });

    const { name, city, region, postalCode } = addressData[0];
    const fullAddress = `${name}, ${city}, ${region} ${postalCode}`;
    setAddress(fullAddress);
  };

  const handleSave = async () => {
    if (!imageUri || !address) return;

    try {
      const newEntry = { imageUri, address };
      const stored = await AsyncStorage.getItem('entries');
      const parsed = stored ? JSON.parse(stored) : [];

      parsed.push(newEntry);
      await AsyncStorage.setItem('entries', JSON.stringify(parsed));

      // Send notification
      await sendNotification();

      // Reset local state
      setImageUri(null);
      setAddress('');

      // Navigate back to Home
      navigation.goBack();
    } catch (e) {
      console.error('Error saving entry:', e);
    }
  };

  const sendNotification = async () => {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'New Travel Entry',
          body: 'You have successfully added a new travel entry!',
          sound: 'default',
        },
        trigger: null, // Immediate notification
      });
    } catch (e) {
      console.error('Failed to send notification:', e);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        setImageUri(null);
        setAddress('');
        setLocation(null);
      };
    }, [])
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={styles.container}>
        <Button title="Take a Picture" onPress={takePicture} color={theme.colors.primary} />
        {imageUri && (
          <>
            <Image source={{ uri: imageUri }} style={styles.image} />
            <Text style={[styles.address, { color: theme.colors.text }]}>{address}</Text>
            <Button title="Save Entry" onPress={handleSave} color={theme.colors.primary} />
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default TravelEntryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    justifyContent: 'center',
  },
  image: {
    width: 250,
    height: 250,
    marginVertical: 20,
    borderRadius: 10,
  },
  address: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
});
