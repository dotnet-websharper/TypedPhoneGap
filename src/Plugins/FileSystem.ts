// Copyright 2013-2014 IntelliFactory
//
// Licensed under the Apache License, Version 2.0 (the "License"); you
// may not use this file except in compliance with the License.  You may
// obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
// implied.  See the License for the specific language governing
// permissions and limitations under the License.

/// org.apache.cordova.file plugin:
/// https://github.com/apache/cordova-plugin-file
/// NOTE: this module is incomplete, and exposes the minimum
/// necessary to type the FileTransfer module.

module TypedPhoneGap.FileSystem {

    // FROM http://www.w3.org/TR/file-system-api/

    export interface FileSystemInfo {
        name: string;
        root: DirectoryEntry;
    }

    export interface Entry {
        isFile: boolean;
        isDirectory: boolean;
        getMetadata(successCallback: (metadata: Metadata) => void,
            errorCallback?: (error: Error) => void): void;
        name: string;
        fullPath: string;
        fileSystem: FileSystemInfo;
        moveTo(parent: DirectoryEntry,
            newName?: string,
            successCallback?: (entry: Entry) => void,
            errorCallback?: (error: Error) => void);
        copyTo(parent: DirectoryEntry,
            newName?: string,
            successCallback?: (entry: Entry) => void,
            errorCallback?: (error: Error) => void);
        toURL(): string;
        remove(successCallback: () => void,
            errorCallback?: (error: Error) => void);
        getParent(successCallback: (entry: Entry) => void,
            errorCallback?: (error: Error) => void);
    }

    export interface Metadata {
        modificationTime: Date;
        size: number;
    }

    export interface FileEntry extends Entry {
        createWriter(successCallback: (writer: FileWriter) => void,
            errorCallback?: (error: Error) => void): void;
        file(successCallback: (file: File) => void,
            errorCallback?: (error: Error) => void): void;
    }

    export interface DirectoryEntry extends Entry {
        createReader(): DirectoryReader;
        getFile(path: string, options?: Flags,
            successCallback?: (entry: FileEntry) => void,
            errorCallback?: (error: Error) => void): void;
        getDirectory(path: string, options?: Flags,
            successCallback?: (entry: DirectoryEntry) => void,
            errorCallback?: (error: Error) => void): void;
        removeRecursively(successCallback: () => void,
            errorCallback?: (error: Error) => void): void;
    }

    export interface Flags {
        create?: boolean;
        exclusive?: boolean;
    }

    export interface DirectoryReader {
        readEntries(successCallback: (entries: Entry[]) => void,
            errorCallback?: (error: Error) => void): void;
    }

    // FROM http://www.w3.org/TR/file-writer-api/

    export interface FileSaver extends EventTarget {
        abort(): void;
        readyState: number;
        onwritestart: (event: ProgressEvent) => void;
        onprogress: (event: ProgressEvent) => void;
        onwrite: (event: ProgressEvent) => void;
        onabort: (event: ProgressEvent) => void;
        onerror: (event: ProgressEvent) => void;
        onwriteend: (event: ProgressEvent) => void;
        error: Error;
    }

    export interface FileWriter extends FileSaver {
        position: number;
        length: number;
        write(data: Blob): void;
        seek(offset: number): void;
        truncate(size: number): void;
    }
}

