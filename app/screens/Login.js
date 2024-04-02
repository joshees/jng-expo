import { View, Text, TextInput, Pressable, StyleSheet, Button } from 'react-native'
import React from 'react'
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { usePushNotifications } from '../../usePushNotifications';
import { useAuth } from '../context/AuthContext';

const Login = ({ navigation }) => {
    // ---- expo push notification setup
    const { expoPushToken, notification } = usePushNotifications();
    const data = JSON.stringify(notification, undefined, 2);

    // ----
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { onLogin } = useAuth();

    const login = async () => {
        const result = await onLogin(email, password);
        if (result && result.error) {
            alert(result.msg);
        }
        console.log("LOGIN_result", result);
    };
    console.log("expoPushToken", expoPushToken)
    return (
        <SafeAreaView>
            <View>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                />
                <Pressable
                    style={({ pressed }) => [
                        styles.button,
                        {
                            backgroundColor: pressed ? 'lightgray' : 'steelblue',
                        },
                    ]}
                    onPress={login}>
                    <Text style={styles.buttonText}> Login </Text>
                </Pressable>
            </View>
            <Pressable
                style={({ pressed }) => [
                    styles.button,
                    {
                        backgroundColor: pressed ? 'lightgray' : 'red',
                    },
                ]}
                onPress={() => navigation.navigate('Register')}>
                <Text style={styles.buttonText}> Register </Text>
            </Pressable>

            {/* EXPO PUSH NOTIFICATION */}
            <View style={{ marginLeft: 15 }}>
                <Text>Token: {expoPushToken?.data ?? ""}</Text>
                <Text>Notification: {data}</Text>
            </View>
            {/* --- */}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    button: {
        margin: 12,
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default Login

