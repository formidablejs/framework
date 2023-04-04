type Params = {
    [key: string]: string | number | Params,
}

/**
 * Generate a signed URL for a given route name.
 */
export default function signedRoute(name: string, params?: Params): Promise<string>;
