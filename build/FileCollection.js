var _ = require('lodash');
var FileCollection = (function () {
    function FileCollection(listing) {
        this.listing = listing;
    }
    FileCollection.prototype.map = function (transform) {
        return this.files.map(transform);
    };
    Object.defineProperty(FileCollection.prototype, "files", {
        get: function () { return _.valuesIn(this.listing); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileCollection.prototype, "filenames", {
        get: function () { return _.keysIn(this.listing); },
        enumerable: true,
        configurable: true
    });
    FileCollection.prototype.contains = function (filename) {
        return !!this.listing[filename];
    };
    FileCollection.prototype.filter = function (predicate) {
        var filteredListing = _.pick(this.listing, function (value, key, obj) { return predicate(value) === true; });
        return new FileCollection(filteredListing);
    };
    return FileCollection;
})();
module.exports = FileCollection;
//# sourceMappingURL=FileCollection.js.map