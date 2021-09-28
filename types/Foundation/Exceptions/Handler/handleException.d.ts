/**
@param {Error|ApplicationException|HttpException} error
@param {FormRequest} request
@param {FastifyReply} reply
@param {Boolean} returns
*/
export function handleException(error: Error | any | HttpException, request: any, reply: any, returns?: boolean): Promise<any>;
/**
@param {ConfigRepostory} config
*/
export function setConfig(config: ConfigRepostory): ConfigRepostory;
import HttpException from "../../../Http/Exceptions/HttpException";
import ConfigRepostory from "../../../Config/Repository";
