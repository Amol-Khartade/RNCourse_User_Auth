import React, { useContext, useState } from 'react'
import { Alert } from 'react-native'

import AuthContent from '../components/Auth/AuthContent'
import { login } from '../util/auth'
import LoadingOverlay from '../components/UI/LoadingOvarlay'
import { AuthContext } from '../store/auth-contex'

function LoginScreen() {
	const [isAuthenticating, setIsAuthenticating] = useState(false)
	const authCtx = useContext(AuthContext)

	async function loginHandler({ email, password }) {
		setIsAuthenticating(true)
		try {
			const token = await login(email, password)
			authCtx.authenticate(token)
		} catch (error) {
			Alert.alert(
				'Authentication Error !',
				'Could not login you in. Please check your credentials & try again'
			)
		}
		setIsAuthenticating(false)
	}

	if (isAuthenticating) {
		return <LoadingOverlay message="Logging you in..." />
	}
	return <AuthContent isLogin={true} onAuthenticate={loginHandler} />
}

export default LoginScreen
