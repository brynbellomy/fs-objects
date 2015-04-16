import when = require('when');
import FSObject = require('./FSObject');
import Path = require('./FSPath');
import File = require('./File');
import FileCollection = require('./FileCollection');
export = Directory;
declare class Directory extends FSObject {
    constructor(path: Path);
    refresh(): void;
    subpath(filename: string): Path;
    contains(filename: string): boolean;
    file(filename: string): File;
    dir(dirname: string): Directory;
    /**
        fs.readFile wrapper
     */
    private _contents;
    contents: FileCollection;
    loadContents(force?: boolean): when.Promise<FileCollection>;
    private filenamesToFileCollection(filenames);
}
