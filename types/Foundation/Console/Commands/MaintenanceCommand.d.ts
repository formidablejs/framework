export class MaintenanceCommand extends Command {
    get file(): string;
    down(): void;
    up(): void;
}
import { Command } from "../Command";
