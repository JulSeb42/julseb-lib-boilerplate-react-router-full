import { Navigate, Link } from "react-router-dom"
import { Text } from "@julseb-lib/react"
import { Page, UserHeader } from "components"
import { useAuth } from "context"
import { emptyUser } from "utils"

export const MyAccount: FC = () => {
	const { user } = useAuth()

	if (user?.role === "admin") return <Navigate to="/admin" />

	return (
		<Page title="My Account">
			<UserHeader user={user ?? emptyUser} />

			{!user?.verified && (
				<Text>
					You are not verified yet, please click the link we sent you
					by email.
				</Text>
			)}

			<Text>
				<Link to="/my-account/edit-account">Edit your account.</Link>
			</Text>
		</Page>
	)
}
