import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface TravelEntry {
  imageUri: string;
  address: string;
}

const AsyncStorageHandler = () => {
  const [travelEntries, setTravelEntries] = useState<TravelEntry[]>([]);

  // Load saved travel entries on app start
  useEffect(() => {
    const loadEntries = async () => {
      try {
        const value = await AsyncStorage.getItem('travelEntries');
        if (value !== null) {
          setTravelEntries(JSON.parse(value));
        }
      } catch (e) {
        console.log('Failed to load entries.');
      }
    };

    loadEntries();
  }, []);

  // Save new travel entry
  const saveEntry = async (entry: TravelEntry) => {
    try {
      const updatedEntries = [...travelEntries, entry];
      await AsyncStorage.setItem('travelEntries', JSON.stringify(updatedEntries));
      setTravelEntries(updatedEntries);
    } catch (e) {
      console.log('Failed to save entry.');
    }
  };

  // Remove a travel entry
  const removeEntry = async (index: number) => {
    try {
      const updatedEntries = travelEntries.filter((_, i) => i !== index);
      await AsyncStorage.setItem('travelEntries', JSON.stringify(updatedEntries));
      setTravelEntries(updatedEntries);
    } catch (e) {
      console.log('Failed to remove entry.');
    }
  };

  return { travelEntries, saveEntry, removeEntry };
};

export default AsyncStorageHandler;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    textAlign: 'center',
  },
});
