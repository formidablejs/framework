type Params = {
    [key: string]: string | number | Params,
}

/**
 * Generate a URL for a given route name.
 */
export default function route(name: string, params?: Params): string;
