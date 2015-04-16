import fs = require('fs');
import when = require('when');
import Path = require('./FSPath');
import common = require('./common');
export = FSObject;
declare class FSObject {
    path: Path;
    type: common.Type;
    constructor(p: Path, type: common.Type);
    basename: string;
    extname: string;
    dirname: string;
    /**
        Clear all cached info about the file/dir.
     */
    refresh(): void;
    private _exists;
    exists(): boolean;
    loadExists(force?: boolean): when.Promise<boolean>;
    private _stats;
    stats(): fs.Stats;
    loadStats(force?: boolean): when.Promise<fs.Stats>;
}