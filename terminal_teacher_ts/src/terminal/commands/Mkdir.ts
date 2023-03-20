import Directory from "../Directory";
import { ResultCode } from "../interfaces/IProcessResult";
import ProcessInput from "../ProcessInput";
import ProcessResult from "../ProcessResult";
import VirtualFileSystem from "../VirtualFileSystem";
import Command from "./Command";

/********************************************************************************
 * Mkdir
 * 
 * A command for creating a directory within the current directory
 * 
 * - Expects at least one argument - the name of the directory to be created
 * - Will fail if the directory name already exists
 * 
 *******************************************************************************/
class Mkdir extends Command {
    readonly name = "mkdir";
    readonly helpText = "mkdir directory_name";

    public execute(input: ProcessInput, fileSystem: VirtualFileSystem): ProcessResult {
        if(!input.arguments || input.arguments.length < 1) {
            const details = "usage: mkdir directory_name";

            return new ProcessResult(input, ResultCode.ERROR, details);
        }

        const dirName = input.arguments[0];

        const newDir = new Directory(dirName, []);

        if(fileSystem.currentDirectory.add(newDir)) {
            return new ProcessResult(input, ResultCode.SUCCESS, "");
        }
        else {
            return new ProcessResult(input, ResultCode.ERROR, `mkdir: ${dirName} already exists`)
        }
    }
}

export default Mkdir;