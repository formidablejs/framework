export = IgnoreCookies;
declare class IgnoreCookies {
    handle(request: any, reply: any): () => any;
}
