import fs = require('fs')
import path = require('path')
import when = require('when')
import whenNode = require('when/node')
var $fs = whenNode.liftAll(fs)

import common = require('./common')


class Path
{
    get pathParts(): string[] { return this.pathString.split(path.sep) }

    constructor(thePath:string|string[])
    {
        if (typeof thePath === 'string') {
            this.pathString = thePath
        }
        else if (thePath instanceof Array) {
            this.pathString = thePath.reduce((into, each) => path.join(into, each))
        }
        else {
            throw new Error(`Unexpected argument '${thePath}'.`)
        }
    }

    pathString: string;

    exists():                      boolean  { return fs.existsSync(this.pathString) }
    existsAsync():    when.Promise<boolean> { return $fs.exists(this.pathString) }

    type():                        common.Type  { return common.getPathTypeSync(this) }
    typeAsync():      when.Promise<common.Type> { return common.getPathTypeAsync(this) }

    get basename(): string { return path.basename(this.pathString) }
    get extname():  string { return path.extname(this.pathString) }
    get dirname():  string { return path.dirname(this.pathString) }

    transposedToNewParentDir (parent: string|Path): Path {
        var p: Path
        if (typeof parent === 'string') {
            p = new Path(parent)
        }
        else { p = parent }

        return p.push(this.basename)
    }

    withExtension (ext:string): Path {
        if (ext[0] !== '.') { ext = `.${ext}` }

        let newPath = this.pathString.replace(this.extname, ext)
        return new Path(newPath)
    }

    pop(): Path {
        var parts = this.pathParts
        parts.pop()
        return new Path(parts)
    }

    push(...paths:string[]): Path {
        let newPath = path.join(...[this.pathString].concat(paths))
        return new Path(newPath)
    }
}

export = Path


