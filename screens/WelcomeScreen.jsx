import { StyleSheet, Text, View } from 'react-native'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../store/auth-contex'

function WelcomeScreen() {
	const [fetchedMsg, setFetchedMsg] = useState('')

	const authCtx = useContext(AuthContext)
	const token = authCtx.token

	useEffect(() => {
		axios
			.get(
				'https://react-native-course-ad7ae-default-rtdb.firebaseio.com/message.json?auth=' + token
					
			)
			.then((response) => {
				setFetchedMsg(response.data)
			})
	}, [token])
	return (
		<View style={styles.rootContainer}>
			<Text style={styles.title}>Welcome!</Text>
			<Text>You authenticated successfully!</Text>
			<Text>{fetchedMsg}</Text>
		</View>
	)
}

export default WelcomeScreen

const styles = StyleSheet.create({
	rootContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 32,
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 8,
	},
})
