import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Text, Button } from 'react-native-paper';
import { loginURL } from '../common/url';
import { theme } from '../common/theme';
import { login } from './auth';
import { useDispatch } from 'react-redux';
import { authLogin } from './slice';

export const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
	const dispatch = useDispatch();

	let timeout: number | null;
	const sayError = (text: string) => {
		clearTimeout(timeout!);
		setError(text);
		timeout = setTimeout(() => setError(''), 2000) as any;
	}

  const handleLogin = () => username.length && password.length ? login(
		username,
		password,
		(data: any) => dispatch(authLogin({...data, save: true})),
		() => sayError('Wrong password or username')
	) : sayError('Please fill both fields');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
				<Text style={{
					...styles.title,
					color: theme.colors.secondary
				}}>Scriff</Text> Login
			</Text>

			<Text style={{
				marginBottom: 10,
				textAlign: 'center',
				color: theme.colors.error
			}}>{error}</Text>

      <TextInput
        label="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
        style={styles.input}
				mode='outlined'
      />

      <TextInput
        label="Password"
        value={password}
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        style={styles.input}
				mode='outlined'
      />

      <Button
        mode="contained"
        onPress={handleLogin}
        style={styles.loginButton}
      >
        Login
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
		width: 300,
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 14,
    textAlign: 'center'
  },
  input: {
    marginBottom: 16,
  },
  loginButton: {
    marginTop: 16,
  },
});

export default LoginPage;
