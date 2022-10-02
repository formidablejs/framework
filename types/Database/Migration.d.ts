export default class Migration {
    /**
    @param {string} name
    */
    make(name: string): any;
    /**
    @param {string|null} name
    @param {boolean} up
    */
    migrate(name?: string | null, up?: boolean): any;
    latest(): any;
    fresh(): Promise<any>;
    /**
    @param {boolean} all
    */
    rollback(all?: boolean): any;
    list(): any;
}
