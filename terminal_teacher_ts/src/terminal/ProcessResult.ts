import IProcessResult, { ResultCode } from "./Interfaces/IProcessResult";
import ProcessInput from "./ProcessInput";

/********************************************************************************
 * Process Result
 * 
 * A DTO for recording the result of a command execution.
 * 
 * - processInput: The unmodified ProcessInput object that went into execute()
 * - resultCode: Enum describing if the process succeeded, failed, or could not
 *               be found
 * - details: Additional information about the process. Is usually empty when
 *            the process succeeds. Is ususally printed directly to console
 *            when a process fails.
 * 
 *******************************************************************************/
class ProcessResult implements IProcessResult {
    
    private _processInput: ProcessInput;
    private _resultCode: ResultCode = ResultCode.ERROR;
    private _details: string = "";
    
    constructor(processInput: ProcessInput, resultCode: ResultCode, details: string) {
        this._processInput = processInput;
        this.resultCode = resultCode;
        this.details = details;
    }

    get processInput(): ProcessInput {
        return this._processInput;
    }

    set processInput(processInput: ProcessInput) {
        this._processInput = processInput;
    }

    get resultCode(): ResultCode {
        return this._resultCode;
    } 

    set resultCode(code: ResultCode) {
        this._resultCode = code;
    }

    get details(): string {
        return this._details;
    }

    set details(details: string) {
        this._details = details;
    }
}

export default ProcessResult;