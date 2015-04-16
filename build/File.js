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
var common = require('./common');
var Type = common.Type;
var File = (function (_super) {
    __extends(File, _super);
    function File(path) {
        _super.call(this, path, Type.File);
        this._contents = null;
    }
    Object.defineProperty(File.prototype, "contents", {
        get: function () {
            if (!this._contents) {
                this._contents = fs.readFileSync(this.path.pathString);
            }
            return this._contents;
        },
        enumerable: true,
        configurable: true
    });
    File.prototype.loadContents = function (force) {
        var _this = this;
        if (force === void 0) { force = false; }
        if (force === true || this._contents === null || this._contents === undefined) {
            return $fs.readFile(this.path.pathString).then(function (buffer) {
                _this._contents = buffer;
                return buffer;
            });
        }
        else {
            return when.resolve(this._contents);
        }
    };
    return File;
})(FSObject);
module.exports = File;
//# sourceMappingURL=File.js.map