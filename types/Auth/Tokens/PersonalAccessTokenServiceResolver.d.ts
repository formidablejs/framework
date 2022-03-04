export default class PersonalAccessTokenServiceResolver extends ServiceResolver {
    boot(): typeof PersonalAccessToken;
}
import ServiceResolver from "../../Support/ServiceResolver";
import PersonalAccessToken from "./PersonalAccessToken";
