import { Text } from "@julseb-lib/react"
import { Page } from "components"

export const Goodbye: FC = () => {
	return (
		<Page title="Goodbye!">
			<Text tag="h1">We're sorry to see you go!</Text>

			<Text>Your account was deleted successfully.</Text>
		</Page>
	)
}
