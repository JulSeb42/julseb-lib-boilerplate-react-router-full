import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ErrorMessage, Page, UserHeader } from "components"
import { NotFound } from "pages/NotFound"
import type { IErrorMessage, User } from "types"
import { userService } from "api"

export const UserProfile: FC = () => {
	const { id } = useParams()
	const [user, setUser] = useState<User>(undefined as any)
	const [isLoading, setIsLoading] = useState(true)
	const [errorMessage, setErrorMessage] = useState<IErrorMessage>(undefined)

	useEffect(() => {
		if (!user && id) {
			userService
				.getUser(id)
				.then(res => {
					setUser(res.data)
				})
				.catch(err => setErrorMessage(err.response.data.message))
				.finally(() => setIsLoading(false))
		}
	}, [user])

	if (!user) return <NotFound />

	return (
		<Page
			title={
				isLoading ? "Loading..." : errorMessage ? "404" : user?.fullName
			}
		>
			{errorMessage ? (
				<ErrorMessage>{errorMessage}</ErrorMessage>
			) : (
				<UserHeader user={user} isPublic />
			)}
		</Page>
	)
}
