type Params = {
    [key: string]: string | number | Params,
}

/**
 * Generate a temporary signed URL for a given route name.
 */
export default function temporarySignedRoute(name: string, expiresIn: string, params?: Params): Promise<string>;
