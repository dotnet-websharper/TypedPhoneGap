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

/// org.apache.cordova.device-orientation plugin:
/// https://github.com/apache/cordova-plugin-device-orientation

module TypedPhoneGap.DeviceOrientation {

    export interface Plugin {
        getCurrentHeading(onSuccess: (heading: Heading) => void,
            onError: (error: Error) => void,
            options?: Options): void;
        watchHeading(onSuccess: (heading: Heading) => void,
            onError: (error: Error) => void,
            options?: Options): WatchHandle;
        clearWatch(id: WatchHandle): void;
    }

    export interface Heading {
        magneticHeading: number;
        trueHeading: number;
        headingAccuracy: number;
        timestamp: number;
    }

    export interface WatchHandle { }

    export interface Options {
        filter?: number;
        frequency?: number;
    }

    interface ErrorCodes {
        COMPASS_INTERNAL_ERR: number;
        COMPASS_NOT_SUPPORTED: number;
    }

    interface Capability {
        errorCodes: ErrorCodes;
        plugin: Plugin;
    }

    export interface ErrorCode { }

    export module ErrorCode {
        var errorCodes = Utility.field<any>(window, "CompassError", {});
        export var InternalError: ErrorCode = errorCodes.COMPASS_INTERNAL_ERR;
        export var NotSupported: ErrorCode = errorCodes.COMPASS_NOT_SUPPORTED;
    }

    export interface Error {
        code: ErrorCode;
        message: string;
    }

    var p = Utility.definePlugin<Plugin>({
        id: "org.apache.cordova.device-orientation",
        name: "TypedPhoneGap.DeviceOrientation",
        def: function () {
            return Utility.field<Plugin>(navigator, "compass");
        }
    });

    export function getPlugin() {
        return p.getPlugin();
    }
}
