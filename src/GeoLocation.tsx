import * as Location from 'expo-location';

// Fetch current coordinates with error handling
export const getCurrentCoordinates = async (): Promise<{ latitude: number; longitude: number } | null> => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Location permission is required to access your coordinates.');
      return null;
    }

    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });

    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
  } catch (error) {
    console.error('Error fetching location:', error);
    alert('Failed to fetch your location. Please try again later.');
    return null;
  }
};

// Fetch address from coordinates with error handling
export const getAddressFromCoords = async (
  latitude: number,
  longitude: number
): Promise<string> => {
  try {
    const geocode = await Location.reverseGeocodeAsync({ latitude, longitude });
    if (geocode.length === 0) {
      return 'Address not found';
    }

    const loc = geocode[0];
    const address = `${loc.name || 'Unknown location'}, ${loc.city || ''}, ${loc.region || ''} ${loc.postalCode || ''}`.trim();
    
    return address || 'Address not found';
  } catch (error) {
    console.error('Error reverse geocoding:', error);
    return 'Unable to retrieve address';
  }
};
