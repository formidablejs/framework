export class MigrateUpCommand extends MigrationCommand {
    get props(): {
        migration: import("@formidablejs/console/types/Props/Prop").default;
    };
    handle(): Promise<mixed>;
}
import { MigrationCommand } from "./MigrationCommand";
