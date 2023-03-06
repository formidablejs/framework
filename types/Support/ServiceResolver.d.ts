import Application from "../Foundation/Application";

export default class ServiceResolver {
    /**
     * Application instance.
     */
    app: Application;

    /**
     * Whether or not Service Resolver should be loaded in
     * cli mode.
     *
     * @default true
     */
    static get runInCli(): boolean;

    /**
     * Initiate Service Resolver.
     */
    constructor(app: Application);

    /**
     * Get contextual objects.
     */
    get context(): any[];

    /**
     * Boot up Service Resolver.
     */
    boot(): unknown;

    /**
     * Register Service Resolver.
     */
    register(): unknown;
}
