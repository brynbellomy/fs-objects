import fs = require('fs')
import path = require('path')
import when = require('when')
import whenNode = require('when/node')
var $fs = whenNode.liftAll(fs)

import Path = require('./FSPath')
import common = require('./common')
import typeToString = common.typeToString


export = FSObject

class FSObject
{
    path: Path;
    type: common.Type;

    get pathString(): string { return this.path.pathString }

    constructor(p:Path|string, type:common.Type)
    {
        var thePath: Path = (typeof p === 'string') ? new Path(p) : p

        // check that it exists
        if (thePath.exists() !== true) {
            console.error(`Tried to instantiate non-hypothetical FSObject (type: ${typeToString(type)}) but the path does not exist. (path = ${thePath.pathString})`)
            throw new Error(`Tried to instantiate non-hypothetical FSObject (type: ${typeToString(type)}) but the path does not exist. (path = ${thePath.pathString})`)
        }

        // check that the type matches the real file
        var actualType = thePath.type()
        if (actualType !== type) {
            console.error(`Tried to instantiate non-hypothetical FSObject (type: ${typeToString(type)}) but existing path is a ${typeToString(actualType)}. (path = ${thePath.pathString})`)
            throw new Error(`Tried to instantiate non-hypothetical FSObject (type: ${typeToString(type)}) but existing path is a ${typeToString(actualType)}. (path = ${thePath.pathString})`)
        }

        this.path = thePath
        this.type = type
    }


    get basename(): string { return this.path.basename }
    get extname(): string { return this.path.extname }
    get dirname(): string { return this.path.dirname }




    /**
        Clear all cached info about the file/dir.
     */
    refresh(): void {
        this._exists = null
        this._stats  = null
    }


    //
    // `fs.exists` wrapper
    //

    private _exists: boolean;

    exists(): boolean {
        if (this._exists === null || this._exists === undefined) {
            this._exists = this.path.exists()
        }
        return this._exists
    }

    loadExists(force:boolean = false): when.Promise<boolean> {
        if (force === true || this._exists === null || this._exists === undefined) {
            return $fs.exists(this.path)
                      .then((exists) => { this._exists = exists; return exists })
        }
        else { return when.resolve(this._exists) }
    }



    //
    // `fs.stats` wrapper
    //

    private _stats: fs.Stats;

    stats(): fs.Stats {
        if (this._stats === null || this._stats === undefined) {
            this._stats = fs.statSync(this.path.pathString)
        }
        return this._stats
    }

    loadStats(force:boolean = false): when.Promise<fs.Stats> {
        if (force === true || this._stats === null || this._stats === undefined) {
            return $fs.stat(this.path)
                      .then((stats:fs.Stats) => { this._stats = stats; return stats })
        }
        else { return when.resolve(this._stats) }
    }
}





