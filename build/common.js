var fs = require('fs');
var when = require('when');
var whenNode = require('when/node');
var $fs = whenNode.liftAll(fs);
// import File = require('./File')
// import Directory = require('./Directory')
(function (Type) {
    Type[Type["File"] = 0] = "File";
    Type[Type["Directory"] = 1] = "Directory";
})(exports.Type || (exports.Type = {}));
var Type = exports.Type;
function uninitialized(obj) {
    return obj === null || obj === undefined;
}
exports.uninitialized = uninitialized;
function valueOrDefault(value, defaultValue) {
    if (uninitialized(value)) {
        return defaultValue;
    }
    else {
        return value;
    }
}
exports.valueOrDefault = valueOrDefault;
function getPathTypeSync(p) {
    var stats = fs.statSync(p.pathString);
    if (stats.isFile()) {
        return Type.File;
    }
    else if (stats.isDirectory()) {
        return Type.Directory;
    }
    else {
        throw new Error("Unknown type of file system object (path: " + p.pathString + ")");
    }
}
exports.getPathTypeSync = getPathTypeSync;
function getPathTypeAsync(p) {
    return $fs.stat(p.pathString).then(function (stats) {
        if (stats.isFile()) {
            return when.resolve(Type.File);
        }
        else if (stats.isDirectory()) {
            return when.resolve(Type.Directory);
        }
        else {
            return when.reject("Unknown type of file system object (path: " + p.pathString + ")");
        }
    });
}
exports.getPathTypeAsync = getPathTypeAsync;
function typeToString(type) {
    switch (type) {
        case Type.File: return 'File';
        case Type.Directory: return 'Directory';
        default: return null;
    }
}
exports.typeToString = typeToString;
/** Factory function, returns a fully initialized File or Directory object. */
function createFSObjectFromPath(path) {
    return $fs.stat(path).then(function (stats) {
        var File = require('./File');
        var Directory = require('./Directory');
        // var p = new Path(path)
        if (stats.isFile()) {
            return new File(path);
        }
        else if (stats.isDirectory()) {
            return new Directory(path);
        }
        else {
            return null;
        }
    });
}
exports.createFSObjectFromPath = createFSObjectFromPath;
function createFSObjectFromPathSync(path) {
    var File = require('./File');
    var Directory = require('./Directory');
    var stats = fs.statSync(path.pathString);
    // var p = new Path(path)
    if (stats.isFile()) {
        return new File(path);
    }
    else if (stats.isDirectory()) {
        return new Directory(path);
    }
    else {
        return null;
    }
}
exports.createFSObjectFromPathSync = createFSObjectFromPathSync;
function createFSObjectsFromPaths(paths) {
    var promises = paths.map(function (path) { return createFSObjectFromPath(path); });
    return when.join(promises);
}
exports.createFSObjectsFromPaths = createFSObjectsFromPaths;
function createFSObjectsFromPathsSync(paths) {
    return paths.map(function (path) { return createFSObjectFromPathSync(path); });
}
exports.createFSObjectsFromPathsSync = createFSObjectsFromPathsSync;
//# sourceMappingURL=common.js.map