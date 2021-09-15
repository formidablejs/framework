export default class TransformsRequest {
    get except(): any[];
    handle(request: any): {};
    clean(request: any): {};
    transform(key: any, value: any): any;
}
