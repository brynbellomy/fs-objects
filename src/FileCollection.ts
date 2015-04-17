
import _ = require('lodash')
import FSObject = require('./FSObject')


export = FileCollection

class FileCollection
{
    private listing: FileCollection.Listing;

    constructor (listing:FileCollection.Listing) {
        this.listing = listing
    }

    map <T> (transform:(obj:FSObject) => T): T[] {
        return this.files.map(transform)
    }

    get files():     FSObject[]   { return <FSObject[]> _.valuesIn(this.listing) }
    get filenames(): string[] { return _.keysIn(this.listing) }

    objectNamed (filename:string): FSObject {
        return this.listing[filename]
    }

    contains (filename:string): boolean {
        return !!this.listing[filename]
    }

    filter (predicate: FileCollection.FilterPredicate): FileCollection {
        let filteredListing = <FileCollection.Listing> _.pick(this.listing, (value, key, obj) => { return predicate(value) === true })
        return new FileCollection(filteredListing)
    }
}


module FileCollection
{
    export interface Listing {
        [name: string]: FSObject;
    }

    export interface FilterPredicate {
        (file:File): boolean;
    }
}




