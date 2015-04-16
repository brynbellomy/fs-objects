import when = require('when');
import FSObject = require('./FSObject');
import Path = require('./FSPath');
declare class File extends FSObject {
    constructor(path: Path);
    private _contents;
    contents: Buffer;
    loadContents(force?: boolean): when.Promise<Buffer>;
}
export = File;
