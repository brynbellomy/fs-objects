

declare module "fs-objects/FSPath"
{

    import when = require('when');
    import common = require('fs-objects/common');

    export = Path;
    class Path {
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
        transposedToNewParentDir(parent: string|Path): Path;
        withExtension(ext:string): Path;
        pop(): Path;
        // push(str: string): Path;
        push(...paths:string[]): Path;
    }
}