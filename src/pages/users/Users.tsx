import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { usePaginatedData, Text } from "@julseb-lib/react"
import { ErrorMessage, Page, Pagination, UserCard } from "components"
import { userService } from "api"
import type { IErrorMessage, User } from "types"

export const Users: FC = () => {
	const [searchParams] = useSearchParams()
	const page = searchParams.get("page") ?? 1

	const [users, setUsers] = useState<Array<User>>(undefined as any)
	const [isLoading, setIsLoading] = useState(true)
	const [errorMessage, setErrorMessage] = useState<IErrorMessage>(undefined)

	useEffect(() => {
		if (!users) {
			userService
				.allUsers()
				.then(res => setUsers(res.data))
				.catch(err => setErrorMessage(err.response.data.message))
				.finally(() => setIsLoading(false))
		}
	}, [users])

	const { paginatedData, totalPages } = usePaginatedData(users, Number(page))

	return (
		<Page title="Users" isLoading={isLoading}>
			<Text tag="h1">Users</Text>

			{errorMessage ? (
				<ErrorMessage>{errorMessage}</ErrorMessage>
			) : users?.length ? (
				<div className="gap-4 grid grid-cols-4">
					{paginatedData.map(user => (
						<UserCard user={user} key={user._id} />
					))}
				</div>
			) : (
				<Text>No user yet.</Text>
			)}

			<Pagination totalPages={totalPages} currentPage={Number(page)} />
		</Page>
	)
}
