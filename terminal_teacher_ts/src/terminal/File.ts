import IFile from "./Interfaces/IFile";

/********************************************************************************
 * File
 * 
 * Parent class for all file objects. This currently includes Files and
 * Directories.
 * 
 * - Name: A string to identify the file
 * 0 Contents: Whatever is going in the file
 * 
 *******************************************************************************/
class File implements IFile {
    private _name: string = "";
    private _contents: any = "";

    constructor(name: string, contents: any) {
        this.name = name;
        this.contents = contents;
    }

    public get name(): string {
        return this._name;
    }

    public get contents(): any {
        return this._contents;
    }

    public set name(name: string) {
        this._name = name;
    }

    public set contents(contents: any) {
        this._contents = contents;
    }

    public getSize(): number {
        if(this.contents && this.contents.length) {
            return this.contents.length;
        }
        else {
            console.warn(`File contents ${this.contents} have no length property. Defaulting to zero.`)
            return 0;
        }
    }
}

export default File;