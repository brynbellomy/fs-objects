

declare module "fs-objects/File"
{
    import when = require('when');
    import FSObject = require('fs-objects/FSObject');
    import Path = require('fs-objects/FSPath');

    export = File;
    class File extends FSObject {
        constructor(path: Path|string);
        private _contents;
        contents: Buffer;
        loadContents(force?: boolean): when.Promise<Buffer>;
    }
}
