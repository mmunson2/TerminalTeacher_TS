import { ResultCode } from "../interfaces/IProcessResult";
import ProcessInput from "../ProcessInput";
import ProcessResult from "../ProcessResult";
import VirtualFileSystem from "../VirtualFileSystem";
import Command from "./Command";

/********************************************************************************
 * Cat
 * 
 * Command for listing the contents of a Textfile.
 * 
 * - Expects that there is at least one argument - the name of the file
 * - Will fail if the filename passed in is a directory
 * - Will fail if the filename does not exist
 * 
 * If successful, returns a ProcessResult with details containing the TextFile's
 * contents.
 * 
 *******************************************************************************/
class Cat extends Command {
    readonly name = "cat";
    readonly helpText = "cat file_name";

    public execute(input: ProcessInput, fileSystem: VirtualFileSystem): ProcessResult {
        if(!input.arguments || input.arguments.length < 1) {
            const details = "usage: cat file_name";

            return new ProcessResult(input, ResultCode.ERROR, details);
        }

        const fileName = input.arguments[0];

        if(fileSystem.currentDirectory.getDirectory(fileName)) {
            const details = `cat: ${fileName} is a directory`

            return new ProcessResult(input, ResultCode.ERROR, details);
        }

        const file = fileSystem.currentDirectory.getTextFile(fileName);

        if(file) {
            return new ProcessResult(input, ResultCode.SUCCESS, file.contents)
        }
        else {
            const details = `cat: ${fileName}: no such file or directory`

            return new ProcessResult(input, ResultCode.ERROR, details);
        }
    }
}

export default Cat;