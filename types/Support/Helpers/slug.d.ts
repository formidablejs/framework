type SlugOptions = {
  lowerCase?: boolean;
}

/**
@param {string} value
@param {string} separator
*/
export default function slug(value: string, separator?: string, options?: SlugOptions): string;
