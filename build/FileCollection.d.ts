import FSObject = require('./FSObject');
import File = require('./File');
export = FileCollection;
declare class FileCollection {
    private listing;
    constructor(listing: FileCollection.Listing);
    map<T>(transform: (obj: FSObject) => T): T[];
    files: File[];
    filenames: string[];
    contains(filename: string): boolean;
    filter(predicate: FileCollection.FilterPredicate): FileCollection;
}
declare module FileCollection {
    interface Listing {
        [name: string]: FSObject;
    }
    interface FilterPredicate {
        (file: File): boolean;
    }
}
