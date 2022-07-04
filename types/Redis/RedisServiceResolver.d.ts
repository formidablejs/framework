export default class RedisServiceResolver extends ServiceResolver {
    boot(): Promise<import("..").Application>;
}
import ServiceResolver from "../Support/ServiceResolver";
