import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { App } from "App"
import {
	AuthProviderWrapper,
	ModalOpenProviderWrapper,
	/* Prepend context import - DO NOT REMOVE */
} from "context"
import "@julseb-lib/react/index.css"
import "styles/index.css"

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<AuthProviderWrapper>
				<ModalOpenProviderWrapper>
					<App />
				</ModalOpenProviderWrapper>
			</AuthProviderWrapper>
		</BrowserRouter>
	</StrictMode>,
)
