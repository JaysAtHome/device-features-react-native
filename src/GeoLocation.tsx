import * as Location from 'expo-location';

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export const getCurrentCoordinates = async (): Promise<Coordinates | null> => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Location permission is required.');
      return null;
    }

    const locationData = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });

    return {
      latitude: locationData.coords.latitude,
      longitude: locationData.coords.longitude,
    };
  } catch (error) {
    console.error('Error getting coordinates:', error);
    return null;
  }
};

export const getAddressFromCoords = async (
  latitude: number,
  longitude: number
): Promise<string> => {
  try {
    const results = await Location.reverseGeocodeAsync({ latitude, longitude });
    if (!results.length) return 'Unknown address';

    const { name, city, region, postalCode } = results[0];

    const formatted = [name, city, region, postalCode].filter(Boolean).join(', ');
    return formatted || 'Unknown address';
  } catch (error) {
    console.error('Error fetching address:', error);
    return 'Error fetching address';
  }
};
