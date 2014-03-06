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

/// org.apache.cordova.media plugin:
/// https://github.com/apache/cordova-plugin-media

module TypedPhoneGap.Media {

    export interface Plugin {
        createItem(src: string,
            mediaSuccess?: () => void,
            mediaError?: (error: Error) => void,
            mediaStatus?: (status: Status) => void): Item;
    }

    interface Statics {
        new (src: string,
            mediaSuccess?: () => void,
            mediaError?: (error: Error) => void,
            mediaStatus?: (status: Status) => void): Item;
    }

    export interface Item {
        getCurrentPosition(onSuccess: (position: number) => void,
            onError?: (error: Error) => void): void;
        getDuration(): number;
        play(): void;
        pause(): void;
        release(): void;
        seekTo(position: number): void;
        setVolume(volume: number): void;
        startRecord(): void;
        stopRecord(): void;
        stop(): void;
        position: number;
        duration: number;
    }

    export interface ErrorCode { }

    export module ErrorCode {
        var c = Utility.field<any>(window, "MediaError", {});
        export var Aborted: ErrorCode = c.MEDIA_ERR_ABORTED;
        export var DecodeError: ErrorCode = c.MEDIA_ERR_DECODE;
        export var NetworkError: ErrorCode = c.MEDIA_ERR_NETWORK;
        export var NoneSupported: ErrorCode = c.MEDIA_ERR_NONE_SUPPORTED;
    }

    export interface Error {
        code: ErrorCode;
        message: string;
    }

    export enum Status {
        None = 0,
        Starting = 1,
        Running = 2,
        Paused = 3,
        Stopped = 4
    }

    var p = Utility.definePlugin<Plugin>({
        id: "org.apache.cordova.media",
        name: "TypedPhoneGap.Media",
        def: function () {
            var m = Utility.field<Statics>(window, "Media");
            function createItem(src: string,
                mediaSuccess?: () => void,
                mediaError?: (error: Error) => void,
                mediaStatus?: (status: Status) => void): Item {
                return new m(src, mediaSuccess, mediaError, mediaStatus);
            }
            return { createItem: createItem };
        }
    });

    export function getPlugin() {
        return p.getPlugin();
    }
}

