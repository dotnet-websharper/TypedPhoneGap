// Copyright 2013 IntelliFactory
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

// See http://intellifactory.github.io/TypedPhoneGap/

module TypedPhoneGap {

    interface Result { value: any; }

    function hasField(x: any, key: string) {
        return key in Object(x);
    }

    /// Finds an object at a given path, descending from the given global context.
    /// If found, returns `true` and sets `result.value` to the object.
    /// Otherwise, returns `false`.
    function lookup(glob: any, path: string[], result: Result): bool {
        var context = glob;
        for (var i = 0; i < path.length; i++) {
            var p = path[i];
            if (hasField(context, p)) {
                context = context[p];
            } else {
                return false;
            }
        }
        result.value = context;
        return true;
    }

    function isAvailableKey(key: string[], glob: any): bool {
        return lookup(glob, key, { value: undefined });
    }

    function obtainKey(key: string[], glob: any) {
        var r: Result = { value: undefined };
        if (lookup(glob, key, r)) {
            return r.value;
        } else {
            throw new Error("Global object not found: " + key.join(','));
        }
    }

    /// Accelerometer: http://docs.phonegap.com/en/2.5.0/cordova_accelerometer_accelerometer.md.html
    export module Accelerometer {

        export interface Acceleration {
            x: number;
            y: number;
            z: number;

            // DOMTimeStamp
            timestamp: number;
        }

        export interface Options { frequency?: number; }

        /// Abstract type for watch IDs used by Accelerometer.
        /// Values of these type are actually `number` at runtime.
        export interface WatchID {}

        export interface IAccelerometer {

            getCurrentAcceleration
            (
                accelerometerSuccess: (acceleration: Acceleration) => void ,
                accelerometerError: () => void
            ): void;

            watchAcceleration
            (
                accelerometerSuccess: (acceleration: Acceleration) => void ,
                accelerometerError: () => void ,
                accelerometerOptions?: Options
            ): WatchID;

            clearWatch(watchID: WatchID): void;
        }

        var key = ["navigator", "accelerometer"];

        export function isAvailable(glob: any): bool {
            return isAvailableKey(key, glob);
        }

        export function obtain(glob: any): IAccelerometer {
            return obtainKey(key, glob);
        }
    }

    /// Camera: http://docs.phonegap.com/en/2.5.0/cordova_camera_camera.md.html
    export module Camera {

        export interface DestinationType {}

        export interface DestinationTypes {
            DATA_URL: DestinationType;
            FILE_URL: DestinationType;
        }

        export interface EncodingType {}

        export interface EncodingTypes {
            JPEG: EncodingType;
            PNG: EncodingType;
        }

        export interface MediaType {}

        export interface MediaTypes {
            ALLMEDIA: MediaType;
            PICTURE: MediaType;
            VIDEO: MediaType;
        }

        export interface PictureSourceType {}

        export interface PictureSourceTypes {
            CAMERA: PictureSourceType;
            PHOTOLIBRARY: PictureSourceType;
            SAVEDPHOTOALBUM: PictureSourceType;
        }

        export interface PopoverArrowDirection {}

        export interface PopoverArrowDirections {
            ARROW_UP: PopoverArrowDirection;
            ARROW_DOWN: PopoverArrowDirection;
            ARROW_LEFT: PopoverArrowDirection;
            ARROW_RIGHT: PopoverArrowDirection;
            ARROW_ANY: PopoverArrowDirection;
        }

        export interface Options {
            quality?: number;
            destinationType?: DestinationType;
            sourceType?: PictureSourceType;
            allowEdit?: bool;
            encodingType?: EncodingType;
            targetWidth?: number;
            targetHeight?: number;
            mediaType?: MediaType;
            correctOrientation?: bool;
            saveToPhotoAlbum?: bool;
            popoverOptions?: PopoverOptions;
        }

        export interface PopoverOptions {
            x?: number;
            y?: number;
            width?: number;
            height?: number;
            arrowDir?: PopoverArrowDirection;
        }

