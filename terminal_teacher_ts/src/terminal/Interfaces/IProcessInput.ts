/********************************************************************************
 * Interface - Process Input
 * 
 * The input variables to a process.
 * - command: The command to be executed as typed in the terminal (e.g "cd")
 * - arguments: Any additional arguments to be passed into the function
 * 
 *******************************************************************************/
interface IProcessInput {
    command: string;
    arguments: Array<string>;
}

export default IProcessInput;