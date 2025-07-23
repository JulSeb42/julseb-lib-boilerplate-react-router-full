import { Navigate } from "react-router-dom"
import { PageLoading } from "@julseb-lib/react"
import { useAuth } from "context"
import { PATHS } from "routes"

export const AnonRoute: FC<IAnonRoute> = ({
	children,
	redirectTo = PATHS.MY_ACCOUNT,
}) => {
	const { isLoggedIn, isLoading } = useAuth()

	if (isLoading) return <PageLoading />

	if (!isLoggedIn) return children

	return <Navigate to={redirectTo} />
}

interface IAnonRoute {
	children: Children
	redirectTo?: string
}
