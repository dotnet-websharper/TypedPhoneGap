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

/// org.apache.cordova.file-transfer plugin:
/// https://github.com/apache/cordova-plugin-file-transfer/
///
/// <reference path="FileSystem.ts" />

module TypedPhoneGap.FileTransfer {

    import FileEntry = FileSystem.FileEntry;

    export interface Plugin {
        createTool(): Tool;
    }

    export interface Tool {
        onprogress: (progress: ProgressEvent) => void;
        upload(fileURL: string,
            server: string,
            successCallback: (result: FileUploadResult) => void,
            errorCallback: (error: Error) => void,
            options?: FileUploadOptions,
            trustAllHosts?: boolean): void;
        download(source: string,
            target: string,
            successCallback: (fileEntry: FileEntry) => void,
            errorCallback: (error: Error) => void,
            trustAllHosts: boolean,
            options?: FileDownloadOptions): void;
        abort(): void;
    }

    export interface FileUploadOptions {
        fileKey?: string;
        fileName?: string;
        mimeType?: string;
        params?: any;
        chunkedMode?: boolean;
        headers?: any;
    }

    export interface FileDownloadOptions {
        headers?: any;
    }

    export interface FileUploadResult {
        bytesSent: number;
        responseCode: number;
        response: string;
        headers: any;
    }

    export interface FileTransferError {
        code: ErrorCode;
        source: string;
        target: string;
        http_status: number;
    }

    export interface ErrorCode { }

    export module ErrorCode {
        var errorCodes = Utility.field<any>(window, "FileTransferError", {});
        export var Abort = errorCodes.ABORT_ERR;
        export var ConnectionError = errorCodes.CONNECTION_ERR;
        export var FileNotFound = errorCodes.FILE_NOT_FOUND_ERR;
        export var InvalidUrl = errorCodes.INVALID_URL_ERR;
    }

    interface ToolStatics {
        new (): Tool;
    }

    var p = Utility.definePlugin<Plugin>({
        id: "org.apache.cordova.file-transfer",
        name: "TypedPhoneGap.FileTransfer",
        def: function () {
            var st = Utility.field<ToolStatics>(window, "FileTransfer");
            var p: Plugin = { createTool: function () { return new st(); } };
            return p;
        }
    });

    export function getPlugin() {
        return p.getPlugin();
    }
}
