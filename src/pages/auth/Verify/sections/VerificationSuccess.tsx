import { Link } from "react-router-dom"
import { Text } from "@julseb-lib/react"
import { Page } from "components"

export const VerificationSuccess: FC = () => {
	return (
		<Page title="Verify your account">
			<Text tag="h1">Your account is verifed!</Text>

			<Text>
				You can now access all the functionalities on our website.{" "}
				<Link to="/my-account">Go to your account</Link>.
			</Text>
		</Page>
	)
}
