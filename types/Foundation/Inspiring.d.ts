export class Inspiring {
    /** @type {string}*/
    static get quote(): string;
    /** @type {Array<string>}*/
    static get quotes(): string[];
    /** @param {string} quote*/
    static formatForConsole(quote: string): string;
}
