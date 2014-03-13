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

/// Cordova lifecycle events:
/// http://cordova.apache.org/docs/en/3.4.0/cordova_events_events.md.html

module TypedPhoneGap.Events {

    /// Represents an event as a first-class value.
    export interface LifeCycleEvent extends Utility.VoidEvent { }

    function defineEvent(name: string): LifeCycleEvent {
        return Utility.defineVoidEvent(document, name);
    }

    export var deviceReady = defineEvent("deviceready");
    export var pause = defineEvent("pause");
    export var resume = defineEvent("resume");
    export var backButton = defineEvent("backbutton");
    export var menuButton = defineEvent("menubutton");
    export var searchButton = defineEvent("searchbutton");
    export var startCallButton = defineEvent("startcallbutton");
    export var endCallButton = defineEvent("endcallbutton");
    export var volumeDownButton = defineEvent("volumedownbutton");
    export var volumeUpButton = defineEvent("volumeupbutton");
}
