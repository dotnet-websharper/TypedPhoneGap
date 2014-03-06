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

/// org.apache.cordova.device-motion plugin:
/// https://github.com/apache/cordova-plugin-device-motion/

module TypedPhoneGap.DeviceMotion {

    export interface Plugin {
        clearWatch(watchID: WatchHandle): void;
        getCurrentAcceleration(accelerometerSuccess: (acceleration: Acceleration) => void,
            accelerometerError: () => void): void;
        watchAcceleration(accelerometerSuccess: (acceleration: Acceleration) => void,
            accelerometerError: () => void,
            accelerometerOptions?: Options): WatchHandle;
    }

    export interface Acceleration {
        x: number;
        y: number;
        z: number;
        timestamp: number;
    }

    export interface Options {
        frequency?: number;
    }

    /// Abstract type for watch IDs used by Accelerometer.
    /// Values of these type are actually `number` at runtime.
    export interface WatchHandle { }

    var p = Utility.definePlugin<Plugin>({
        id: "org.apache.cordova.device-motion",
        name: "TypedPhoneGap.DeviceMotion",
        def: function () {
            return Utility.field<Plugin>(navigator, "accelerometer");
        }
    });

    export function getPlugin() {
        return p.getPlugin();
    }
}
