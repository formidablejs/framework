export class MigrateRollbackCommand extends MigrationCommand {
    get props(): {
        all: import("@formidablejs/console/types/Props/Prop").default;
    };
    handle(): Promise<mixed>;
}
import { MigrationCommand } from "./MigrationCommand";
