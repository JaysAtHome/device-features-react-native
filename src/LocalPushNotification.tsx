import * as Notifications from 'expo-notifications';

// Function to schedule a local notification
export const sendNotification = async (): Promise<void> => {
  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'New Travel Entry',
        body: 'You have successfully added a new travel entry!',
        sound: 'default', // Play default notification sound
      },
      trigger: null, // This ensures the notification is sent immediately (no delay)
    });
  } catch (error) {
    console.error('Failed to send notification:', error);
    alert('There was an issue sending your notification. Please try again.');
  }
};

// Function to request notification permissions (if needed)
export const requestNotificationPermission = async (): Promise<boolean> => {
  try {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('Notification permission is required to send notifications.');
      return false;
    }
    return true;
  } catch (error) {
    console.error('Failed to request notification permission:', error);
    alert('There was an issue requesting notification permissions. Please try again.');
    return false;
  }
};
