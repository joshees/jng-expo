import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = "jw-tk";
const API_TOKEN = "449ad3b3c974eac7a2ea561e4bdc7ea93a531333af6d268626ae74734d9da36cbb257b7e7be11ef6dcdaa0f40b04a081daf79c4348f21a88b217a87c81162f799f4516583002e961a9434eb5c6c5a93bf588c4d630411e55a489ea3ddfb8bfe18dbcd2a8efc7d620775dc640ca9be6e42e4ee85988f6ca4f99e3762419959fc0";
export const baseUrl = 'https://test.subclouds.com';
const AuthContext = createContext({});

export const useAuth = () => {
	return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
	const [authState, setAuthState] = useState({
		token: null,
		authenticated: null
	});

	useEffect(() => {
		const loadToken = async () => {
			const token = await SecureStore.getItemAsync(TOKEN_KEY);
			console.log("stored", token);
			if (token) {
				axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
				setAuthState({
					token: token,
					authenticated: true
				});
			} else { console.log("___NO USER LOGGED___") }
		};
		loadToken();
	}, []);

	// Register
	const register = async (email, password) => {
		try {
			return await axios.post(`${baseUrl}/api/users`, { email, password });
		} catch (error) {
			return { error: true, msg: error.response.data.msg };
		}
	};

	// Login
	const login = async (email, password) => {
		// console.log(`${email}-${password}`)
		try {
			const result = await axios.post('https://test.subclouds.com/api/auth/local',
				JSON.stringify({ email: email, password: password }),
				{
					headers: {
						'Content-Type': 'application/json', 'Authorization': `Bearer ${API_TOKEN}`,
					},
				})
				.then(response => {
					console.log('Response:', response.data);
				})
				.catch(error => {
					console.error('Error:', error);
				});

			console.log("__LOGIN___", result)

			return result;

			setAuthState({
				token: result.data.token,
				authenticated: true
			});
			axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.token}`; // TODO: check if jwt works
			await SecureStore.setItemAsync(TOKEN_KEY, result.data.token);
			return result;
		} catch (error) {
			return { error: true, msg: error.response.data.msg };
		}
	};

	const logout = async () => {
		// Delete token from storage
		await SecureStore.deleteItemAsync(TOKEN_KEY);
		// Update headers
		axios.defaults.headers.common['Authorization'] = '';
		// Reset auth state
		setAuthState({
			token: null,
			authenticated: false
		});
	};

	const value = {
		onRegister: register,
		onLogin: login,
		onLogout: logout,
		authState
	};

	return (
		<AuthContext.Provider value={value}>
			{children}
		</AuthContext.Provider>
	);
};
