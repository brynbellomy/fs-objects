

declare module "fs-objects/Directory"
{
    import when = require('when');
    import File = require('fs-objects/File');
    import FileCollection = require('fs-objects/FileCollection');
    import Path = require('fs-objects/FSPath');
    import FSObject = require('fs-objects/FSObject');

    export = Directory;
    class Directory extends FSObject {
        constructor(path: Path|string);
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
}
