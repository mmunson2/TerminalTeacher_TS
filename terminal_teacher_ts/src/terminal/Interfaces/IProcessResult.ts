import ProcessInput from "../ProcessInput";

/********************************************************************************
 * Enum - Result Code
 * 
 * Represents the possible states that at process may result in.
 *******************************************************************************/
enum ResultCode {
    SUCCESS = "Process completed successfully",
    ERROR = "Process encountered an error",
    NOT_FOUND = "Process could not be found"
}

/********************************************************************************
 * Interface - Process Result
 * 
 * - processInput: The input data to the process
 * - resultCode: ResultCode enum
 * - details: Any additional information about the process result
 * 
 *******************************************************************************/
interface IProcessResult {
    processInput: ProcessInput
    resultCode: ResultCode
    details: string
}

export {ResultCode}
export default IProcessResult