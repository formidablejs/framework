export class MigrateDownCommand extends MigrationCommand {
    get props(): {
        migration: import("@formidablejs/console/types/Props/Prop").default;
    };
    handle(): Promise<never>;
}
import { MigrationCommand } from "./MigrationCommand";
