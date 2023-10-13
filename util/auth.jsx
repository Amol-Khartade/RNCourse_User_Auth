import axios from 'axios'
import { Alert } from 'react-native'

const API_KEY = 'AIzaSyAVUVP0m1xwKv7XGZ6UmDA9-IxnRLlfV6A'

export async function authenticate(mode, email, password) {
	const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`
	try {
		const response = await axios.post(url, {
			email: email,
			password: password,
			returnSecureToken: true,
		})
		const token = response.data.idToken
		return token
	} catch (error) {
		console.error(`Error authenticating with mode ${mode}:`, error)
		throw error
	}
}

export async function createUser(email, password) {
	try {
		const token = await authenticate('signUp', email, password)
		console.log(response)
		return token
	} catch (error) {
		console.error('Error creating user:', error)
		throw error
	}
}

export async function login(email, password) {
	try {
		const token = await authenticate('signInWithPassword', email, password)
		return token
	} catch (error) {
		console.error('Error logging in:', error)
		throw error
	}
}
