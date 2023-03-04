import { IMiddleware } from "./IMiddleware"

export type MiddlewareGroups = {
	[key: string]: Array<IMiddleware | string>
}
