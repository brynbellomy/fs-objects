
import _ = require('lodash')
import fs = require('fs')
import when = require('when')
import whenNode = require('when/node')
var $fs: any = whenNode.liftAll(fs)

import FSObject = require('./FSObject')
import Path = require('./FSPath')
import File = require('./File')
import FileCollection = require('./FileCollection')
import {Type, createFSObjectsFromPathsSync} from './common'


export = Directory

class Directory extends FSObject
{
    constructor(path:Path|string) {
        super(path, Type.Directory)
    }

    refresh(): void {
        super.refresh()
        this._contents = null
    }

    subpath (filename:string): Path {
        return this.path.push(filename)
    }

    contains (filename:string): boolean {
        return this.contents.contains(filename)
    }

    file (filename:string): File {
        return new File(this.subpath(filename))
    }

    dir (dirname:string): Directory {
        return new Directory(this.subpath(dirname))
    }


    /**
        fs.readFile wrapper
     */

    private _contents: FileCollection;

    get contents(): FileCollection {
        if (this._contents === null || this._contents === undefined) {
            var filenames = fs.readdirSync(this.path.pathString)
            this._contents = this.filenamesToFileCollection(filenames)
        }
        return this._contents
    }

    loadContents(force:boolean = false): when.Promise<FileCollection>
    {
        if (force === true || this._contents === null || this._contents === undefined)
        {
            return $fs.readdir(this.path.pathString)
                      .then((filenames: string[]) => this.filenamesToFileCollection(filenames))
                      .then((files: FileCollection) => {
                          this._contents = files
                          return this._contents
                      })

        }
        else { return when.resolve(this._contents) }
    }

    private filenamesToFileCollection(filenames:string[]): FileCollection {
        var filepaths = filenames.map((filename) => this.subpath(filename))
        var fsobjs = createFSObjectsFromPathsSync(filepaths)

        var contents: FileCollection.Listing = {}
        for (let fsobj of fsobjs) {
            contents[ fsobj.path.basename ] = fsobj
        }
        return new FileCollection(contents)
    }

}




