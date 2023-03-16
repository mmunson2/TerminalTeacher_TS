import { ResultCode } from "../Interfaces/IProcessResult";
import ProcessInput from "../ProcessInput";
import ProcessResult from "../ProcessResult";
import TextFile from "../TextFile";
import VirtualFileSystem from "../VirtualFileSystem";
import Command from "./Command";

/********************************************************************************
 * Touch
 * 
 * A command for creating an empty file in the current directory
 * 
 * - expects at least one argument - the name of the file to be created
 * - expects the filename to contain a name and extension separated by a "."
 * - Will fail if the file already exists in the directory
 * 
 *******************************************************************************/
class Touch extends Command {
    readonly name = "touch"
    readonly helpText = "touch file_name"

    public execute(input: ProcessInput, fileSystem: VirtualFileSystem): ProcessResult {
        if(!input.arguments || input.arguments.length < 1) {
            const details = "usage: touch file_name";

            return new ProcessResult(input, ResultCode.ERROR, details);
        }

        const filename = input.arguments[0];
        const fileComponents = filename.split(".");

        if(filename.split(".").length !== 2) {
            const details =  `touch: invalid filename ${filename}`

            return new ProcessResult(input, ResultCode.ERROR, details)
        }
        
        if(fileSystem.currentDirectory.add(new TextFile(fileComponents[0], fileComponents[1], ""))) {
            return new ProcessResult(input, ResultCode.SUCCESS, "")
        }
        else {
            return new ProcessResult(input, ResultCode.ERROR, `touch: ${filename} already exists`);
        }
    }
}

export default Touch;