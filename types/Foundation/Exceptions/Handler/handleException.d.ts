/**
@param {Boolean} returns
*/
export function handleException(error: any, request: any, reply: any, returns?: boolean): Promise<any>;
/**
@param {ConfigRepostory} config
*/
export function setConfig(config: ConfigRepostory): ConfigRepostory;
import ConfigRepostory from "../../../Config/Repository";
