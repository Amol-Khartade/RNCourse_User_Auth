import { Alert } from 'react-native'
import React, { useContext, useState } from 'react'

import AuthContent from '../components/Auth/AuthContent'
import { createUser } from '../util/auth'
import LoadingOverlay from '../components/UI/LoadingOvarlay'
import { AuthContext } from '../store/auth-contex'

function SignupScreen() {
	const [isAuthenticating, setIsAuthenticating] = useState(false)

	const authCtx = useContext(AuthContext)

	async function signupHandler({ email, password }) {
		setIsAuthenticating(true)
		try {
			const token = await createUser(email, password)
			authCtx.authenticate(token)
		} catch (error) {
			Alert.alert(
				'Authentication Error !',
				'Could not create user. Please check your inputs & try again'
			)
			setIsAuthenticating(false)
		}
	}

	if (isAuthenticating) {
		return <LoadingOverlay message="Creating User..." />
	}

	return <AuthContent isLogin={false} onAuthenticate={signupHandler} />
}

export default SignupScreen
