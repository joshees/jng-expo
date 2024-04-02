import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

const Register = ({ navigation }) => {
    const { onRegister } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [phoneToken, setPhoneToken] = useState('')

    const register = async () => {
        const result = await onRegister(email, password, username, phoneToken);
        if (result && result.error) {
            alert(result.msg);
        } else {
            alert("User Sucessfully registered")
            navigation.navigate('Login');
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
                // defaultValue='email@email.com'
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                // defaultValue='passwordccsmsmms2123'
                />
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                // defaultValue='username123123123123'
                />
                <TextInput
                    style={styles.input}
                    placeholder="Phone Token"
                    value={phoneToken}
                    onChangeText={setPhoneToken}
                // defaultValue='0123929329'
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