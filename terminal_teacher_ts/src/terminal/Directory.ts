import IDirectory from "./interfaces/IDirectory";
import File from "./File";
import TextFile from "./TextFile";

/********************************************************************************
 * Directory
 * 
 * A subclass of File that contains more Files! Contains a number of methods
 * for interacting with its contents.
 * 
 * - add() - attempts to add a file to the directory. Returns true if successful,
 *           false if the file already exists.
 * 
 * - getDirectory() - checks if a child directory with the given name exists in
 *                    the given directory. ONLY checks first level (this dir).
 *                    Returns directory if found, false if not.
 * 
 * - getTextFile() - checks if a child TextFile with the given name exists in the
 *                   given directory. ONLY checks the first level (this dir).
 *                   Returns File if found, false if not.
 * 
 * - toString() - returns the directory contents formatted as a string. Each
 *                File/Directory is given its own line.
 * 
 * - GetContentsWithSize() - Similar to toString(), but also includes the
 *                           size of each entry.
 * 
 * - getSize() - Overridden to return the recursive sum of all files and
 *               directories inside the current directory.
 * 
 * @todo: Consider renaming GetContentsWithSize() to resemble ToString() more.
 * 
 *******************************************************************************/
class Directory extends File implements IDirectory {
    
    public add(file: File): boolean {
        if(File instanceof Directory && this.getDirectory(file.name)) {
            return false;
        }
        else if(file instanceof TextFile && this.getTextFile(file.name + "." + file.extension)) {
            return false;
        }

        this.contents.push(file);
        return true;
    }

    public getDirectory(dirName: string): Directory | false {
        for(let file of this.contents) {
            if(file instanceof Directory && file.name === dirName) {
                return file;
            }
        }

        return false;
    }

    public getTextFile(filename: string): TextFile | false {
        for(let file of this.contents) {
            if(file instanceof TextFile && file.getCompleteName() === filename) {
                return file;
            }
        }

        return false;
    }

    public toString(): string {
        let contents = "";

        for(let file of this.contents) {
            
            if(file instanceof TextFile) {
                contents += " - ";
                contents += file.name;
                contents += ".";
                contents += file.extension;
                contents += "\n";
            }
            else {
                contents += " - ";
                contents += file.name;
                contents += "\n";
            }
        }

        return contents;
    }

    public getContentsWithSize(): string {
        let contents = "";

        for (let file of this.contents) {
            
            if(file instanceof TextFile) {
                contents += file.name;
                contents += ".";
                contents += file.extension;
                contents += " ";
                contents += file.getSize();
                contents += "\n"
            }
            else {
                contents += file.name;
                contents += " "
                contents += file.getSize();
                contents += "\n";
            }
        }

        return contents;
    }

    public getSize(): number {
        let size = 0;

        for(let file of this.contents) {
            size += file.getSize();
        }

        return size;
    }
}

export default Directory;