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
    Path.prototype.pop = function () {
        var parts = this.pathParts;
        parts.pop();
        return new Path(parts);
    };
    Path.prototype.push = function (str) {
        return new Path(path.join(this.pathString, str));
    };
    return Path;
})();
module.exports = Path;
//# sourceMappingURL=FSPath.js.map