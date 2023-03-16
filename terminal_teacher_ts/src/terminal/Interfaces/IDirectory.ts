import Directory from "../Directory";
import IFile from "./IFile";
import TextFile from "../TextFile";
import File from "../File"

/********************************************************************************
 * Interface - Directory
 * 
 * A directory should hold other Files of some sort.
 * 
 * @todo: Probably needs a remove method :)
 *******************************************************************************/
interface IDirectory extends IFile{
    contents: Array<IFile>
    add(file: File): boolean
    toString(): string
    getTextFile(filename: string): TextFile | false
    getDirectory(dirName: string): Directory | false
    getSize(): number;
}

export default IDirectory;