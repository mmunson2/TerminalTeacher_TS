import { ResultCode } from "../interfaces/IProcessResult";
import ProcessInput from "../ProcessInput";
import ProcessResult from "../ProcessResult";
import VirtualFileSystem from "../VirtualFileSystem";
import Command from "./Command";

/********************************************************************************
 * Ls
 * 
 * A command for listing the contents of the current directory
 * 
 * - Accepts a "-l" argument to list the size of each file/directory
 * - Fails with any other arguments
 * 
 * Returns the contents of the directory in the ProcessResult details.
 * 
 *******************************************************************************/
class Ls extends Command {
    readonly name = "ls"
    readonly helpText = "ls [-l]"

    execute(input: ProcessInput, fileSystem: VirtualFileSystem): ProcessResult {
        let showSize = false;
        let details = ""

        if(input.arguments && input.arguments[0] === "-l") {
            showSize = true;
        }
        else if (input.arguments && input.arguments.length > 0) {
            details = `ls: invalid option ${input.arguments[0]}`;

            return new ProcessResult(input, ResultCode.ERROR, details);
        }

        if(showSize) {
            details = fileSystem.currentDirectory.getContentsWithSize()
        }
        else {
            details = fileSystem.currentDirectory.toString();
        }

        return new ProcessResult(input, ResultCode.SUCCESS, details);
    }
}

export default Ls;