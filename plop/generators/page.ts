import { toKebabCase, toTitleCase } from "@julseb-lib/react"
import { BASE_PATH, TEMPLATES_PATH } from "../utils/index.js"
import type { NodePlopAPI, ActionType } from "plop"

export default (plop: NodePlopAPI) => {
	const { setGenerator } = plop

	setGenerator("page", {
		description: "Generate page",
		prompts: [
			{
				type: "input",
				name: "name",
				message: "Enter page's name",
			},
			{
				type: "input",
				name: "title",
				message: "Enter page title",
				default: (data: { name: string }) => toTitleCase(data.name),
			},
			{
				type: "list",
				name: "type",
				message: "What type of page is it?",
				choices: ["none", "protected", "anon", "admin"],
				default: "none",
			},
			{
				type: "input",
				name: "path",
				message: "Enter url path",
				default: (data: {
					name: string
					type: "none" | "protected" | "anon" | "admin"
				}) =>
					data.type === "admin"
						? `/admin/${toKebabCase(data.name)}`
						: `/${toKebabCase(data.name)}`,
			},
			{
				type: "confirm",
				name: "multi",
				message: "Is this a multi file page?",
				default: false,
			},
		],
		actions: data => {
			const actions: Array<ActionType> = []

			if (data?.type === "admin") {
				actions.push("Creating your new page", {
					type: "add",
					path: data?.multi
						? `${BASE_PATH}/pages/admin/{{ pascalCase name }}/{{ pascalCase name }}.tsx`
						: `${BASE_PATH}/pages/admin/{{ pascalCase name }}.tsx`,
					templateFile: `${TEMPLATES_PATH}/admin/page-file.hbs`,
					// @ts-ignore
					verbose: false,
				})
			} else {
				actions.push("Creating your new page", {
					type: "add",
					path: data?.multi
						? `${BASE_PATH}/pages/{{>pascalName}}/{{>pascalName}}.tsx`
						: `${BASE_PATH}/pages/{{>pascalName}}.tsx`,
					templateFile: `${TEMPLATES_PATH}/page/page-file.hbs`,
				})
			}

			actions.push(
				"Exporting your new page",
				{
					type: "modify",
					path: `${BASE_PATH}/pages/index.ts`,
					template: `export * from "./${data?.type === "admin" ? "admin/{{>pascalName}}" : "{{>pascalName}}"}"\n$1`,
					pattern: /(\/\* Prepend export - DO NOT REMOVE \*\/)/g,
				},
				"Importing your new page in routes file",
				{
					type: "modify",
					path: `${BASE_PATH}/routes/routes.tsx`,
					template: "Admin{{ pascalCase name }},\n\t$1",
					pattern: /(\/\* Prepend import - DO NOT REMOVE \*\/)/g,
				},
				"Adding your new page to the routes",
				{
					type: "modify",
					path: `${BASE_PATH}/routes/routes.tsx`,
					template: `{ path: PATHS.${data?.type === "admin" ? "ADMIN_" : ""}{{ constantCase name}}, element: <Admin{{ pascalCase name }} />, type: "{{ type }}" },`,
					pattern: /(\/\* Prepend route - DO NOT REMOVE \*\/)/g,
				},
				"Adding your new page to the paths array",
				{
					type: "modify",
					path: `${BASE_PATH}/routes/routes.tsx`,
					template: `{ path: PATHS.${data?.type === "admin" ? "ADMIN_" : ""}{{ constantCase name }}, element: <{{ pascalCase name }} />, type: "{{ type }}" },\n\t$1`,
					pattern: /(\/\* Prepend page - DO NOT REMOVE \*\/)/g,
				},
				"Adding path to paths list",
				{
					type: "modify",
					path: `${BASE_PATH}/routes/paths.ts`,
					template: `${data?.type === "admin" ? "ADMIN_" : ""}{{ constantCase name }}: "{{ path }}",\n\t$1`,
					pattern: /(\/\* Prepend path - DO NOT REMOVE \*\/)/g,
				},
			)

			return actions
		},
	})
}
