
declare module "fs-objects/FileCollection"
{
    import FSObject = require('fs-objects/FSObject');
    import File = require('fs-objects/File');

    export = FileCollection;
    class FileCollection {
        private listing;
        constructor(listing: FileCollection.Listing);
        map<T>(transform: (obj: FSObject) => T): T[];
        files: File[];
        filenames: string[];
        contains(filename: string): boolean;
        objectNamed (filename:string): FSObject;
        filter(predicate: FileCollection.FilterPredicate): FileCollection;
    }

    module FileCollection {
        interface Listing {
            [name: string]: FSObject;
        }
        interface FilterPredicate {
            (file: File): boolean;
        }
    }
}
