export const PATHS = {
	ROOT: "/",
	NOT_FOUND: "*",

	USERS: "/users",
	USER: (id = ":id") => `/users/${id}`,

	SIGNUP: "/signup",
	THANK_YOU: "/thank-you",
	VERIFY: "/verify",
	LOGIN: "/login",
	FORGOT_PASSWORD: "/forgot-password",
	FORGOT_SENT: "/forgot-sent",
	RESET_PASSWORD: "/reset-password",
	GOODBYE: "/goodbye",

	MY_ACCOUNT: "/my-account",
	EDIT_ACCOUNT: "/my-account/edit-account",
	EDIT_PASSWORD: "/my-account/edit-account/edit-password",

	ADMIN: "/admin",
	ADMIN_USERS: "/admin/users",
	ADMIN_EDIT_ACCOUNT: "/admin/edit-account",
	ADMIN_EDIT_PASSWORD: "/admin/edit-account/edit-password",
	/* Prepend path - DO NOT REMOVE */
}
