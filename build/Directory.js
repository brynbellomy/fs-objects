var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var fs = require('fs');
var when = require('when');
var whenNode = require('when/node');
var $fs = whenNode.liftAll(fs);
var FSObject = require('./FSObject');
var File = require('./File');
var FileCollection = require('./FileCollection');
var common = require('./common');
var Directory = (function (_super) {
    __extends(Directory, _super);
    function Directory(path) {
        _super.call(this, path, common.Type.Directory);
    }
    Directory.prototype.refresh = function () {
        _super.prototype.refresh.call(this);
        this._contents = null;
    };
    Directory.prototype.subpath = function (filename) {
        return this.path.push(filename);
    };
    Directory.prototype.contains = function (filename) {
        return this.contents.contains(filename);
    };
    Directory.prototype.file = function (filename) {
        return new File(this.subpath(filename));
    };
    Directory.prototype.dir = function (dirname) {
        return new Directory(this.subpath(dirname));
    };
    Object.defineProperty(Directory.prototype, "contents", {
        get: function () {
            if (this._contents === null || this._contents === undefined) {
                var filenames = fs.readdirSync(this.path.pathString);
                this._contents = this.filenamesToFileCollection(filenames);
            }
            return this._contents;
        },
        enumerable: true,
        configurable: true
    });
    Directory.prototype.loadContents = function (force) {
        var _this = this;
        if (force === void 0) { force = false; }
        if (force === true || this._contents === null || this._contents === undefined) {
            return $fs.readdir(this.path.pathString)
                .then(function (filenames) { return _this.filenamesToFileCollection(filenames); })
                .then(function (files) {
                _this._contents = files;
                return _this._contents;
            });
        }
        else {
            return when.resolve(this._contents);
        }
    };
    Directory.prototype.filenamesToFileCollection = function (filenames) {
        var _this = this;
        var filepaths = filenames.map(function (filename) { return _this.subpath(filename); });
        var fsobjs = common.createFSObjectsFromPathsSync(filepaths);
        var contents = {};
        for (var _i = 0; _i < fsobjs.length; _i++) {
            var fsobj = fsobjs[_i];
            contents[fsobj.path.basename] = fsobj;
        }
        return new FileCollection(contents);
    };
    return Directory;
})(FSObject);
module.exports = Directory;
//# sourceMappingURL=Directory.js.map