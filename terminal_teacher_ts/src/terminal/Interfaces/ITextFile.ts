import IFile from "./IFile";

/********************************************************************************
 * Interface - Text File
 * 
 * A child class of IFile that:
 * - Has an extension string (e.g. ".txt")
 * - Has contents of type string
 * 
 *******************************************************************************/
interface ITextFile extends IFile {
    name: string;
    extension: string;
    contents: string;
    getSize(): number;
}

export default ITextFile;