        export interface ICamera {
            getPicture
            (
                cameraSuccess: (imageData: string) => void ,
                cameraError: (message: string) => void ,
                cameraOptions?: Options
            ): void;

            cleanup
            (
                cameraSuccess: (imageData: string) => void ,
                cameraError: (message: string) => void
            ): void;

            DestinationType: DestinationTypes;
            EncodingType: EncodingTypes;
            MediaType: MediaTypes;
            PictureSourceType: PictureSourceTypes;
            PopoverArrowDirection: PopoverArrowDirections;
        }

        var key = ["navigator", "camera"];

        export interface CameraCapability {
            camera: ICamera;
            createPopoverOptions
            (
                x: number, y: number, width: number, height: number,
                dir: PopoverArrowDirection
            ): PopoverOptions;
        }

        export function isAvailable(glob: any): bool {
            return isAvailableKey(key, glob);
        }

        export function obtain(glob: any): CameraCapability {
            return {
                camera: obtainKey(key, glob),
                createPopoverOptions: function (x, y, width, height, dir) {
                    return new glob.PopoverOptions(x, y, width, height, dir);
                }
            }
        }
    }

    /// Capture: http://docs.phonegap.com/en/2.5.0/cordova_media_capture_capture.md.html
    export module Capture {

        export interface ConfigurationData {
            type: string;
            height: number;
            width: number;
        }

        export interface MediaFileData {
            codecs: string;
            bitrate: number;
            height: number;
            width: number;
            duration: number;
        }

        export interface MediaFile {

            name: string;
            fullPath: string;
            type: string;
            lastModifiedDate: Date;
            size: number;

            getFormatData
            (
                successCallback: (data: MediaFileData) => void ,
                errorCallback?: () => void
            );

        }

        export interface CaptureAudioOptions {
            limit?: number;
            duration?: number;
            mode?: ConfigurationData;
        }

        export interface CaptureImageOptions {
            limit?: number;
            mode?: ConfigurationData;
        }

        export interface CaptureVideoOptions {
            limit?: number;
            duration?: number;
            mode?: ConfigurationData;
        }

        export interface CaptureError {}

        export interface CaptureErrors {
            CAPTURE_INTERNAL_ERR: CaptureError;
            CAPTURE_APPLICATION_BUSY: CaptureError;
            CAPTURE_INVALID_ARGUMENT: CaptureError;
            CAPTURE_NO_MEDIA_FILES: CaptureError;
            CAPTURE_NOT_SUPPORTED: CaptureError;
        }

        export interface CaptureException {
            code: CaptureError;
        }

        export interface ICapture {

            supportedAudioModes: ConfigurationData[];
            supportedImageModes: ConfigurationData[];
            supportedVideoModes: ConfigurationData[];

            captureAudio
            (
                onSuccess: (mediaFiles: MediaFile[]) => void ,
                onError: (error: CaptureException) => void ,
                options?: CaptureAudioOptions
            ): void;

            captureImage
            (
                onSuccess: (mediaFiles: MediaFile[]) => void ,
                onError: (error: CaptureException) => void ,
                options?: CaptureImageOptions
            ): void;

            captureVideo
            (
                onSuccess: (mediaFiles: MediaFile[]) => void ,
                onError: (error: CaptureException) => void ,
                options?: CaptureVideoOptions
            ): void;

        }

        export interface CaptureCapability {
            capture: ICapture;
            errors: CaptureErrors;
        }

        var key = ["navigator", "capture"];
        var errorKey = ["CaptureError"];

        export function isAvailable(glob: any): bool {
            return isAvailableKey(key, glob) && isAvailable(errorKey);
        }

        export function obtain(glob: any): CaptureCapability {
            return {
                capture: obtainKey(key, glob),
                errors: obtainKey(errorKey, glob)
            }
        }
    }

    /// Compass: http://docs.phonegap.com/en/2.5.0/cordova_compass_compass.md.html#Compass
    export module Compass {

        export interface Heading {
            magneticHeading: number;
            trueHeading: number;
            headingAccuracy: number;
            timestamp: number;
        }

        export interface WatchID {}

        export interface CompassError {}

