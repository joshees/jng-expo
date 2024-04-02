import { View, Text, Pressable, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { usePushNotifications } from '../../usePushNotifications';

const Home = () => {
  // ---- expo push notification setup
  const { expoPushToken, notification } = usePushNotifications();
  const data = JSON.stringify(notification, undefined, 2);

  // ----

  return (
    <SafeAreaView style={{ margin: 15 }}>
      <Text>Home</Text>
      {/* EXPO PUSH NOTIFICATION */}
      <View >
        <Text>Token: {expoPushToken?.data ?? ""}</Text>
        <Text>Notification: {data}</Text>
      </View>
      {/* --- */}
    </SafeAreaView>
  )
}

export default Home