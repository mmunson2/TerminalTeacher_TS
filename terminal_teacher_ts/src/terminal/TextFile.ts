import ITextFile from "./Interfaces/ITextFile";
import File from "./File";

/********************************************************************************
 * Text File
 * 
 * (inherited) name - the name of the file
 * (inherited) contents - this must be a string for a text file
 * extension - the file extension
 * 
 * A derivative of File that:
 * - requires an extension (e.g ".txt")
 * - requires the contents of the file to be a string
 * 
 *******************************************************************************/
class TextFile extends File implements ITextFile {

    private _extension: string = "";

    constructor(name: string, extension: string, contents: string) {
        super(name, contents);

        this.extension = extension;
    }

    get extension() {
        return this._extension;
    }

    set extension(extension: string) {
        this._extension = extension;
    }

    public getCompleteName(): string {
        return this.name + "." + this.extension;
    }
}

export default TextFile;