import when = require('when');
import common = require('./common');
declare class Path {
    pathParts: string[];
    constructor(thePath: string | string[]);
    pathString: string;
    exists(): boolean;
    existsAsync(): when.Promise<boolean>;
    type(): common.Type;
    typeAsync(): when.Promise<common.Type>;
    basename: string;
    extname: string;
    dirname: string;
    pop(): Path;
    push(str: string): Path;
}
export = Path;
