/// <reference path='./common.d.ts'/>
/// <reference path='./FSPath.d.ts'/>
/// <reference path='./FSObject.d.ts'/>
/// <reference path='./File.d.ts'/>
/// <reference path='./Directory.d.ts'/>
/// <reference path='./FileCollection.d.ts'/>


declare module "fs-objects"
{
    export import FSObject = require('fs-objects/FSObject');
    export import Path = require('fs-objects/FSPath');
    export import File = require('fs-objects/File');
    export import FileCollection = require('fs-objects/FileCollection');
    export import Directory = require('fs-objects/Directory');

    import common = require('fs-objects/common');
    export import uninitialized = common.uninitialized;
    export import valueOrDefault = common.valueOrDefault;
    export import Type = common.Type;
    export import getPathTypeSync = common.getPathTypeSync;
    export import createFSObjectFromPath = common.createFSObjectFromPath;
    export import createFSObjectsFromPaths = common.createFSObjectsFromPaths;
    export import createFSObjectFromPathSync = common.createFSObjectFromPathSync;
    export import createFSObjectsFromPathsSync = common.createFSObjectsFromPathsSync;
}



