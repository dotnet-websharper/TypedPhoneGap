/// <reference path="PhoneGap.d.ts" />

module PhoneGap {

    /// Finds an object at a given path, descending from the global context.
    /// If found, returns `true` and sets `result.value` to the object.
    /// Otherwise, returns `false`.
    function lookup(path: string[], result: Object): bool {
        var context: Object = this;
        for (var i = 0; i < path.length; i++) {
            var p = path[i];
            if (context.hasOwnProperty(p)) {
                context = context[p];
            } else {
                return false;
            }
        }
        var r: any = result;
        r.value = context;
        return true;
    }

    /// An interface to `lookup` to check for existence.
    function exists(path: string[]): bool {
        return lookup(path, {});
    }

    /// An interface to `lookup` to extract the result.
    function extract(path: string[]): any {
        var r: any = {};
        if (lookup(path, r)) {
            return r.value;
        } else {
            throw new Error("Global object not found: " + path.join(','));
        }
    }

    /// The global scope.
    var glob: any = extract([]);

    /// Configures module generation.
    interface ModuleConfig {

        /// The address to obtain the module from.
        root: string[];

        /// The addresses of globals to copy into the module.
        copy?: string[][];

    }

    /// Utility function to define simple modules.
    function m(addr: string[]): any {
        return {
            isAvailable: function () { return exists(addr); },
            obtain: function () { return extract(addr); }
        }
    }

    /// Accelerometer: http://docs.phonegap.com/en/2.5.0/cordova_accelerometer_accelerometer.md.html
    export var Accelerometer = m(["navigator", "accelerometer"]);

    /// Camera: http://docs.phonegap.com/en/2.5.0/cordova_camera_camera.md.html
    export module Camera {
        export var DestinationType = glob.Camera.DestinationType;
        export var EncodingType = glob.Camera.EncodingType;
        export var MediaType = glob.Camera.MediaType;
        export var PictureSourceType = glob.Camera.PictureSourceType;
        export var PopoverArrowDirection = glob.Camera.PopoverArrowDirection;
        export var PopoverOptions = glob.CameraPopoverOptions;
        var key = ["navigator", "camera"];
        export function isAvailable() { return exists(key); }
        export function obtain() { return extract(key); }
    }

    /// Capture: http://docs.phonegap.com/en/2.5.0/cordova_media_capture_capture.md.html
    export module Capture {
        export var CaptureError = glob.CaptureError;
        var key = ["navigator", "capture"];
        export function isAvailable() { return exists(key); }
        export function obtain() { return extract(key); }
    }

    /// Compass: http://docs.phonegap.com/en/2.5.0/cordova_compass_compass.md.html#Compass
    export module Compass {
        export var CompassError = glob.CompassError;
        var key = ["navigator", "compass"];
        export function isAvailable() { return exists(key); }
        export function obtain() { return extract(key); }
    }

    /// Connection: http://docs.phonegap.com/en/2.5.0/cordova_connection_connection.md.html
    export module Connection {
        export var ConnectionType = glob.Connection;
        var key = ["navigator", "connection"];
        export function isAvailable() { return exists(key); }
        export function obtain() { return extract(key); }
    }

    /// Contacts: http://docs.phonegap.com/en/2.5.0/cordova_contacts_contacts.md.html
    export module Contacts {
        export var ContactAddress = glob.ContactAddress;
        export var ContactError = glob.ContactError;
        export var ContactField = glob.ContactField;
        export var ContactName = glob.ContactName;
        export var ContactOrganization = glob.ContactOrganization;
        var key = ["navigator", "contacts"];
        export function isAvailable() { return exists(key); }
        export function obtain() { return extract(key); }
    }

    /// Device: http://docs.phonegap.com/en/2.5.0/cordova_device_device.md.html
    export var Device = m(["device"]);

    /// Events: http://docs.phonegap.com/en/2.5.0/cordova_events_events.md.html
    export module Events {
        /// Creates a SimpleEvent.
        function se(name: string): SimpleEvent {
            return {
                add: function (f) {
                    window.addEventListener(name, f, false);
                },
                name: name,
                remove: function (f) {
                    window.removeEventListener(name, f, false);
                }
            }
        }

        export var deviceReady = se("deviceready");
        export var pause = se("pause");
        export var resume = se("resume");
        export var online = se("online");
        export var offline = se("offline");
        export var backButton = se("backbutton");
        export var menuButton = se("menubutton");
        export var searchButton = se("searchbutton");
        export var startCallButton = se("startcallbutton");
        export var endCallButton = se("endcallbutton");
        export var volumeDownButton = se("volumnedownbutton");
        export var volumeUpButton = se("volumeupbutton");

