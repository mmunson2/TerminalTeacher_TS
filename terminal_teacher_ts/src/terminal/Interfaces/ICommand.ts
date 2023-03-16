import ProcessInput from "../ProcessInput";
import ProcessResult from "../ProcessResult";
import VirtualFileSystem from "../VirtualFileSystem";

/********************************************************************************
 * Interface - Command
 * 
 * A command should contain:
 * - The name of the command as used in the terminal (e.g "cd")
 * - The help text displayed when the command is used with no args
 *   (e.g "cd path [-optional arg]")
 * - An execute function that takes in the ProcessInput (command and args),
 *   updates the state of the VirtualFileSystem, and returns a ProcessResult
 * 
 *******************************************************************************/
interface ICommand {
    readonly name: string;
    readonly helpText: string;
    execute(input: ProcessInput, fileSystem: VirtualFileSystem): ProcessResult
}

export default ICommand;