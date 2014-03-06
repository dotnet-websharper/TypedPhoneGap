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

/// org.apache.cordova.media-capture plugin:
/// https://github.com/apache/cordova-plugin-media-capture

module TypedPhoneGap.MediaCapture {

    export interface Plugin {
        captureAudio(onSuccess: (mediaFiles: MediaFile[]) => void,
            onError: (error: Error) => void,
            options?: AudioOptions): void;
        captureImage(onSuccess: (mediaFiles: MediaFile[]) => void,
            onError: (error: Error) => void,
            options?: ImageOptions): void;
        captureVideo(onSuccess: (mediaFiles: MediaFile[]) => void,
            onError: (error: Error) => void,
            options?: VideoOptions): void;
        supportedAudioModes: ConfigurationData[];
        supportedImageModes: ConfigurationData[];
        supportedVideoModes: ConfigurationData[];
    }

    export interface MediaFile {
        name: string;
        fullPath: string;
        type: string;
        lastModifiedDate: Date;
        size: number;
        getFormatData(successCallback: (data: MediaFileData) => void,
            errorCallback?: () => void);
    }

    export interface MediaFileData {
        codecs: string;
        bitrate: number;
        height: number;
        width: number;
        duration: number;
    }

    export interface ErrorCode { }

    export module ErrorCode {
        var CaptureError = Utility.field<any>(window, "CaptureError", {});
        export var Internal: ErrorCode = CaptureError.CAPTURE_INTERNAL_ERR;
        export var ApplicationBusy: ErrorCode = CaptureError.CAPTURE_APPLICATION_BUSY;
        export var InvalidArgument: ErrorCode = CaptureError.CAPTURE_INVALID_ARGUMENT;
        export var NoMediaFiles: ErrorCode = CaptureError.CAPTURE_NO_MEDIA_FILES;
        export var NotSupported: ErrorCode = CaptureError.CAPTURE_NOT_SUPPORTED;
    }

    export interface Error {
        code: ErrorCode;
        message: string;
    }

    export interface AudioOptions {
        limit?: number;
        duration?: number;
    }

    export interface ImageOptions {
        limit?: number;
    }

    export interface VideoOptions {
        limit?: number;
        duration?: number;
    }

    export interface ConfigurationData {
        type: string;
        height: number;
        width: number;
    }

    var p =
        Utility.definePlugin<Plugin>({
            id: "org.apache.cordova.media-capture",
            name: "TypedPhoneGap.MediaCapture",
            def: function () {
                var device = Utility.field<any>(navigator, "device");
                return Utility.field<Plugin>(device, "capture");
            }
        });

    export function getPlugin(): Plugin {
        return p.getPlugin();
    }
}