        export interface CompassErrors {
            COMPASS_INTERNAL_ERR: CompassError;
            COMPASS_NOT_SUPPORTED: CompassError;
        }

        export interface CompassException {
            code: CompassError;
        }

        export interface Options {
            filter?: number;
            frequency?: number;
        }

        export interface ICompass {

            getCurrentHeading
            (
                onSuccess: (heading: Heading) => void ,
                onError: (error: CompassException) => void ,
                options?: Options
            ): void;

            watchHeading
            (
                onSuccess: (heading: Heading) => void ,
                onError: (error: CompassException) => void ,
                options?: Options
            ): WatchID;

            clearWatch(id: WatchID): void;
        }

        export interface CompassCapability {
            compass: ICompass;
            errors: CompassErrors;
        }

        var key = ["navigator", "compass"];
        var errorKey = ["CompassError"];

        export function isAvailable(glob: any): bool {
            return isAvailableKey(key, glob) && isAvailableKey(errorKey, glob);
        }

        export function obtain(glob: any): CompassCapability {
            return {
                compass: obtainKey(key, glob),
                errors: obtainKey(errorKey, glob)
            }
        }
    }

    /// Connection: http://docs.phonegap.com/en/2.5.0/cordova_connection_connection.md.html
    export module Connection {
        export interface ConnectionType {}

        export interface ConnectionTypes {
            UNKNOWN: ConnectionType;
            ETHERNET: ConnectionType;
            WIFI: ConnectionType;
            CELL_2G: ConnectionType;
            CELL_3G: ConnectionType;
            CELL_4G: ConnectionType;
            NONE: ConnectionType;
        }

        export interface IConnection {
            type: ConnectionType;
        }

        export interface ConnectionCapability {
            connection: IConnection;
            types: ConnectionTypes;
        }

        var key = ["navigator", "connection"];
        var tKey = ["Connection"];

        export function isAvailable(glob: any): bool {
            return isAvailableKey(key, glob) && isAvailableKey(tKey, glob);
        }

        export function obtain(glob: any): ConnectionCapability {
            return {
                connection: obtainKey(key, glob),
                types: obtainKey(tKey, glob)
            }
        }
    }

    /// Contacts: http://docs.phonegap.com/en/2.5.0/cordova_contacts_contacts.md.html
    export module Contacts {
        export interface ContactName {
            formatted: string;
            familyName: string;
            givenName: string;
            middleName: string;
            honorifixPrefix: string;
            honorifixSuffix: string;
        }

        export interface ContactAddress {
            pref: bool;
            type: string;
            formatted: string;
            streetAddress: string;
            locality: string;
            region: string;
            postalCode: string;
            country: string;
        }

        export interface ContactOrganization {
            pref: bool;
            type: string;
            name: string;
            department: string;
            title: string;
        }

        export interface ContactField {
            pref: bool;
            type: string;
            value: string;
        }

        export interface ContactProperties {
            id?: string;
            displayName?: string;
            name?: ContactName;
            nickname?: string;
            phoneNumbers?: ContactField[];
            emails?: ContactField[];
            addresses?: ContactAddress[];
            ims?: ContactField[];
            organizations?: ContactOrganization[];
            birthday?: Date;
            note?: string;
            photos: ContactField[];
            categories: ContactField[];
            urls: ContactField[];
        }

        export interface ContactError {}

        export interface ContactErrors {
            UNKNOWN_ERROR: ContactError;
            INVALID_ARGUMENT_ERROR: ContactError;
            TIMEOUT_ERROR: ContactError;
            PENDING_OPERATION_ERROR: ContactError;
            IO_ERROR: ContactError;
            NOT_SUPPORTED_ERROR: ContactError;
            PERMISSION_DENIED_ERROR: ContactError;
        }

        export interface ContactException {
            code: ContactError;
        }

        export interface Contact extends ContactProperties {

            clone(): Contact;

            remove
            (
                onSuccess: (contact: Contact) => void ,
                onError: (error: ContactException) => void
            ): void;

            save
            (
                onSuccess: (contact: Contact) => void ,
                onError: (error: ContactException) => void
            ): void;

        }

