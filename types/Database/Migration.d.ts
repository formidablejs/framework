export default class Migration {
    /**
    @param {String} name
    */
    make(name: string): any;
    /**
    @param {String|null} name
    @param {Boolean} up
    */
    migrate(name?: string | null, up?: boolean): any;
    latest(): any;
    fresh(): Promise<any>;
    /**
    @param {Boolean} all
    */
    rollback(all?: boolean): any;
    list(): any;
}
