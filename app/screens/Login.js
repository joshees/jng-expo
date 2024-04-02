import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { useState } from 'react';
import { useAuth } from '../../AuthCtx';
import { SafeAreaView } from 'react-native-safe-area-context';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState('no status')
    const { onLogin } = useAuth();

    const login = async () => {
        const result = await onLogin(email, password);
        if (result && result.error) {
            alert(result.msg);
        }
        console.log("LOGIN_result", result);
        setStatus(result)
    };

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
            <Text> {status} </Text>
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

