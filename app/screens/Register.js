import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { useAuth } from '../../AuthCtx'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'

const Register = () => {
    const { onRegister } = useAuth
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [phNumber, setPhNumber] = useState('')

    const register = async () => {
        const result = await onRegister(email, password, username, phNum);
        if (result && result.error) {
            alert(result.msg);
        }
    }

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
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Phone Number"
                    value={phNumber}
                    onChangeText={setPhNumber}
                    keyboardType="phone-pad"
                />
            <Pressable
                style={({ pressed }) => [
                    styles.button,
                    {
                        backgroundColor: pressed ? 'lightgray' : 'maroon',
                    },
                ]}
                onPress={register}>
                <Text style={styles.buttonText}> Register </Text>
            </Pressable>
            </View>
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

export default Register