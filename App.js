import { View, Text, Button } from 'react-native'
import React from 'react'
import { AuthProvider, useAuth } from './AuthCtx'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Home from './app/screens/Home'
import Register from './app/screens/Register'
import Login from './app/screens/Login'

const Stack = createNativeStackNavigator();

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});


export default function App() {
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
            <Stack.Navigator>
                {authState?.authenticated ? (
                    <Stack.Screen name="Home" component={Home}
                        options={{
                            headerRight: () => <Button onPress={onLogout} title="Sign Out" />
                        }}
                    ></Stack.Screen>
                ) :
                    <Stack.Screen name='Login' component={Login}></Stack.Screen>
                }
            </Stack.Navigator>
        </NavigationContainer>
    )
}