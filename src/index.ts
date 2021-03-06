

export import FSObject = require('./FSObject')
export import Path = require('./FSPath')
export import File = require('./File')
export import FileCollection = require('./FileCollection')
export import Directory = require('./Directory')

import common = require('./common')

// @@TODO: these two functions don't really belong here
export import uninitialized = common.uninitialized
export import valueOrDefault = common.valueOrDefault

export import Type = common.Type
export import getPathTypeSync     = common.getPathTypeSync
export import createFSObjectFromPath      = common.createFSObjectFromPath
export import createFSObjectsFromPaths     = common.createFSObjectsFromPaths
export import createFSObjectFromPathSync  = common.createFSObjectFromPathSync
export import createFSObjectsFromPathsSync = common.createFSObjectsFromPathsSync
