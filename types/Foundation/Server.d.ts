import Application from './Application'

type ServerCallback = (_error: Error, address: string) => void;

type ServerOptions = {
    port?: number
    host?: string
    _?: ServerCallback
}

export default class Server {
    /**
     * Initialize a new server instance.
     */
    constructor(application: Promise<Application>)

    /**
     * Initialize a new server instance.
     */
    static use(application: Promise<Application>): Server

    /**
     * Start the application server.
     */
    start(serverOptions: ServerOptions): Promise<void>
}
