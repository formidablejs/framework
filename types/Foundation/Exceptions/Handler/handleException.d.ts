/**
@param {Error|ApplicationException|HttpException} error
@param {FormRequest} request
@param {FastifyReply} reply
@param {Boolean} returns
*/
export function handleException(error: Error | any | HttpException, request: any, reply: any, returns?: boolean): Promise<any>;
/**
@param {MaintenanceModeException} error
@param {FormRequest} request
@param {FastifyReply} reply
*/
export function handleMaintenanceMode(error: MaintenanceModeException, request: any, reply: any, hooks: any): any;
/**
@param {ConfigRepostory} config
*/
export function setConfig(config: ConfigRepostory): ConfigRepostory;
import HttpException from "../../../Http/Exceptions/HttpException";
import MaintenanceModeException from "../MaintenanceModeException";
import ConfigRepostory from "../../../Config/Repository";
