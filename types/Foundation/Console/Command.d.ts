export class Command extends BaseCommand {
    get app(): any;
    /**
    @param {string} type
    @param {string} message
    @param {boolean} newLine
    */
    message(type: string, message: string, newLine?: boolean): void;
    /**
    @param {string} default
    */
    env(default$: any): any;
    usingEnv(): void;
    /**
    @param {string} message
    */
    confirm(message: string): Promise<any>;
    shouldRun(): Promise<any>;
}
import { Command as BaseCommand } from "@formidablejs/console";
