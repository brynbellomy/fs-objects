import when = require('when');
import FSObject = require('./FSObject');
import Path = require('./FSPath');
export declare enum Type {
    File = 0,
    Directory = 1,
}
export declare function uninitialized(obj: any): boolean;
export declare function valueOrDefault<T>(value: T, defaultValue: T): T;
export declare function getPathTypeSync(p: Path): Type;
export declare function getPathTypeAsync(p: Path): when.Promise<Type>;
export declare function typeToString(type: Type): string;
/** Factory function, returns a fully initialized File or Directory object. */
export declare function createFSObjectFromPath(path: Path): when.Promise<FSObject>;
export declare function createFSObjectFromPathSync(path: Path): FSObject;
export declare function createFSObjectsFromPaths(paths: Path[]): when.Promise<FSObject[]>;
export declare function createFSObjectsFromPathsSync(paths: Path[]): FSObject[];
