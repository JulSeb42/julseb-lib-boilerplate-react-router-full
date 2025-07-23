import { Link, Navigate } from "react-router-dom"
import { Text } from "@julseb-lib/react"
import { Page } from "components"
import { useAuth } from "context"
import { EditAccountForm, DeleteAccount } from "./forms"

export const EditAccount: FC = () => {
	const { user } = useAuth()

	if (user?.role === "admin") return <Navigate to="/admin/edit-account" />

	return (
		<Page title="Edit your account" mainSize="form">
			<Text tag="h1">Edit your account</Text>

			<EditAccountForm />

			<Text>
				<Link to="/my-account/edit-account/edit-password">
					Edit your password.
				</Link>
			</Text>

			<DeleteAccount />
		</Page>
	)
}
