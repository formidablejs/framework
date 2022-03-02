export class ServeCommand extends Command {
    get runtime(): string;
    get fallbackPort(): string;
    get fallbackHost(): string;
    setEnvVars(): mixed;
}
import { Command } from "../Command";
