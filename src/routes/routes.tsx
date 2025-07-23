import type { ReactNode } from "react"
// import { Navigate } from "react-router-dom"
import { PATHS } from "./paths"
import {
	Homepage,
	NotFound,
	Users,
	UserProfile,
	Signup,
	ThankYou,
	Verify,
	Login,
	ForgotPassword,
	ForgotSent,
	ResetPassword,
	Goodbye,
	MyAccount,
	EditAccount,
	EditPassword,
	Admin,
	AdminUsers,
	AdminEditAccount,
	AdminEditPassword,
	/* Prepend import - DO NOT REMOVE */
} from "pages"
import type { LinkType } from "types"

type Route = {
	path: string
	element: ReactNode
	type: LinkType
}

const redirects: Array<Route> = [
	// { path: "", element: <Navigate to="" />, type: "none" },
]

export const routes: Array<Route> = [
	{ path: PATHS.ROOT, element: <Homepage />, type: "none" },
	{ path: PATHS.NOT_FOUND, element: <NotFound />, type: "none" },

	{ path: PATHS.USERS, element: <Users />, type: "none" },
	{ path: PATHS.USER(), element: <UserProfile />, type: "none" },

	{ path: PATHS.SIGNUP, element: <Signup />, type: "anon" },
	{ path: PATHS.THANK_YOU, element: <ThankYou />, type: "protected" },
	{ path: PATHS.VERIFY, element: <Verify />, type: "none" },
	{ path: PATHS.LOGIN, element: <Login />, type: "anon" },
	{ path: PATHS.FORGOT_PASSWORD, element: <ForgotPassword />, type: "anon" },
	{ path: PATHS.FORGOT_SENT, element: <ForgotSent />, type: "anon" },
	{ path: PATHS.RESET_PASSWORD, element: <ResetPassword />, type: "anon" },
	{ path: PATHS.GOODBYE, element: <Goodbye />, type: "anon" },

	{ path: PATHS.MY_ACCOUNT, element: <MyAccount />, type: "protected" },
	{ path: PATHS.EDIT_ACCOUNT, element: <EditAccount />, type: "protected" },
	{ path: PATHS.EDIT_PASSWORD, element: <EditPassword />, type: "protected" },

	{ path: PATHS.ADMIN, element: <Admin />, type: "admin" },
	{ path: PATHS.ADMIN_USERS, element: <AdminUsers />, type: "admin" },
	{
		path: PATHS.ADMIN_EDIT_ACCOUNT,
		element: <AdminEditAccount />,
		type: "admin",
	},
	{
		path: PATHS.ADMIN_EDIT_PASSWORD,
		element: <AdminEditPassword />,
		type: "admin",
	},
	/* Prepend page - DO NOT REMOVE */
	...redirects,
]
