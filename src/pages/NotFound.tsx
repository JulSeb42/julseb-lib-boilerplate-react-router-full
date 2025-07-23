import { Link } from "react-router-dom"
import { Text } from "@julseb-lib/react"
import { Page } from "components"
import { PATHS } from "routes"

export const NotFound: FC = () => {
	return (
		<Page title="404">
			<Text tag="h1">Page not found</Text>

			<Text>
				The page you're looking for does not exist.{" "}
				<Link to={PATHS.ROOT}>Back to homepage.</Link>
			</Text>
		</Page>
	)
}
