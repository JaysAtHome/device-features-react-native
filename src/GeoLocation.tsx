import * as Location from 'expo-location';

export const getCurrentCoordinates = async (): Promise<{ latitude: number; longitude: number } | null> => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    alert('Location permission is required.');
    return null;
  }

  const location = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.High,
  });

  return {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
  };
};

export const getAddressFromCoords = async (latitude: number, longitude: number): Promise<string> => {
  const geocode = await Location.reverseGeocodeAsync({ latitude, longitude });
  const loc = geocode[0];
  return `${loc.name}, ${loc.city}, ${loc.region} ${loc.postalCode}`;
};
