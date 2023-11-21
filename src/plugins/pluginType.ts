import type { CommandOption } from "annyang";

export default interface Plugin {
    commands: CommandOption;
    output: string;
}