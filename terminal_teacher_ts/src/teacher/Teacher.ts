import standard from "../assets/Standard.png"
import approving from "../assets/Glasses.png"
import explaining from "../assets/Reading.png"
import apologizing from "../assets/Shrug.png"
import { ResultCode } from "../terminal/interfaces/IProcessResult"
import ProcessResult from "../terminal/ProcessResult"
import Suggestions from "./suggestions.json"

const InstructorPoses = {
    standard: standard,
    approving: approving,
    explaining: explaining,
    apologizing: apologizing
}

/********************************************************************************
 * Teacher
 * 
 * Provides feedback to the user on the command they just entered. When a user
 * executes a command successfully the teacher:
 *  - Encourages the user
 *  - Suggests something else for them to do
 * When a command fails the teacher provides information about the command and
 * an example of how to use it correctly.
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

    set suggestion(newSuggestion: string) {
        this._suggestion = newSuggestion;
    }

    get pose() {
        return this._pose;
    }

    set pose(pose) {
        this._pose = pose;
    }

    public parseResult(result: ProcessResult) {
        const code = result.resultCode;

        switch(code) {
            case ResultCode.SUCCESS:
                this.pose = InstructorPoses.approving;
                console.log(this.getAffirmationSuggestion(result))
                this.suggestion = this.getAffirmationSuggestion(result);
                break;
            case ResultCode.ERROR:
                this.pose = InstructorPoses.explaining;
                this.suggestion =this.getErrorSuggestion(result);
                break;
            case ResultCode.NOT_FOUND:
                this.pose = InstructorPoses.apologizing;
                this.suggestion = this.getRandomSuggestion(Suggestions["not_found"]);
                break;
            default:
                console.error("Invalid ResultCode in Teacher.ts");
                console.error(result);

                this.pose = InstructorPoses.apologizing;
                this.suggestion = this.getRandomSuggestion(Suggestions["error"]);
        }
    }

    // Expects an array of possible responses. Selects a random element from the array
    private getRandomSuggestion(suggestions: Array<string>): string {
        if(suggestions.length < 1) {
            console.error("Teacher.ts: getRandomSuggestion received an array of length zero");
            return "";
        }

        let randomIndex = Math.floor(Math.random() * suggestions.length);
        return suggestions[randomIndex];
    }

    // Concatenates an affirmation string and a suggestion of what to do next
    private getAffirmationSuggestion(result: ProcessResult): string {
        const command: string = result.processInput.command;
        
        if(!(result.processInput.command in Suggestions.commands)) {
            console.error(`Unrecognized command in Teacher.ts: ${command}`)
            return this.getRandomSuggestion(Suggestions["error"]);
        }
        // TODO: devise a better way to handle argument-specific suggestions
        else if(command === "ls" && result.processInput.arguments[0] === "-l") {
            const affirmation = this.getRandomSuggestion(Suggestions["affirmations"]);
            const suggestion = this.getRandomSuggestion(Suggestions.commands.ls["success_with_-l"])

            return affirmation + " " + suggestion;
        }
        else {
            const affirmation = this.getRandomSuggestion(Suggestions["affirmations"]);
            const suggestion = this.getRandomSuggestion(Suggestions["commands"]
            [command as keyof typeof Suggestions.commands].success)

            return affirmation + " " + suggestion;
        }
    }

    // Retrieves information from the command's error key
    private getErrorSuggestion(result: ProcessResult): string {
        const command: string = result.processInput.command;

        if(!(result.processInput.command in Suggestions.commands)) {
            console.error(`Unrecognized command in Teacher.ts: ${command}`)
            return this.getRandomSuggestion(Suggestions["error"]);
        }
        else {
            const suggestion = this.getRandomSuggestion(Suggestions["commands"]
            [command as keyof typeof Suggestions.commands].error)

            return suggestion;
        }
    }

}

export default Teacher;