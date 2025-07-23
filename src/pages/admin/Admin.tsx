import { Text } from "@julseb-lib/react"
import { AdminPage } from "components"
import { useAuth } from "context"

export const Admin: FC = () => {
	const { user } = useAuth()

	return (
		<AdminPage title="Admin">
			<Text tag="h1">Hello {user?.fullName}</Text>
		</AdminPage>
	)
}
