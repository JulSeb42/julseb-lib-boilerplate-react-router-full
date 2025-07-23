import { Routes, Route } from "react-router-dom"
import { ToastContainer, ThemeProviderWrapper, uuid } from "@julseb-lib/react"
import { routes, AnonRoute, AdminRoute, ProtectedRoute } from "routes"
import { ErrorPage } from "pages"

export const App = () => {
	return (
		<ThemeProviderWrapper>
			<Routes>
				{routes.map(route => {
					if (route.type === "admin")
						return (
							<Route
								path={route.path}
								element={
									<AdminRoute>{route.element}</AdminRoute>
								}
								errorElement={<ErrorPage />}
								key={uuid()}
							/>
						)

					if (route.type === "anon")
						return (
							<Route
								path={route.path}
								element={<AnonRoute>{route.element}</AnonRoute>}
								errorElement={<ErrorPage />}
								key={uuid()}
							/>
						)

					if (route.type === "protected")
						return (
							<Route
								path={route.path}
								element={
									<ProtectedRoute>
										{route.element}
									</ProtectedRoute>
								}
								errorElement={<ErrorPage />}
								key={uuid()}
							/>
						)

					return (
						<Route
							path={route.path}
							element={route.element}
							errorElement={<ErrorPage />}
							key={uuid()}
						/>
					)
				})}
			</Routes>
			<ToastContainer position="bottom-right" />
		</ThemeProviderWrapper>
	)
}