        export interface ContactFindOptions {
            filter?: string;
            multiple?: bool;
        }

        export interface IContacts {

            create(properties?: ContactProperties): Contact;

            find
            (
                fields: string[],
                onSuccess: (contacts: Contact[]) => void ,
                onError: (error: ContactException) => void ,
                options?: ContactFindOptions
            ): void;

        }

        export interface ContactsCapability {
            contacts: IContacts;
            errors: ContactErrors;

            createContactName(): ContactName;
            createContactAddress(): ContactAddress;
            createContactOrganization(): ContactOrganization;
            createContactField(type: string, value: string, pref: bool): ContactField;
        }

        var key = ["navigator", "contacts"];
        var eKey = ["ConnectError"];

        export function isAvailable(glob: any): bool {
            return isAvailableKey(key, glob) && isAvailableKey(eKey, glob);
        }

        export function obtain(glob: any): ContactsCapability {
            return {
                contacts: obtainKey(key, glob),
                errors: obtainKey(eKey, glob),
                createContactName: function () {
                    return new glob.ContactName();
                },
                createContactAddress: function () {
                    return new glob.ContactAddress();
                },
                createContactOrganization: function () {
                    return new glob.ContactOrganization();
                },
                createContactField: function (type: string, value: string, pref: bool) {
                    return new glob.ContactField(type, value, pref);
                }
            }
        }
    }

    /// Device: http://docs.phonegap.com/en/2.5.0/cordova_device_device.md.html
    export module Device {
        export interface IDevice {
            cordova: string;
            platform: string;
            uuid: string;
            version: string;
        }

        var key = ["device"];

        export function isAvailable(glob: any): bool {
            return isAvailableKey(key, glob);
        }

        export function obtain(glob: any): IDevice {
            return obtainKey(key, glob);
        }
    }

    /// Events: http://docs.phonegap.com/en/2.5.0/cordova_events_events.md.html
    export module Events {
        export interface SimpleEvent {
            add(f: () => void ): void;
            name: string;
            remove(f: () => void ): void;
        }

        export interface BatteryEvent {
            add(f: (args: BatteryEventArgs) => void ): void;
            name: string;
            remove(f: (args: BatteryEventArgs) => void ): void;
        }

        /// Info object passed to battery event handlers
        export interface BatteryEventArgs {
            level: number;
            isPlugged: bool;
        }

        export interface IEvents {
            deviceReady: SimpleEvent;
            pause: SimpleEvent;
            resume: SimpleEvent;
            online: SimpleEvent;
            offline: SimpleEvent;
            backButton: SimpleEvent;
            menuButton: SimpleEvent;
            searchButton: SimpleEvent;
            startCallButton: SimpleEvent;
            endCallButton: SimpleEvent;
            volumeDownButton: SimpleEvent;
            volumeUpButton: SimpleEvent;
            batteryCritical: BatteryEvent;
            batteryLow: BatteryEvent;
            batteryStatus: BatteryEvent;
        }

        export function obtain(glob: Window): IEvents {
            // Creates a SimpleEvent.
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
            // Creates a BatteryEvent;
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
            return {
                deviceReady: se("deviceready"),
                pause: se("pause"),
                resume: se("resume"),
                online: se("online"),
                offline: se("offline"),
                backButton: se("backbutton"),
                menuButton: se("menubutton"),
                searchButton: se("searchbutton"),
                startCallButton: se("startcallbutton"),
                endCallButton: se("endcallbutton"),
                volumeDownButton: se("volumnedownbutton"),
                volumeUpButton: se("volumeupbutton"),
                batteryCritical: be("batterycritical"),
                batteryLow: be("batterylow"),
                batteryStatus: be("batterystatus")
            }
        }
    }

    /// Globalization: http://docs.phonegap.com/en/2.5.0/cordova_globalization_globalization.md.html
    export module Globalization {

        export interface DateSelector {}

        export module DateSelectors {
            export var Date: DateSelector = "date";
            export var DateAndTime: DateSelector = "date and time";
            export var Time: DateSelector = "time";
        }

