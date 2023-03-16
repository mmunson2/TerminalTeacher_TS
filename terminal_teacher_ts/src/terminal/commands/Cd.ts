import Directory from "../Directory";
import { ResultCode } from "../Interfaces/IProcessResult";
import ProcessInput from "../ProcessInput";
import ProcessResult from "../ProcessResult";
import VirtualFileSystem from "../VirtualFileSystem";
import Command from "./Command";

/********************************************************************************
 * Cd
 * 
 * Command for changing the VirtualFileSystem's current directory
 * 
 * - Expects at least one argument - the path or dirName to change to
 * - Accepts "cd /" - this will change to the root directory
 * - Prepending a path with "/" will cd from the root directory
 * - Accepts relative paths, e.g "cd dir1/dir2"
 * 
 * @todo: This function is quite complex. Break up into additional functions
 * @todo: support "cd ../" and other paths that recurse upwards
 *******************************************************************************/
class Cd extends Command {
    readonly name = "cd"
    readonly helpText = "cd path"

    public execute(input: ProcessInput, fileSystem: VirtualFileSystem): ProcessResult {
        if(!input.arguments || input.arguments.length < 1) {
            const details = "usage: cd directory_path";

            return new ProcessResult(input, ResultCode.ERROR, details);
        }

        const path = input.arguments[0];

        if(path === "/") {
            fileSystem.currentDirectory = fileSystem.rootDirectory;

            return new ProcessResult(input, ResultCode.SUCCESS, "")
        }

        if(path.includes("/")) {
            const separatedPath = path.split("/");
            
            if(separatedPath[0] === "") {
                // Get rid of empty first element
                separatedPath.shift()
            }

            let searchDirectory;

            // Starting a path with / searches for absolute paths
            if(path[0] === "/") {
                searchDirectory = fileSystem.rootDirectory;
            }
            else { // else search relative
                searchDirectory = fileSystem.currentDirectory
            }
            
            for(let i = 0; i < separatedPath.length; i++) {
                const nextDir: Directory | false = searchDirectory.getDirectory(separatedPath[i])

                if(!nextDir) {
                    const details = `${path}: Not a directory`

                    return new ProcessResult(input, ResultCode.ERROR, details)
                }
                else if(i === separatedPath.length - 1) {
                    fileSystem.currentDirectory = nextDir;

                    return new ProcessResult(input, ResultCode.SUCCESS, "")
                }
                else { // Loop again, searching the current directory
                    searchDirectory = nextDir;
                }
            }
        }
        else { // TODO: Simplify
            let searchDirectory = fileSystem.currentDirectory;

            const nextDir = searchDirectory.getDirectory(path);

            if(!(nextDir instanceof Directory)) {
                const details = `${path}: Not a directory`

                return new ProcessResult(input, ResultCode.ERROR, details)
            }
            else {
                fileSystem.currentDirectory = nextDir;

                return new ProcessResult(input, ResultCode.SUCCESS, "")
            }
        }

        // Makes the compiler happy
        throw new Error("cd reached an unexpected exit!")
    }
}

export default Cd;