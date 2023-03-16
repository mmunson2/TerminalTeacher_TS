import ICommand from "../Interfaces/ICommand";
import ProcessInput from "../ProcessInput";
import ProcessResult from "../ProcessResult";
import VirtualFileSystem from "../VirtualFileSystem";

/********************************************************************************
 * Abstract - Command
 * 
 * Abstract command that all new commands should extend. Each command needs:
 * - name: The name of the command as it appears on the terminal (e.g. "ls")
 * - helpText: The text to return if the command is run with no arguments, or
 *             if help enumerates this command's arguments
 * - execute: a function that executes the actual command
 * 
 *******************************************************************************/
abstract class Command implements ICommand {
    abstract readonly name: string;
    abstract readonly helpText: string;

    abstract execute(input: ProcessInput, fileSystem: VirtualFileSystem): ProcessResult;
}

export default Command;