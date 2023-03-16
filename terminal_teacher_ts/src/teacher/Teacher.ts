import standard from "../assets/Default_Transparent.png"
import approving from "../assets/Looking_Good_Transparent.png"
import explaining from "../assets/Info_Transparent.png"
import apologizing from "../assets/Sorry_Transparent.png"
import { ResultCode } from "../terminal/Interfaces/IProcessResult"
import ProcessResult from "../terminal/ProcessResult"

const InstructorPoses = {
    standard: standard,
    approving: approving,
    explaining: explaining,
    apologizing: apologizing
}

const approvalMessages = [
    "Looking good!",
    "Nice one!",
    "Sweet!",
    "You're a pro!",
    "Amazing!",
    "Excellent!"
]

/********************************************************************************
 * Teacher
 * 
 * Looks at the result of the last command and determines:
 * 
 * - Was it successful? If so, commend the student and suggest additional commands
 * - Was it unsuccessful? If so, provide additional information on the command
 * 
 * @todo: Should be refactored. Text should be retrieved from an external JSON.
 *******************************************************************************/
class Teacher {
    private _suggestion: string = "";
    private _pose: string = InstructorPoses.standard;

    constructor() {
        this.suggestion = "Try viewing the current directory with \"ls\""
        this.pose = InstructorPoses.standard;
    }

    get suggestion() {
        return this._suggestion;
    }

    set suggestion(newSuggestion) {
        if(typeof(newSuggestion) !== "string") {
            throw new TypeError("Suggestion should be of type string")
        }
        
        this._suggestion = newSuggestion;
    }

    get pose() {
        return this._pose;
    }

    set pose(pose) {
        this._pose = pose;
    }

    parseResult(result: ProcessResult) {
        const code = result.resultCode;
        const command = result.processInput.command;

        if(code === ResultCode.SUCCESS) {

            const randomIndex = Math.floor(Math.random() * approvalMessages.length)

            this.suggestion = approvalMessages[randomIndex]

            if(command === "mkdir") {
                this.suggestion += " If you'd like to view the directory you just made, try using \"ls\"."
            }
            else if(command === "ls" && result.processInput.arguments.length > 0 && result.processInput.arguments[0] === "-l") {
                this.suggestion += " Now maybe we can check out some of these directories with \"cd\"..."
            }
            else if(command === "ls") {
                this.suggestion += " You can try this command with a \"-l\" option to see the sizes of files and directories."
            }
            else if(command === "touch") {
                this.suggestion += " If you'd like to view the directory you just made, try using \"ls\"."
            }
            else if(command === "cd") {
                this.suggestion += " Have you tried executing a previous command with the up arrow?"
            }
            else if(command === "help") {
                this.suggestion += " Enter any of these commands into the terminal and I'll tell you more!"
            }

            this.pose = InstructorPoses.approving;
        }
        else if(command === "" ) {
            this.suggestion = "";
            this.pose = InstructorPoses.standard;
        }
        else if(command === "mkdir") {
            this.suggestion = "The mkdir command is used to create a directory. You can name a directory anything you'd like! Try \"mkdir my_directory\""
            this.pose = InstructorPoses.explaining;
        }
        else if(command === "ls") {
            this.suggestion = "The ls command lists the contents of the current directory. It doesn't need any arguments, but try adding \"-l\" to view file and directory sizes!"
            this.pose = InstructorPoses.explaining;
        }
        else if(command === "touch") {
            this.suggestion = "The touch command creates a blank file. You can name a file anything you'd like, but this terminal requires an extension to be added like \".txt\". Try \"touch my_file.txt\""
            this.pose = InstructorPoses.explaining;
        }
        else if(command === "cd") {
            this.suggestion = "The cd command changes the current directory. Enter the name of the directory you want to change to as an argument like \"cd my_directory\". To go back to the root directory, use \"cd /\""
            this.pose = InstructorPoses.explaining;
        }
        else if(command === "cat") {
            this.suggestion = "The cat command displays the contents of a file on the terminal. Try navigating to the dev folder and running \"cat main.java\"";
            this.pose = InstructorPoses.explaining;
        }
        else if (code === ResultCode.NOT_FOUND) {
            this.suggestion = "Not all Unix commands are implemented, sorry :)"
            this.pose = InstructorPoses.apologizing;
        }
        else {
            this.suggestion = "hmm, I don't know this one but I should... Ask the devs maybe?"
            this.pose = InstructorPoses.apologizing;
        }
    }

}

export default Teacher;