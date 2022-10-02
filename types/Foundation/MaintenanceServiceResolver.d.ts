export default class MaintenanceServiceResolver extends ServiceResolver {
    get cookieName(): string;
    getDown(): false | {
        message: any;
        statusCode: any;
        secret: any;
        redirect: any;
        retry: number;
        refresh: number;
    };
    boot(): MaintenanceServiceResolver;
    /**
    @param {string} secret
    @param {FormRequest} request
    */
    hasBypassMaintenanceModeCookie(secret: string, request: FormRequest): boolean;
    /**
    @param {FormRequest} request
    */
    setBypassMaintenanceModeCookie(secret: any, request: FormRequest): any;
    /**
    @param {FormRequest} request
    */
    isFile(request: FormRequest): boolean;
}
import ServiceResolver from "../Support/ServiceResolver";
import FormRequest from "../Http/Request/FormRequest";
