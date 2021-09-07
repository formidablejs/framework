export var AcceptLanguage: {
    new (): import("./Support/Language/Middleware/AcceptLanguage");
};
export var Application: {
    new (root: string): import("./Foundation/Application");
};
export var ApplicationException: typeof import("./Foundation/Exceptions/ApplicationException");
export var Auth: typeof import("./Auth/Auth");
export var Authenticate: {
    new (config: any): import("./Auth/Http/Middleware/Authenticate");
};
export var AuthenticationServiceResolver: {
    new (app: import("./Foundation/Application")): import("./Auth/AuthenticationServiceResolver");
};
export var AuthService: {
    new (): import("./Auth/AuthService");
    beforeLogin(callback: Function): any;
    beforeLogout(callback: Function): any;
    beforeRegister(callback: Function): any;
    beforeVerify(callback: Function): any;
    beforeResend(callback: Function): any;
    beforeForgot(callback: Function): any;
    beforeReset(callback: Function): any;
    onLogin(callback: Function): any;
    onRegister(callback: Function): any;
    onForgot(callback: Function): any;
    onReset(callback: Function): any;
    onAuthenticated(callback: Function): any;
    onRegistered(callback: Function): any;
    onVerification(callback: Function): any;
    onEmailResend(callback: Function): any;
    verificationMailer(mailer: new ($$?: any) => import("@formidablejs/mailer/types/Mailable")): any;
    resetPasswordMailer(mailer: new ($$?: any) => import("@formidablejs/mailer/types/Mailable")): any;
    routes(config?: any): {
        new (): import("./Http/Router/Manager");
        addRoute(verb: string, pattern: string, action: Function | [Function, string]): any;
        delete(path: string, action: Function | [Function, string]): any;
        get(path: string, action: Function | [Function, string]): any;
        options(path: string, action: Function | [Function, string]): any;
        patch(path: string, action: Function | [Function, string]): any;
        post(path: string, action: Function | [Function, string]): any;
        put(path: string, action: Function | [Function, string]): any;
        name(name: string): any;
        middleware(name: string | string[]): any;
        group(options: Object, callable: Function): void;
        all(): any[];
    };
};
export var ConfigRepository: {
    new ($$?: any): import("./Config/Repository");
};
export var Controller: {
    new (): import("./Http/Controller");
};
export var ConvertEmptyStringsToNull: {
    new (): import("./Http/Middleware/ConvertEmptyStringsToNull");
};
export var CsrfServiceResolver: {
    new (app: import("./Foundation/Application")): import("./Http/Csrf/CsrfServiceResolver");
};
export var Database: any;
export var DB: any;
export var decorator$use: (target: any, key: any, descriptor: any) => any;
export var ErrorIfAuthenticated: {
    new (): import("./Auth/Http/Middleware/ErrorIfAuthenticated");
};
export var ExceptionHandler: {
    new (config: any): import("./Foundation/Exceptions/Handler");
};
export var expiresIn: (time: string) => string;
export var ForbiddenException: typeof import("./Http/Exceptions/ForbiddenException");
export var FormRequest: {
    new (request: any, route: any, raw: any, config: any): import("./Http/Request/FormRequest");
};
export var HasCsrfToken: {
    new (config: any): import("./Http/Middleware/HasCsrfToken");
};
export var HasEncryptionKey: {
    new (config: any): import("./Support/Encryption/HasEncryptionKey");
};
export var Hash: {
    new (): import("./Hashing/Hash");
    make(value: string): Promise<any>;
    check(value: string, hash: string): Promise<any>;
    configure(config: any): any;
};
export var HashServiceResolver: {
    new (app: import("./Foundation/Application")): import("./Hashing/HashServiceResolver");
};
export var HttpException: typeof import("./Http/Exceptions/HttpException");
export var IgnoreCookies: {
    new (): import("./Http/Middleware/IgnoreCookies");
};
export var Kernel: {
    new (): import("./Http/Kernel");
};
export var Language: {
    new ($$?: any): import("./Support/Language/Language");
};
export var LanguageServiceResolver: {
    new (app: import("./Foundation/Application")): import("./Support/Language/LanguageServiceResolver");
};
export var Model: {
    new (): import("./Database/Model");
    [x: string]: any;
    readonly routeKeyName: string;
    find(primaryKey: number): Promise<any>;
};
export var NotFoundException: typeof import("./Http/Exceptions/NotFoundException");
export var PersonalAccessTokenServiceResolver: {
    new (app: import("./Foundation/Application")): import("./Auth/Tokens/PersonalAccessTokenServiceResolver");
};
export var Redirect: {
    new (path: string, statusCode?: number): import("./Http/Redirect/Redirect");
    to(path: string): import("./Http/Redirect/Redirect");
    route(name: string, params?: any): import("./Http/Redirect/Redirect");
};
export var Redis: {
    new (database?: string): import("./Redis/Redis");
    connection(database?: string): any;
    configure(config: any): any;
    closeAll(): any[];
};
export var RedisServiceResolver: {
    new (app: import("./Foundation/Application")): import("./Redis/RedisServiceResolver");
};
export var response: (data?: any, statusCode?: number) => import("./Http/Response/Response");
export var Route: {
    new (): import("./Http/Router/Manager");
    addRoute(verb: string, pattern: string, action: Function | [Function, string]): any;
    delete(path: string, action: Function | [Function, string]): any;
    get(path: string, action: Function | [Function, string]): any;
    options(path: string, action: Function | [Function, string]): any;
    patch(path: string, action: Function | [Function, string]): any;
    post(path: string, action: Function | [Function, string]): any;
    put(path: string, action: Function | [Function, string]): any;
    name(name: string): any;
    middleware(name: string | string[]): any;
    group(options: Object, callable: Function): void;
    all(): any[];
};
export var ServiceResolver: {
    new (app: import("./Foundation/Application")): import("./Support/ServiceResolver");
};
export var SessionDriverManager: {
    new (): import("./Http/Session/DriverManager");
    register(name: string, driver: any): any;
    get(name: string): any;
    isRegistered(name: string): boolean;
};
export var SessionFileStoreServiceResolver: {
    new (app: import("./Foundation/Application")): import("./Http/Session/SessionFileStoreServiceResolver");
};
export var SessionMemoryStoreServiceResolver: {
    new (app: import("./Foundation/Application")): import("./Http/Session/SessionMemoryStoreServiceResolver");
};
export var TransformsRequest: {
    new (): import("./Http/Middleware/TransformsRequest");
};
export var TrimStrings: {
    new (): import("./Http/Middleware/TrimStrings");
};
export var URL: {
    new (): import("./Http/URL/URL");
    route(name: string, params?: any, query?: any): any;
    uri: any;
    signedRoute(name: string, params?: any, query?: any): Promise<string>;
    temporarySignedRoute(name: string, expiresIn: string, params?: any, query?: any): Promise<string>;
    path(uri: string, query?: any): string;
    signed(uri: string, query?: any): Promise<string>;
    temporarySigned(uri: string, expiresIn: string, query?: any): Promise<string>;
    luri: any;
    toQuery(params?: any): string;
    setSecret(secret: string): any;
};
export var ValidateSignature: {
    new (config: any): import("./Http/Middleware/ValidateSignature");
};
export var ValidationServiceResolver: {
    new (app: import("./Foundation/Application")): import("./Validator/ValidationServiceResolver");
};
export var Validator: {
    new (): import("./Validator/Validator");
    make(body: any, rules: any, messages?: any): any;
    get(): any;
    validation: any;
};
export var VerifyCsrfToken: {
    new (config: any): import("./Http/Middleware/VerifyCsrfToken");
};
import { FastifyReply as FastifyReply } from "fastify";
import { FastifyRequest as FastifyRequest } from "fastify/types/request";
import { Mail as Mail } from "@formidablejs/mailer";
import { Mailable as Mailable } from "@formidablejs/mailer";
import { MailServiceResolver as MailServiceResolver } from "@formidablejs/mailer";
import { RequestGenericInterface as RequestGenericInterface } from "fastify";
export { FastifyReply, FastifyRequest, Mail, Mailable, MailServiceResolver, RequestGenericInterface };
