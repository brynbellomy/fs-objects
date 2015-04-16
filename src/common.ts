import fs = require('fs')
import when = require('when')
import whenNode = require('when/node')
var $fs = whenNode.liftAll(fs)

import FSObject = require('./FSObject')
import Path = require('./FSPath')
// import File = require('./File')
// import Directory = require('./Directory')


export enum Type {
    File, Directory
}

export function uninitialized(obj:any): boolean {
    return obj === null || obj === undefined
}

export function valueOrDefault <T> (value:T, defaultValue:T) {
    if (uninitialized(value)) {
        return defaultValue
    }
    else { return value }
}

export function getPathTypeSync(p:Path): Type
{
    var stats = fs.statSync(p.pathString)
    if (stats.isFile())           { return Type.File }
    else if (stats.isDirectory()) { return Type.Directory }
    else { throw new Error(`Unknown type of file system object (path: ${p.pathString})`) }
}


export function getPathTypeAsync(p:Path): when.Promise<Type>
{
    return $fs.stat(p.pathString).then((stats) => {
        if (stats.isFile())           { return when.resolve(Type.File) }
        else if (stats.isDirectory()) { return when.resolve(Type.Directory) }
        else { return when.reject(`Unknown type of file system object (path: ${p.pathString})`) }
    })
}


export function typeToString (type:Type): string
{
    switch (type) {
        case Type.File:        return 'File'
        case Type.Directory:   return 'Directory'
        default: return null
    }
}



/** Factory function, returns a fully initialized File or Directory object. */
export function createFSObjectFromPath(path:Path): when.Promise<FSObject>
{
    return $fs.stat(path).then((stats:fs.Stats) => {
        var File = require('./File')
        var Directory = require('./Directory')
        // var p = new Path(path)
        if (stats.isFile())           { return <FSObject> new File(path)      }
        else if (stats.isDirectory()) { return <FSObject> new Directory(path) }
        else                          { return <FSObject> null }
    })
}


export function createFSObjectFromPathSync(path:Path): FSObject
{
    var File = require('./File')
    var Directory = require('./Directory')
    var stats = fs.statSync(path.pathString)
    // var p = new Path(path)
    if (stats.isFile())           { return <FSObject> new File(path)      }
    else if (stats.isDirectory()) { return <FSObject> new Directory(path) }
    else                          { return <FSObject> null }
}


export function createFSObjectsFromPaths(paths:Path[]): when.Promise<FSObject[]> {
    var promises = paths.map((path) => createFSObjectFromPath(path))
    return when.join<FSObject>(promises)
}


export function createFSObjectsFromPathsSync(paths:Path[]): FSObject[] {
    return paths.map((path) => createFSObjectFromPathSync(path))
}
