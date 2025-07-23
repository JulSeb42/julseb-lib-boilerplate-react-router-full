import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
	Button,
	Flexbox,
	Form,
	Input,
	InputCheck,
	Text,
	emailRegex,
	passwordRegex,
	toast,
} from "@julseb-lib/react"
import { ErrorMessage, Page } from "components"
import { authService } from "api"
import { useAuth } from "context"
import { COMMON_TEXTS } from "data"
import type { LibValidationStatus } from "@julseb-lib/react/types"
import type { IErrorMessage, UserRole } from "types"

export const Login: FC = () => {
	const navigate = useNavigate()
	const { loginUser } = useAuth()

	const [inputs, setInputs] = useState({
		email: localStorage.getItem("email") ?? "",
		password: "",
	})
	const [savePassword, setSavePassword] = useState(true)
	const [validation, setValidation] = useState<{
		email: LibValidationStatus
		password: LibValidationStatus
	}>({ email: undefined, password: undefined })
	const [isLoading, setIsLoading] = useState(false)
	const [errorMessage, setErrorMessage] = useState<IErrorMessage>(undefined)

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target

		setInputs({ ...inputs, [id]: value })

		if (
			validation.email !== undefined ||
			validation.password !== undefined
		) {
			if (id === "email" && validation.email !== undefined) {
				if (emailRegex.test(value))
					setValidation({ ...validation, email: true })
				else setValidation({ ...validation, email: false })
			}

			if (id === "password" && validation.password !== undefined) {
				if (passwordRegex.test(value))
					setValidation({ ...validation, password: true })
				else setValidation({ ...validation, password: false })
			}
		}
	}

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault()
		setIsLoading(true)

		if (!inputs.email.length || !inputs.password.length) {
			setValidation({
				email: !inputs.email.length ? false : undefined,
				password: !inputs.password.length ? false : undefined,
			})
			return
		}

		if (savePassword) localStorage.setItem("email", inputs.email)

		authService
			.login(inputs)
			.then(res => {
				loginUser(res.data.authToken)
				toast.success("You are now logged in!")
			})
			.then(() => setTimeout(() => navigate("/my-account"), 300))
			.catch(err => {
				console.error(err)
				setErrorMessage(err.response.data.message)
			})
			.finally(() => setIsLoading(false))
	}

	return (
		<Page title="Login" mainSize="form">
			<Text tag="h1">Login</Text>

			<Form
				onSubmit={handleSubmit}
				isLoading={isLoading}
				buttonPrimary="Login"
			>
				<Input
					id="email"
					label="Email"
					type="email"
					value={inputs.email}
					onChange={handleChange}
					validation={{
						status: validation.email,
						message: COMMON_TEXTS.ERRORS.EMAIL_NOT_VALID,
					}}
				/>

				<Input
					id="password"
					label="Password"
					type="password"
					value={inputs.password}
					onChange={handleChange}
					validation={{
						status: validation.password,
						message: COMMON_TEXTS.ERRORS.PASSWORD_NOT_VALID,
					}}
				/>

				<InputCheck
					id="save"
					checked={savePassword}
					onChange={(e: ChangeEvent<HTMLInputElement>) =>
						setSavePassword(e.target.checked)
					}
					variant="toggle"
				>
					Save your email for faster login?
				</InputCheck>
			</Form>

			<ErrorMessage>{errorMessage}</ErrorMessage>

			<Text>
				<Link to="/forgot-password">I forgot my password.</Link>
			</Text>

			<DemoLogin setIsLoading={setIsLoading} />
		</Page>
	)
}

const DemoLogin: FC<{ setIsLoading: DispatchState<boolean> }> = ({
	setIsLoading,
}) => {
	const navigate = useNavigate()

	const { loginUser } = useAuth()

	const handleLogin = (role: UserRole) => {
		authService
			.login({
				email:
					role === "admin"
						? import.meta.env.VITE_DEMO_EMAIL_ADMIN
						: import.meta.env.VITE_DEMO_EMAIL_USER,
				password: import.meta.env.VITE_DEMO_PASSWORD,
			})
			.then(res => {
				loginUser(res.data.authToken)
				toast.success("You are now logged in!")
			})
			.then(() => setTimeout(() => navigate("/my-account"), 300))
			.catch(err => {
				console.error(err)
				toast.error("An error occurred, check console")
			})
			.finally(() => setIsLoading(false))
	}

	return (
		<>
			<Text tag="h4">Demo login</Text>

			<Flexbox gap="md" justifyContent="stretch">
				<Button
					onClick={() => handleLogin("admin")}
					className="justify-center justify-self-stretch w-full"
				>
					Login as admin
				</Button>

				<Button
					onClick={() => handleLogin("user")}
					className="justify-center justify-self-stretch w-full"
				>
					Login as user
				</Button>
			</Flexbox>
		</>
	)
}
