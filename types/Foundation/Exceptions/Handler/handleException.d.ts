export function addExceptionResolver(resolver: any): number;
/**
@param {Error|ApplicationException|HttpException} error
@param {FormRequest} request
@param {FastifyReply} reply
@param {Boolean} returns
@param {Boolean} shouldReport
*/
export function handleException(error: Error | ApplicationException | HttpException, request: FormRequest, reply: FastifyReply, returns?: boolean, shouldReport?: boolean): Promise<any>;
/**
@param {MaintenanceModeException} error
@param {FormRequest} request
@param {FastifyReply} reply
*/
export function handleMaintenanceMode(error: MaintenanceModeException, request: FormRequest, reply: FastifyReply, hooks: any): any;
/**
@param {ConfigRepostory} config
*/
export function setConfig(config: ConfigRepostory): ConfigRepostory;
import HttpException from "../../../Http/Exceptions/HttpException";
import MaintenanceModeException from "../MaintenanceModeException";
import ConfigRepostory from "../../../Config/Repository";
