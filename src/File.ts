

import fs = require('fs')
import when     = require('when')
import whenNode = require('when/node')
var $fs = whenNode.liftAll(fs)

import FSObject = require('./FSObject')
import Path     = require('./FSPath')
import common     = require('./common')
import Type = common.Type



class File extends FSObject
{
    constructor (path:Path) {
        super(path, Type.File)
    }

    private _contents: Buffer = null;

    get contents(): Buffer {
        if (!this._contents) {
            this._contents = fs.readFileSync(this.path.pathString)
        }
        return this._contents
    }

    loadContents(force:boolean = false): when.Promise<Buffer> {
        if (force === true || this._contents === null || this._contents === undefined) {
            return $fs.readFile(this.path.pathString).then((buffer) => {
                this._contents = buffer
                return buffer
            })
        }
        else { return when.resolve(this._contents) }
    }
}

export = File
