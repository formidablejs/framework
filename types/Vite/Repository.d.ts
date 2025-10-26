interface ViteManifest {
  [key: string]: {
    file: string;
    src?: string;
    isEntry?: boolean;
    imports?: string[];
    css?: string[];
    assets?: string[];
  };
}

export default class Repository {
  static manifestCache: ViteManifest | null = null;
  static file(file: string): string;
  static getManifest(): ViteManifest | null;
}
