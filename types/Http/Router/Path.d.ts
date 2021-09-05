export = Path;
declare class Path {
    /**
    @param {String[]} prefix
    @param {String} pattern
    */
    static clean(prefix: string[], pattern: string): string;
}
