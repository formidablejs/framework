export default class CsrfServiceResolver extends ServiceResolver {
    boot(): typeof Route;
}
import ServiceResolver from "../../Support/ServiceResolver";
import Route from "../Router/Route";
