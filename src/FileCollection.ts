
import _ = require('lodash')

import FSObject = require('./FSObject')
import File = require('./File')


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

    get files():     File[]   { return <File[]> _.valuesIn(this.listing) }
    get filenames(): string[] { return _.keysIn(this.listing) }

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




