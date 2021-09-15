export var __esModule: boolean;
export default ErrorIfAuthenticated;
declare class ErrorIfAuthenticated {
    handle(request: any, reply: any, params: any): any;
    isAuthenticated(request: any): any;
    onAuthenticated(request: any, reply: any, params: any): void;
}