        export interface DateNameVariant {}

        export module DateNameVariants {
            export var Days: DateNameVariant = "days";
            export var Months: DateNameVariant = "months";
        }

        export interface DateWidth {}

        export module DateWidths {
            export var Narrow: DateWidth = "narrow";
            export var Wide: DateWidth = "wide";
        }

        export interface FormatLength {}

        export module FormatLengths {
            export var Long: FormatLength = "long";
            export var Medium: FormatLength = "medium";
            export var Short: FormatLength = "short";
        }

        export interface NumberFormatType {}

        export module NumberFormatTypes {
            export var Currency: NumberFormatType = "currency";
            export var Decimal: NumberFormatType = "decimal";
            export var Percent: NumberFormatType = "percent";
        }

        export interface GlobalizationError {}

        export interface GlobalizationErrors {
            UNKNOWN_ERROR: GlobalizationError;
            FORMATTING_ERROR: GlobalizationError;
            PARSING_ERROR: GlobalizationError;
            PATTERN_ERROR: GlobalizationError;
        }

        export interface DateOptions {
            formatLength?: FormatLength;
            selector?: DateSelector;
        }

        export interface DateObject {
            year: number;
            month: number;
            day: number;
            hour: number;
            minute: number;
            second: number;
            millisecond: number;
        }

        export interface DatePattern {
            pattern: string;
            timezone: string;
            utc_offset: number;
            dst_offset: number;
        }

        export interface GlobalizationException {
            code: GlobalizationError;
            message: string;
        }

        export interface DateNameOptions {
            type: DateWidth;
            item: DateNameVariant;
        }

        export interface NumberFormat {
            type: NumberFormatType;
        }

        export interface NumberPattern {
            pattern: string;
            symbol: string;
            fraction: number;
            rounding: number;
            positive: string;
            negative: string;
            decimal: string;
            grouping: string;
        }

        export interface CurrencyPattern {
            pattern: string;
            code: string;
            fraction: number;
            rounding: number;
            decimal: string;
            grouping: string;
        }

        export interface IGlobalization {

            getPreferredLanguage
            (
                onSuccess: (language: { value: string; }) => void ,
                onError: (error: GlobalizationException) => void
            ): void;

            getLocaleName
            (
                onSuccess: (locale: { value: string; }) => void ,
                onError: (error: GlobalizationException) => void
            ): void;

            dateToString
            (
                date: Date,
                onSuccess: (date: { value: string; }) => void ,
                onError: (error: GlobalizationException) => void ,
                options?: DateOptions
            ): void;

            stringToDate
            (
                dateString: string,
                onSuccess: (date: DateObject) => void ,
                onError: (error: GlobalizationException) => void ,
                options?: DateOptions
            ): void;

            getDatePattern
            (
                onSuccess: (datePattern: DatePattern) => void ,
                onError: (error: GlobalizationException) => void ,
                options?: DateOptions
            ): void;

            getDateNames
            (
                onSuccess: (names: { value: string[]; }) => void ,
                onError: (error: GlobalizationException) => void ,
                options?: DateNameOptions
            ): void;

            isDaylightSavingsTime
            (
                date: Date,
                onSuccess: (result: { dst: bool; }) => void ,
                onError: (error: GlobalizationException) => void
            ): void;

            getFirstDayOfWeek
            (
                onSuccess: (day: { value: number; }) => void ,
                onError: (error: GlobalizationException) => void
            ): void;

            nubmerToString
            (
                value: number,
                onSuccess: (result: { value: string; }) => void ,
                onError: (error: GlobalizationException) => void ,
                format?: NumberFormat
            ): void;

            stringToNumber
            (
                value: string,
                onSuccess: (result: { value: number; }) => void ,
                onError: (error: GlobalizationException) => void ,
                format?: NumberFormat
            ): void;

            getNumberPattern
            (
                onSuccess: (result: NumberPattern) => void ,
                onError: (error: GlobalizationException) => void ,
                format?: NumberFormat
            ): void;

