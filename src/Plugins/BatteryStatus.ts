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

/// org.apache.cordova.battery-status plugin:
/// https://github.com/apache/cordova-plugin-battery-status/

module TypedPhoneGap.BatteryStatus {

    export interface Plugin {
        batteryCritical: BatteryEvent;
        batteryLow: BatteryEvent;
        batteryStatus: BatteryEvent;
    }

    /// First-class event object.
    export interface BatteryEvent extends Utility.WindowEvent<BatteryEventArgs> { }

    /// Info object passed to battery event handlers
    export interface BatteryEventArgs {
        level: number;
        isPlugged: boolean;
    }

    var p = Utility.definePlugin<Plugin>({
        id: "org.apache.cordova.battery-status",
        name: "TypedPhoneGap.BatteryStatus",
        def: function () {
            return {
                batteryCritical: Utility.defineWindowEvent("batterycritical"),
                batteryLow: Utility.defineWindowEvent("batterylow"),
                batteryStatus: Utility.defineWindowEvent("batterystatus")
            };
        }
    });

    export function getPlugin() {
        return p.getPlugin();
    }
}
