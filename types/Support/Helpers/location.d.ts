type Location = {
  href: string;
  origin: string;
  protocol: 'http' | 'https';
  username: string;
  password: string;
  host: string;
  hostname: string;
  port: string;
  pathname: string;
  search: string;
  searchParams: URLSearchParams;
  hash: string;
};

/**
 * Get the current location object.
 *
 * @experimental
 */
export default function location(): Location | null;
