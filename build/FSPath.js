var fs = require('fs');
var path = require('path');
var whenNode = require('when/node');
var $fs = whenNode.liftAll(fs);
var common = require('./common');
var Path = (function () {
    function Path(thePath) {
        if (typeof thePath === 'string') {
            this.pathString = thePath;
        }
        else if (thePath instanceof Array) {
            this.pathString = thePath.reduce(function (into, each) { return path.join(into, each); });
        }
        else {
            throw new Error("Unexpected argument '" + thePath + "'.");
        }
    }
    Object.defineProperty(Path.prototype, "pathParts", {
        get: function () { return this.pathString.split(path.sep); },
        enumerable: true,
        configurable: true
    });
    Path.prototype.exists = function () { return fs.existsSync(this.pathString); };
    Path.prototype.existsAsync = function () { return $fs.exists(this.pathString); };
    Path.prototype.type = function () { return common.getPathTypeSync(this); };
    Path.prototype.typeAsync = function () { return common.getPathTypeAsync(this); };
    Object.defineProperty(Path.prototype, "basename", {
        get: function () { return path.basename(this.pathString); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Path.prototype, "extname", {
        get: function () { return path.extname(this.pathString); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Path.prototype, "dirname", {
        get: function () { return path.dirname(this.pathString); },
        enumerable: true,
        configurable: true
    });
    Path.prototype.transposedToNewParentDir = function (parent) {
        var p;
        if (typeof parent === 'string') {
            p = new Path(parent);
        }
        else {
            p = parent;
        }
        return p.push(this.basename);
    };
    Path.prototype.withExtension = function (ext) {
        if (ext[0] !== '.') {
            ext = "." + ext;
        }
        var newPath = this.pathString.replace(this.extname, ext);
        return new Path(newPath);
    };
    Path.prototype.pop = function () {
        var parts = this.pathParts;
        parts.pop();
        return new Path(parts);
    };
    Path.prototype.push = function () {
        var paths = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            paths[_i - 0] = arguments[_i];
        }
        var newPath = path.join.apply(path, [this.pathString].concat(paths));
        return new Path(newPath);
    };
    return Path;
})();
module.exports = Path;
//# sourceMappingURL=FSPath.js.map