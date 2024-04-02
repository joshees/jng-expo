import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';
import axios from "axios";

interface AuthProps {
	authState?: { token: string | null; authenticated: boolean | null }
	onRegister?: (email: string, password: string, username: string, phoneToken: string) => Promise<any>
	onLogin?: (email: string, password: string) => Promise<any>
	onLogout?: () => Promise<any>
}

const API_TOKEN = "12fe05a32343f4d73bedee39332d8b88737752e513c0571f49c12cff3bad820dfd7d75580dac19dc0c6c210637aa211327aacfe177f4de54fcc8ad585aa73e68235e4c1eb5b1ee06eeb92e6f3cd5e291d02ea3eed3e1b3dcc0e349f238eab4538f87f530daf5c3ea1222fe75550e56061f868d1125b136d5c9e7d0553c17c1f3";
const TOKEN_KEY = 'a-jwt';
export const baseUrl = 'https://test.subclouds.com';
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
	return useContext(AuthContext);
}

export const AuthProvider = ({ children }: any) => {
	const [authState, setAuthState] = useState<{
		token: string | null;
		authenticated: boolean | null;
	}>({
		token: null,
		authenticated: null
	});

	useEffect(() => {
		const loadToken = async () => {
			const token = await SecureStore.getItemAsync(TOKEN_KEY);
			console.log("stored", token);
			if (token) {
				// axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
				setAuthState({
					token: token,
					authenticated: true
				});
			} else { console.log("___NO USER LOGGED___") }
		};
		loadToken();
	}, []);


	const registerUser = async (email: string, password: string, username: string, phoneToken: string) => {
		console.log(`${email},${password}, ${username}, ${phoneToken}`);
		const reqBody = {
			email: email,
			password: password,
			username: username,
			phoneToken: phoneToken,
			provider: "local",
			role: 1
		};
		const options = {
			method: 'POST', // HTTP method
			headers: {
				'Content-Type': 'application/json', // Set content type to JSON
				'Authorization': `Bearer ${API_TOKEN}` // Set authorization token
			},
			body: JSON.stringify(reqBody), // Convert object data to JSON string
		};
		const response = await fetch(`${baseUrl}/api/users`, options);
		console.log(response)
		const result = await response.json();
		console.log(result)
		if (response.ok) {
			return result
		} else {
			return { error: true, msg: result.error?.message, details: result.error?.details };
		}	
	}

	const login = async (email: string, password: string) => {
		const requestBody = {
			identifier: email,
			password: password,
		}
		const options = {
			method: 'POST', // HTTP method
			headers: {
				'Content-Type': 'application/json', // Set content type to JSON
				'Authorization': `Bearer ${API_TOKEN}` // Set authorization token
			},
			body: JSON.stringify(requestBody), // Convert object data to JSON string
		};
		const response = await fetch(`${baseUrl}/api/auth/local`, options);
		console.log(response)
		const result = await response.json();
		console.log(result)
		if (response.ok) {
			setAuthState({
				token: result.jwt,
				authenticated: true,
			})
			await SecureStore.setItemAsync(TOKEN_KEY, result.jwt);
			return result
		} else {
			return { error: true, msg: result.error?.message, details: result.error?.details };
		}
	}

	const logout = async () => {
		// Delete token from storage
		await SecureStore.deleteItemAsync(TOKEN_KEY);
		// Reset auth state
		setAuthState({
			token: null,
			authenticated: false
		});
	};

	const value = {
		onRegister: registerUser,
		onLogin: login,
		onLogout: logout,
		authState
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}