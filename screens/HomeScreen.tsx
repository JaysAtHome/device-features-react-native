import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, Button, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused, useNavigation } from '@react-navigation/native';

interface TravelEntry {
  imageUri: string;
  address: string;
}

const HomeScreen = () => {
  const [entries, setEntries] = useState<TravelEntry[]>([]);
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {
    const loadEntries = async () => {
      const stored = await AsyncStorage.getItem('entries');
      const parsed = stored ? JSON.parse(stored) : [];
      setEntries(parsed);
    };
  
    if (isFocused) {
      loadEntries();
    }
  }, [isFocused]);  

  const removeEntry = async (index: number) => {
    const updated = [...entries];
    updated.splice(index, 1);
    setEntries(updated);
    await AsyncStorage.setItem('entries', JSON.stringify(updated));
  };

  return (
    <View style={styles.container}>
      {entries.length === 0 ? (
        <Text style={styles.emptyText}>No Entries yet</Text>
      ) : (
        <FlatList
          data={entries}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.entry}>
              <Image source={{ uri: item.imageUri }} style={styles.image} />
              <Text style={styles.address}>{item.address}</Text>
              <Button title="Remove" color="red" onPress={() => removeEntry(index)} />
            </View>
          )}
        />
      )}

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('TravelEntry' as never)}
      >
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
  entry: {
    marginBottom: 20,
    alignItems: 'center',
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 10,
    marginBottom: 10,
  },
  address: {
    fontSize: 16,
    marginBottom: 5,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    backgroundColor: '#007AFF',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  fabIcon: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
});
