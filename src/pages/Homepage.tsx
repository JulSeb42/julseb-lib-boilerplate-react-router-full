import { Text } from "@julseb-lib/react"
import { Page } from "components"
import { useAuth } from "context"

export const Homepage: FC = () => {
	const { isLoggedIn, isLoading, user } = useAuth()

	return (
		<Page title="Homepage" isLoading={isLoading}>
			<Text tag="h1">Hello World</Text>

			{isLoggedIn && (
				<Text>Hello {user?.fullName}, you are logged in!</Text>
			)}
		</Page>
	)
}