        /// Creates a BatteryEvent;
        function be(name: string): BatteryEvent {
            return {
                add: function (f: (args: BatteryEventArgs) => void ) {
                    var g: any = f;
                    window.addEventListener(name, g, false);
                },
                name: name,
                remove: function (f: (args: BatteryEventArgs) => void ) {
                    var g: any = f;
                    window.removeEventListener(name, g, false);
                }
            }
        }

        export var batteryCritical = be("batterycritical");
        export var batteryLow = be("batterylow");
        export var batteryStatus = be("batterystatus");
    }

    /// Globalization: http://docs.phonegap.com/en/2.5.0/cordova_globalization_globalization.md.html
    export module Globalization {
        export var DateSelector = { Date: "date", DateAndTime: "date and time", Time: "time" };
        export var DateNameVariant = { Days: "days", Months: "months" };
        export var DateWidth = { Narrow: "narrow", Wide: "wide" };
        export var FormatLength = { Long: "long", Medium: "medium", Short: "short" };
        export var NumberFormatType = { Currency: "currency", Decimal: "decimal", Percent: "percent" };

        export var GlobalizationError = glob.GlobalizationError;

        var key = ["navigator", "globalization"];
        export function isAvailable() { return exists(key); }
        export function obtain() { return extract(key); }
    }

    /// InAppBrowser: http://docs.phonegap.com/en/2.5.0/cordova_inappbrowser_inappbrowser.md.html
    export module InAppBrowser {
        export var Target = {
            Blank: "_blank",
            Self: "_self",
            System: "_system"
        };

        export var PresentationStyle = {
            FormSheet: "formsheet",
            FullScreen: "fullscreen",
            PageSheet: "pagesheet"
        };

        export var TransitionStyle = {
            CoverVertical: "coververtical",
            CrossDissolve: "crossdissolve",
            FlipHorizontal: "fliphorizontal"
        };

        export var EventType = {
            Exit: "exit",
            LoadStart: "loadstart",
            LoadStop: "loadstop"
        };

        export function open(url: string, target?: Target, options?: Options): Window {
            var t: string = target ? String(target) : "_self";
            var o: string = options ? optionsToString(options) : "location=yes";
            var w: any = window.open(url, t, o);
            return w;
        }

        function optionsToString(options: Options) {
            var r = [];
            function bp(name: string): void {
                if (options.hasOwnProperty(name)) {
                    r.push(name + "=" + (options[name] ? "yes" : "no"));
                }
            }
            function sp(name: string): void {
                if (options.hasOwnProperty(name)) {
                    r.push(name + "=" + String(options[name]));
                }
            }
            if (options) {
                bp("location");
                bp("enableViewportScale");
                bp("mediaPlaybackRequiresUserAction");
                bp("allowInlineMediaPlayback");
                bp("keyboardDisplayRequiresUserAction");
                bp("suppressesIncrementalRendering");
                sp("presentationStyle");
                sp("transitionStyle");
                return r.join(",");
            } else {
                return "location=yes";
            }
        }
    }

    /// Media: http://docs.phonegap.com/en/2.5.0/cordova_media_media.md.html
    export module Media {
        export var MediaError = glob.MediaError;
        export var MediaStatus = glob.Media;

        function create
        (
            src: string,
            mediaSuccess?: () => void ,
            mediaError?: (error: MediaException) => void ,
            mediaStatus?: (status: MediaStatus) => void
        ) { return new glob.Media(src, mediaSuccess, mediaError, mediaStatus); }
    }

    /// Notification: http://docs.phonegap.com/en/2.5.0/cordova_notification_notification.md.html
    export var Notification = m(["navigator", "notification"]);

    /// Splashscreen: http://docs.phonegap.com/en/2.5.0/cordova_splashscreen_splashscreen.md.html
    export var Splashscreen = m(["navigator", "splahscreen"]);

    /// Storage: http://docs.phonegap.com/en/2.5.0/cordova_storage_storage.md.html
    export module Storage {
        export var SQLError = glob.SQLError;

        function openDatabase
        (
            database_name: string,
            database_version: string,
            database_displayname: string,
            database_size: number
        ) {
            var w: any = window;
            return w.openDatabase(database_name, database_version, database_displayname, database_size);
        }
    }
}
