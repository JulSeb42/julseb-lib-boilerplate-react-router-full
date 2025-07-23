import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { Text, Form, Input, passwordRegex, toast } from "@julseb-lib/react"
import { ErrorMessage, Page } from "components"
import { authService } from "api"
import { COMMON_TEXTS } from "data"
import type { LibValidationStatus } from "@julseb-lib/react/types"
import type { IErrorMessage } from "types"

export const ResetPassword: FC = () => {
	const navigate = useNavigate()
	const [searchParams] = useSearchParams()
	const id = searchParams.get("id")
	const token = searchParams.get("token")

	const [password, setPassword] = useState("")
	const [validation, setValidation] = useState<LibValidationStatus>(undefined)
	const [errorMessage, setErrorMessage] = useState<IErrorMessage>(undefined)
	const [isLoading, setIsLoading] = useState(false)

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value)

		if (!passwordRegex.test(e.target.value)) {
			setValidation(false)
		} else {
			setValidation(true)
		}
	}

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault()
		setIsLoading(true)

		if (!passwordRegex.test(password)) {
			setValidation(false)
			return
		}

		authService
			.resetPassword({ _id: id!, password, resetToken: token! })
			.then(res => toast.success(res.data.message))
			.then(() => setTimeout(() => navigate("/login")))
			.catch(err => {
				console.error(err)
				setErrorMessage(err.response.data.message)
			})
			.finally(() => setIsLoading(false))
	}

	return (
		<Page title="Reset your password" mainSize="form">
			<Text tag="h1">Reset your password</Text>

			<Form
				buttonPrimary="Save new password"
				buttonSecondary={{
					content: "Cancel",
					onClick: () => navigate("/login"),
				}}
				onSubmit={handleSubmit}
				isLoading={isLoading}
			>
				<Input
					label="New password"
					type="password"
					value={password}
					onChange={handleChange}
					validation={{
						status: validation,
						message: COMMON_TEXTS.ERRORS.PASSWORD_NOT_VALID,
					}}
				/>
			</Form>

			<ErrorMessage>{errorMessage}</ErrorMessage>
		</Page>
	)
}
