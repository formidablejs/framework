export class MaintenanceCommand extends Command {
    get file(): string;
    down(): any;
    up(): mixed;
}
import { Command } from "../Command";
