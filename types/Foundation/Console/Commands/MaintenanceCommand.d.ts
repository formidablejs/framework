export class MaintenanceCommand extends Command {
    get file(): string;
    down(): void;
    up(): never;
}
import { Command } from "../Command";
