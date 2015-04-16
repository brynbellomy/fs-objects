var fs = require('fs');
var when = require('when');
var whenNode = require('when/node');
var $fs = whenNode.liftAll(fs);
var common = require('./common');
var typeToString = common.typeToString;
var FSObject = (function () {
    function FSObject(p, type) {
        // check that it exists
        if (p.exists() !== true) {
            console.error("Tried to instantiate non-hypothetical FSObject (type: " + typeToString(type) + ") but the path does not exist. (path = " + p.pathString + ")");
            throw new Error("Tried to instantiate non-hypothetical FSObject (type: " + typeToString(type) + ") but the path does not exist. (path = " + p.pathString + ")");
        }
        // check that the type matches the real file
        var actualType = p.type();
        if (actualType !== type) {
            console.error("Tried to instantiate non-hypothetical FSObject (type: " + typeToString(type) + ") but existing path is a " + typeToString(actualType) + ". (path = " + p.pathString + ")");
            throw new Error("Tried to instantiate non-hypothetical FSObject (type: " + typeToString(type) + ") but existing path is a " + typeToString(actualType) + ". (path = " + p.pathString + ")");
        }
        this.path = p;
        this.type = type;
    }
    Object.defineProperty(FSObject.prototype, "basename", {
        get: function () { return this.path.basename; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FSObject.prototype, "extname", {
        get: function () { return this.path.extname; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FSObject.prototype, "dirname", {
        get: function () { return this.path.dirname; },
        enumerable: true,
        configurable: true
    });
    /**
        Clear all cached info about the file/dir.
     */
    FSObject.prototype.refresh = function () {
        this._exists = null;
        this._stats = null;
    };
    FSObject.prototype.exists = function () {
        if (this._exists === null || this._exists === undefined) {
            this._exists = this.path.exists();
        }
        return this._exists;
    };
    FSObject.prototype.loadExists = function (force) {
        var _this = this;
        if (force === void 0) { force = false; }
        if (force === true || this._exists === null || this._exists === undefined) {
            return $fs.exists(this.path)
                .then(function (exists) { _this._exists = exists; return exists; });
        }
        else {
            return when.resolve(this._exists);
        }
    };
    FSObject.prototype.stats = function () {
        if (this._stats === null || this._stats === undefined) {
            this._stats = fs.statSync(this.path.pathString);
        }
        return this._stats;
    };
    FSObject.prototype.loadStats = function (force) {
        var _this = this;
        if (force === void 0) { force = false; }
        if (force === true || this._stats === null || this._stats === undefined) {
            return $fs.stat(this.path)
                .then(function (stats) { _this._stats = stats; return stats; });
        }
        else {
            return when.resolve(this._stats);
        }
    };
    return FSObject;
})();
module.exports = FSObject;
//# sourceMappingURL=FSObject.js.map