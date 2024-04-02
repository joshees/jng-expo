import { View, Text, TextInput } from 'react-native'
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
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                />
                <TextInput
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                />
                <TextInput
                    placeholder="Phone Number"
                    value={phNumber}
                    onChangeText={setPhNumber}
                    keyboardType="phone-pad"
                />
                <Pressable onPress={register}>
                    <Text> Register </Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

export default Register