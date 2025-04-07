import { StyleSheet, Text, View, StatusBar } from 'react-native';
import CameraScreen from './src/Camera';
import GeolocationScreen from './src/GeoLocation';
import NotificationScreen from './src/LocalPushNotification';
import AsyncStorage from './src/AsycnStorage';

export default function App() {
  return (
    <View style={styles.container}>
      <CameraScreen></CameraScreen>
      {/* <GeolocationScreen></GeolocationScreen> */}
      {/* <NotificationScreen></NotificationScreen> */}
      {/* <AsyncStorageTest></AsyncStorageTest> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});