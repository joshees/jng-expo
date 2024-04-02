import { View, Text, Button } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { AuthProvider, useAuth } from './AuthCtx'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Home from './app/screens/Home'
import Register from './app/screens/Register'
import Login from './app/screens/Login'
import registerForPushNotificationsAsync from './services/notifications'

const Stack = createNativeStackNavigator();

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});


export default function App() {
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
        <AuthProvider>
            <Layout></Layout>
        </AuthProvider>

    )
};

export const Layout = () => {
    const { authState, onLogout } = useAuth();
    return (
        <NavigationContainer>
            {authState?.authenticated ? (
                <Stack.Navigator>

                    <Stack.Screen name="Home" component={Home}
                        options={{
                            headerRight: () => <Button onPress={onLogout} title="Sign Out" />
                        }}
                    ></Stack.Screen>
                </Stack.Navigator>

            ) :
                <Stack.Navigator>
                    <Stack.Screen name='Login' component={Login}></Stack.Screen>
                    <Stack.Screen name='Register' component={Register}></Stack.Screen>

                </Stack.Navigator>
            }
        </NavigationContainer>
    )
}