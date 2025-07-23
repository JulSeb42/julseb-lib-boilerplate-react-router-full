import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { useAuth } from "context"
import { authService } from "api"
import {
	NotLoggedIn,
	VerificationFailed,
	VerificationSkeleton,
	VerificationSuccess,
} from "./sections"
import type { IErrorMessage } from "types"

export const Verify: FC = () => {
	const [searchParams] = useSearchParams()
	const id = searchParams.get("id")
	const token = searchParams.get("token")

	const { user, setUser, isLoggedIn, setToken } = useAuth()

	const [isLoading, setIsLoading] = useState(true)
	const [errorMessage, setErrorMessage] = useState<IErrorMessage>(undefined)

	useEffect(() => {
		if (isLoggedIn !== null && isLoading) {
			if (id && token && isLoggedIn) {
				authService
					.verify(id, token)
					.then(res => {
						setUser(res.data.user)
						setToken(res.data.authToken)
					})
					.catch(err => {
						console.error(err)
						setErrorMessage(err)
					})
					.finally(() => setIsLoading(false))
			} else if (!id || !token) {
				if (!id)
					setErrorMessage([
						...(errorMessage as Array<string>),
						"ID is missing",
					])
				if (!token)
					setErrorMessage([
						...(errorMessage as Array<string>),
						"Token is missing",
					])
				setIsLoading(false)
			} else if (!isLoggedIn) {
				setErrorMessage("You are not logged in.")
				setIsLoading(false)
			}
		}
	}, [id, isLoggedIn, isLoading, setToken, setUser, token, user])

	if (!isLoggedIn) return <NotLoggedIn />

	if (isLoading) return <VerificationSkeleton />

	if (errorMessage) return <VerificationFailed errorMessage={errorMessage} />

	return <VerificationSuccess />
}
