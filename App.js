import { Button } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './app/screens/Home'
import Register from './app/screens/Register'
import Login from './app/screens/Login'
import { AuthProvider, useAuth } from './app/context/AuthContext'

const Stack = createNativeStackNavigator();

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