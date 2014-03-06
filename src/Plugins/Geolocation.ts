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

/// org.apache.cordova.geolocation plugin:
/// https://github.com/apache/cordova-plugin-geolocation/

module TypedPhoneGap.Geolocation {

    export interface Plugin {
        getCurrentPosition(success: (p: Position) => void,
            error?: (err: PositionError) => void,
            options?: Options): void;
        watchPosition(success: (p: Position) => void,
            error?: (err: PositionError) => void,
            options?: Options): WatchHandle;
        clearWatch(handle: WatchHandle): void;
    }

    export interface Options {
        enableHighAccuracy: boolean;
        timeout: number;
        maximumAge: number;
    }

    export interface Position {
        coords: Coordinates;
        date: Date;
    }

    export interface Coordinates {
        latitude: number;
        longitude: number;
        altitude: number;
        accuracy: number;
        altitudeAccuracy: number;
        heading: number;
        speed: number;
    }

    export interface WatchHandle { }

    export interface PositionError {
        code: ErrorCode;
        message: string;
    }

    export interface ErrorCode { }

    export module ErrorCode {
        var errorCodes = Utility.field<any>(window, "PositionError", {})
        export var PositionUnavailable: ErrorCode = errorCodes.POSITION_UNAVAILABLE;
        export var PermissionDenied: ErrorCode = errorCodes.PERMISSION_DENIED;
        export var Timeout = errorCodes.TIMEOUT;
    }

    var p = Utility.definePlugin<Plugin>({
        id: "org.apache.cordova.geolocation",
        name: "TypedPhoneGap.Geolocation",
        def: function () {
            return Utility.field<Plugin>(navigator, "geolocation");
        }
    });

    export function getPlugin() {
        return p.getPlugin();
    }
}
