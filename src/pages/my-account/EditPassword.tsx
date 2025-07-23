import { Navigate } from "react-router-dom"
import { Text } from "@julseb-lib/react"
import { Page } from "components"
import { useAuth } from "context"
import { EditPasswordForm } from "./forms"

export const EditPassword: FC = () => {
	const { user } = useAuth()

	if (user?.role === "admin")
		return <Navigate to="/admin/edit-account/edit-password" />

	return (
		<Page title="Edit Password" mainSize="form">
			<Text tag="h1">Edit Password</Text>

			<EditPasswordForm />
		</Page>
	)
}