            getCurrencyPattern
            (
                currencyCode: string,
                onSuccess: (result: CurrencyPattern) => void ,
                onError: (error: GlobalizationException) => void
            ): void;

        }

        export interface GlobalizationCapability {
            globalization: IGlobalization;
            errors: GlobalizationErrors;
        }

        var key = ["navigator", "globalization"];
        var eKey = ["GlobalizationError"];

        export function isAvailable(glob: any): bool {
            return isAvailableKey(key, glob) && isAvailableKey(eKey, glob);
        }

        export function obtain(glob: any): GlobalizationCapability {
            return {
                globalization: obtainKey(key, glob),
                errors: obtainKey(eKey, glob)
            }
        }
    }

    /// InAppBrowser: http://docs.phonegap.com/en/2.5.0/cordova_inappbrowser_inappbrowser.md.html
    export module InAppBrowser {
        export interface EventType {}

        export module EventTypes {
            export var Exit: EventType = "exit";
            export var LoadStart: EventType = "loadstart";
            export var LoadStop: EventType = "loadstop";
        }

        export interface PresentationStyle {}

        export module PresentationStyles {
            export var FormSheet: PresentationStyle;
            export var FullSheet: PresentationStyle;
            export var PageSheet: PresentationStyle;
        }

        export interface Target {}

        export module Targets {
            export var Blank: Target = "_blank";
            export var Self: Target = "_self";
            export var System: Target = "_system";
        }

        export interface TransitionStyle {}

        export module TransitionStyles {
            export var CoverVertical: TransitionStyle = "coververtical";
            export var CrossDissolve: TransitionStyle = "crossdissolve";
            export var FlipHorizontal: TransitionStyle = "fliphorizontal";
        }

        export interface Options {
            location?: bool;
            enableViewportScale?: bool;
            mediaPlaybackRequiresUserAction?: bool;
            allowInlineMediaPlayback?: bool;
            keyboardDisplayRequiresUserAction?: bool;
            suppressesIncrementalRendering?: bool;
            presentationStyle?: PresentationStyle;
            transitionStyle?: TransitionStyle;
        }

        export interface EventArgs {
            type: EventType;
            url: string;
        }

        export interface IWindow {
            close(): void;
            addEventListener(event: EventType, handler: (args: EventArgs) => void );
            removeEventListener(event: EventType, handler: (args: EventArgs) => void );
        }

        export interface InAppBrowserCapability {
            open(url: string, target?: Target, options?: Options): IWindow;
        }

        export function obtain(glob: Window): InAppBrowserCapability {
            var w: any = glob;
            return {
                open: function (url: string, target?: Target, options?: Options): IWindow {
                    return w.open(url, target, optionsToString(options));
                }
            }
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

        export interface MediaError {}

        export interface MediaErrors {
            MEDIA_ERR_ABORTED: MediaError;
            MEDIA_ERR_NETWORK: MediaError;
            MEDIA_ERR_DECODE: MediaError;
            MEDIA_NONE_SUPPORTED: MediaError;
        }

        export interface MediaStatus {}

        export interface MediaStatuses {
            MEDIA_NONE: MediaStatus;
            MEDIA_STARTING: MediaStatus;
            MEDIA_RUNNING: MediaStatus;
            MEDIA_PAUSED: MediaStatus;
            MEDIA_STOPPED: MediaStatus;
        }

        export interface MediaException {
            code: MediaError;
            message: string;
        }

        export interface IMedia {

            getCurrentPosition
            (
                onSuccess: (position: number) => void ,
                onError?: (error: MediaException) => void
            ): void;

            getDuration(): number;
            play(): void;
            pause(): void;
            release(): void;
            seekTo(position: number): void;
            startRecord(): void;
            stopRecord(): void;
            stop(): void;
        }

        export interface MediaCapability {

            createMedia(
                src: string,
                mediaSuccess?: () => void ,
                mediaError?: (error: MediaException) => void ,
                mediaStatus?: (status: MediaStatus) => void
             ): IMedia;

            errors: MediaErrors;
            statuses: MediaStatuses;
        }

        var key = ["Media"];
        var eKey = ["MediaError"]

        export function isAvailable(glob: any): bool {
            return isAvailableKey(key, glob) && isAvailableKey(eKey, glob);
        }

        export function obtain(glob: any): MediaCapability {
            var m = obtainKey(key, glob);
            function createMedia(src: string,
                                 mediaSuccess?: () => void ,
                                 mediaError?: (error: MediaException) => void ,
                                 mediaStatus?: (status: MediaStatus) => void ): IMedia {
                return new m(src, mediaSuccess, mediaError, mediaStatus);
            }
            return {
                createMedia: createMedia,
                errors: obtainKey(eKey, glob),
                statuses: m
            }
        }
    }

