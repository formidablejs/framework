import { IMiddleware } from "../Middleware/IMiddleware";
import { IView } from "../View/View";

export default class Route {
    /**
     * Check if route exists.
     * @param name - The route name to check
     * @returns True if the route exists, false otherwise
     */
    static has(name: string): boolean;

    /**
     * Add a GET route that renders a view.
     * @param path - The route path
     * @param view - The view to render
     * @param data - Optional data to pass to the view
     * @param statusCode - Optional HTTP status code
     * @returns The Route class for method chaining
     */
    static view(path: string, view: IView, data?: object, statusCode?: number | null): typeof Route;

    /**
     * Add a DELETE route.
     * @param path - The route path
     * @param action - The route handler function or [function, method] tuple
     * @returns The Route class for method chaining
     */
    static delete(path: string, action: Function | [Function, string]): typeof Route;

    /**
     * Add a GET route.
     * @param path - The route path
     * @param action - The route handler function or [function, method] tuple
     * @returns The Route class for method chaining
     */
    static get(path: string, action: Function | [Function, string]): typeof Route;

    /**
     * Add an OPTIONS route.
     * @param path - The route path
     * @param action - The route handler function or [function, method] tuple
     * @returns The Route class for method chaining
     */
    static options(path: string, action: Function | [Function, string]): typeof Route;

    /**
     * Add a PATCH route.
     * @param path - The route path
     * @param action - The route handler function or [function, method] tuple
     * @returns The Route class for method chaining
     */
    static patch(path: string, action: Function | [Function, string]): typeof Route;

    /**
     * Add a POST route.
     * @param path - The route path
     * @param action - The route handler function or [function, method] tuple
     * @returns The Route class for method chaining
     */
    static post(path: string, action: Function | [Function, string]): typeof Route;

    /**
     * Add a PUT route.
     * @param path - The route path
     * @param action - The route handler function or [function, method] tuple
     * @returns The Route class for method chaining
     */
    static put(path: string, action: Function | [Function, string]): typeof Route;

    /**
     * Add a route that matches any HTTP method.
     * @param path - The route path
     * @param action - The route handler function or [function, method] tuple
     * @returns The Route class for method chaining
     */
    static any(path: string, action: Function | [Function, string]): typeof Route;

    /**
     * Set route name.
     * @param name - The name to assign to the route
     * @returns The Route class for method chaining
     */
    static name(name: string): typeof Route;

    /**
     * Add middleware to route.
     * @param name - The middleware name, instance, or array of middleware
     * @returns The Route class for method chaining
     */
    static middleware(name: string | IMiddleware | Array<string|IMiddleware>): typeof Route;

    /**
     * Add grouped routes.
     * @param options - Group configuration options
     * @param callable - Function containing the grouped routes
     */
    static group(options: GroupOptions, callable: Function): void;

    /**
     * Get all registered routes.
     * @returns Array of all registered routes
     */
    static all(): any[];
}

export type GroupOptions = {
    prefix: string;
    middleware: IMiddleware | string | Array<IMiddleware | string>;
    domain?: string;
} | {
    prefix: string;
    domain?: string;
} | {
    middleware: IMiddleware | string | Array<IMiddleware | string>;
    domain?: string;
} | {
    domain: string;
}
