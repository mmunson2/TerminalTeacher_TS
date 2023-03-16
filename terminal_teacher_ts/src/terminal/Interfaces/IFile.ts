/********************************************************************************
 * Interface - File
 * 
 * Represents the most generic form of a file - should be extendible to hold
 * just about anything, including other files.
 * 
 *******************************************************************************/
interface IFile {
    name: string;
    contents: any;
    getSize(): number;
}

export default IFile;