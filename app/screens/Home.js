import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Home = () => {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
      registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

      notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
          setNotification(notification);
      });

      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
          console.log(response);
      });

      return () => {
          Notifications.removeNotificationSubscription(notificationListener.current);
          Notifications.removeNotificationSubscription(responseListener.current);
      };
  }, []);
  return (
    <SafeAreaView>
      <Text>Home</Text>
    </SafeAreaView>
  )
}

export default Home