

declare module "fs-objects/common"
{
    import when = require('when');
    import FSObject = require('fs-objects/FSObject');
    import Path = require('fs-objects/FSPath');
    export enum Type {
        File = 0,
        Directory = 1,
    }
    export function uninitialized(obj: any): boolean;
    export function valueOrDefault<T>(value: T, defaultValue: T): T;
    export function getPathTypeSync(p: Path): Type;
    export function getPathTypeAsync(p: Path): when.Promise<Type>;
    export function typeToString(type: Type): string;
    /** Factory function, returns a fully initialized File or Directory object. */
    export function createFSObjectFromPath(path: Path): when.Promise<FSObject>;
    export function createFSObjectFromPathSync(path: Path): FSObject;
    export function createFSObjectsFromPaths(paths: Path[]): when.Promise<FSObject[]>;
    export function createFSObjectsFromPathsSync(paths: Path[]): FSObject[];
}
