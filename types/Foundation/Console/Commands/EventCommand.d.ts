import { Command } from "../Command";

export class EventCommand extends Command {
  /**
   * The console command signature name.
   */
  get event(): string;

  /**
   * Execute event command.
   */
  persist(dev: boolean, port: number, host: string, noAnsi: boolean): Promise<void>;
}
