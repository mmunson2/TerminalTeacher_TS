import IProcessInput from "./Interfaces/IProcessInput";

/********************************************************************************
 * Process Input
 * 
 * A DTO for passing a command and argument into a command.
 * 
 * - command: The command being requested (e.g. "cd")
 * - arguments: A list of arguments to be passed into the function
 * 
 *******************************************************************************/
class ProcessInput implements IProcessInput {
    private _command: string = ""
    private _arguments: Array<string> = [];


    constructor(line: string) {
        const commandComponents = line.trim().split(" ");

        if(commandComponents.length < 1 || line === "") {
            this.command = ""
            this.arguments = []
        }
        else {
            this.command = commandComponents[0];
            this.arguments = commandComponents.splice(1)
        }
    }

    get command(): string {
        return this._command;
    }

    set command(command: string) {
        this._command = command;
    }

    get arguments(): Array<string> {
        return this._arguments;
    }

    set arguments(args: Array<string>) {
        this._arguments = args;
    }
}

export default ProcessInput;