    /// Notification: http://docs.phonegap.com/en/2.5.0/cordova_notification_notification.md.html
    export module Notification {
        export interface INotification {
            alert
            (
                message: string,
                alertCallack: () => void ,
                title?: string,
                buttonName?: string
            ): void;

            beep(times: number): void;

            confirm
            (
                message: string,
                confirmCallback: (choice: number) => void ,
                title?: string,
                buttonNames?: string
            ): void;

            vibrate(milliseconds: number): void;
        }

        var key = ["navigator", "notification"];

        export function isAvailable(glob: any): bool {
            return isAvailableKey(key, glob);
        }

        export function obtain(glob: any): INotification {
            return obtainKey(key, glob);
        }
    }

    /// Splashscreen: http://docs.phonegap.com/en/2.5.0/cordova_splashscreen_splashscreen.md.html
    export module Splashscreen {
        export interface ISplashscreen {
            hide(): void;
            show(): void;
        }

        var key = ["navigator", "splahscreen"];

        export function isAvailable(glob: any): bool {
            return isAvailableKey(key, glob);
        }

        export function obtain(glob: any): ISplashscreen {
            return obtainKey(key, glob);
        }
    }

    /// Storage: http://docs.phonegap.com/en/2.5.0/cordova_storage_storage.md.html
    export module Storage {

        export interface SQLError {}

        export interface SQLErrors {
            UNKNOWN_ERR: SQLError;
            DATABASE_ERR: SQLError;
            VERSION_ERR: SQLError;
            TOO_LARGE_ERR: SQLError;
            QUOTA_ERR: SQLError;
            SYNTAX_ERR: SQLError;
            CONSTRAINT_ERR: SQLError;
            TIMEOUT_ERR: SQLError;
        }

        export interface SQLException {
            code: SQLError;
            message: string;
        }

        export interface SQLDatabase {

            changeVersion(oldVersion: number, newVersion: number): void;

            transaction
            (
                populateDB: (tx: SQLTransaction) => void ,
                onError: (tx: SQLTransaction, error: SQLException) => void ,
                onSuccess: () => void
            ): void;

        }

        export interface SQLResultSet {
            insertId: number;
            rowsAffected: number;
            rows: SQLResultSetRowList;
        }

        export interface SQLResultSetRowList {
            length: number;
            [index: number]: any;
        }

        export interface SQLTransaction {

            executeSql(sql: string): void;

            executeSql
            (
                sql: string,
                onSuccess: (result: SQLResultSet) => void ,
                onError: (error: SQLException) => void
            ): void;

            executeSql
            (
                sql: string,
                parameters: any[],
                onSuccess: (result: SQLResultSet) => void ,
                onError: (error: SQLException) => void
            ): void;

        }

        export interface IStorage {
            errors: SQLErrors;

            openDatabase
            (
                database_name: string,
                database_version: string,
                database_displayname: string,
                database_size: number
            ): SQLDatabase;
        }

        var eKey = ["SQLError"];

        export function isAvailable(glob: any): bool {
            return isAvailableKey(eKey, glob);
        }

        export function obtain(glob: any): IStorage {
            function openDB
            (
                database_name: string,
                database_version: string,
                database_displayname: string,
                database_size: number
            ): SQLDatabase {
                return glob.openDatabase(database_name, database_version, database_displayname, database_size);
            }
            return {
                openDatabase: openDB,
                errors: obtainKey(eKey, glob)
            }
        }
    }
}
