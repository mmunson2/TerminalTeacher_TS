import Directory from "./Directory";
import TextFile from "./TextFile"
import ProcessResult from "./ProcessResult";
import ProcessInput from "./ProcessInput";
import {ResultCode} from "./interfaces/IProcessResult"
import Command from "./commands/Command";
import Cat from "./commands/Cat";
import Cd from "./commands/Cd";
import Ls from "./commands/Ls";
import Mkdir from "./commands/Mkdir";
import Touch from "./commands/Touch";

const commands: Array<Command> = [
    new Cat(),
    new Cd(),
    new Ls(),
    new Mkdir(),
    new Touch()
]

/********************************************************************************
 * Virtual File System
 * 
 * - rootDirectory: The root directory of the virtual file system
 * - currentDirectory: The directory currently being accessed
 * 
 * This class currently stitches everything together. When instantiated it
 * creates a demo file system with some example directories/files. It
 * parses commands in the form of a string into commands, changes its state,
 * and sends back a result. 
 * 
 * @todo: Can we decouple commands from the virtual file system further?
 * @todo: Can the demo file system initialization be moved elsewhere?
 * 
 *******************************************************************************/
class VirtualFileSystem {

    private _rootDirectory: Directory;
    private _currentDirectory: Directory;

    constructor() {
        this._rootDirectory = new Directory("/", []);
        this._currentDirectory = this.rootDirectory;

        this.createDemoFileSystem();
    }

    get rootDirectory(): Directory {
        return this._rootDirectory;
    }

    get currentDirectory(): Directory {
        return this._currentDirectory;
    }

    set currentDirectory(newDirectory: Directory) {
        this._currentDirectory = newDirectory;
    }

    // TODO: read this from a JSON file
    createDemoFileSystem() {
        const codeFile1 = new TextFile("demo", "py", `
        if __name__ == "__main__":
            print("Hello!")
        `);
        const codeFile2 = new TextFile("main", "java", `
        public static void main(string[] args)
        {
            System.out.println("Hi there");
        }
        `)
        const groceryList = new TextFile("groceries", "txt", `
        - bananas
        - bananas
        - bananas`);

        const projectFolder = new Directory("final_project", [codeFile1]);
        const devFolder = new Directory("dev", [projectFolder, codeFile2]);
        const usrFolder = new Directory("usr", [groceryList]);
        const etcFolder = new Directory("etc", [])

        this.currentDirectory.add(devFolder);
        this.currentDirectory.add(usrFolder);
        this.currentDirectory.add(etcFolder);
    }

    parseCommand(nextLine: string): ProcessResult {
        const input = new ProcessInput(nextLine);

        if(input.command === "") {
            return new ProcessResult(input, ResultCode.SUCCESS, "");
        }
        else if(input.command === "help") {
            return this.help(input);
        }
        
        // TODO: Make this a map
        for(let command of commands) {
            if(input.command === command.name) {
                return command.execute(input, this)
            }
        }

        return new ProcessResult(input, ResultCode.NOT_FOUND, `command not found: ${input.command}`);
    }

    help(input: ProcessInput) {
        let helpDetails = "";

        for(let command of commands) {
            helpDetails += command.helpText + "\n";
        }

        return new ProcessResult(input, ResultCode.SUCCESS, helpDetails);
    }
}

export default VirtualFileSystem;