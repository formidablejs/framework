export = HasCsrfToken;
declare class HasCsrfToken {
    constructor(config: any);
    config: any;
    handle(request: any, reply: any): string;
    tokens(): csrf;
}
import csrf = require("@fastify/csrf");
