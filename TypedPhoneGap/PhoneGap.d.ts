// TypeScript definitions for PhoneGap (Cordova) 2.5.0 <http://phonegap.com>
// Source (Bitbucket): http://bitbucket.org/IntelliFactory/typedphonegap
// Source (GitHub): http://github.com/intellifactory/typedphonegap
//
// See also: the currently more complete PhoneGap 2.3.0 TypeScript definitions
// by DefinitelyTyped < http://github.com/borisyankov/DefinitelyTyped>

/// Accelerometer: http://docs.phonegap.com/en/2.5.0/cordova_accelerometer_accelerometer.md.html
module PhoneGap.Accelerometer {

    interface IAccelerometer {

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

    interface Acceleration {
        x: number;
        y: number;
        z: number;

        // DOMTimeStamp
        timestamp: number;
    }

    interface Options { frequency?: number; }

    /// Abstract type for watch IDs used by Accelerometer.
    /// Values of these type are actually `number` at runtime.
    interface WatchID {}

    /// Test for the presence of `navigator.accelerometer`.
    /// Helper function implemented in `PhoneGap.Facade.ts`.
    function isAvailable(): bool;

    /// Returns `navigator.accelerometer`, if defined.
    /// Helper function implemented in `PhoneGap.Facade.ts`.
    function obtain(): IAccelerometer;

}

/// Camera: http://docs.phonegap.com/en/2.5.0/cordova_camera_camera.md.html
module PhoneGap.Camera {

    enum DestinationType { DATA_URL, FILE_URI }
    enum EncodingType { JPEG, PNG }
    enum MediaType { ALLMEDIA, PICTURE, VIDEO }
    enum PictureSourceType { CAMERA, PHOTOLIBRARY, SAVEDPHOTOALBUM }
    enum PopoverArrowDirection { ARROW_UP, ARROW_DOWN, ARROW_LEFT, ARROW_RIGHT, ARROW_ANY }

    interface Options {
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
        popoverOptions?: IPopoverOptions;
    }

    interface IPopoverOptions {
        x?: number;
        y?: number;
        width?: number;
        height?: number;
        arrowDir?: PopoverArrowDirection;
    }

    var PopoverOptions: {
        new (x: number, y: number, width: number, height: number, dir: PopoverArrowDirection): IPopoverOptions;
    };

    interface ICamera {

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

    }

    function isAvailable(): bool;
    function obtain(): ICamera;

}

/// Capture: http://docs.phonegap.com/en/2.5.0/cordova_media_capture_capture.md.html
module PhoneGap.Capture {

    interface ConfigurationData {
        type: string;
        height: number;
        width: number;
    }

    interface MediaFileData {
        codecs: string;
        bitrate: number;
        height: number;
        width: number;
        duration: number;
    }

    interface MediaFile {

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

    interface CaptureAudioOptions {
        limit?: number;
        duration?: number;
        mode?: ConfigurationData;
    }

    interface CaptureImageOptions {
        limit?: number;
        mode?: ConfigurationData;
    }

    interface CaptureVideoOptions {
        limit?: number;
        duration?: number;
        mode?: ConfigurationData;
    }

    enum CaptureError {
        CAPTURE_INTERNAL_ERR,
        CAPTURE_APPLICATION_BUSY,
        CAPTURE_INVALID_ARGUMENT,
        CAPTURE_NO_MEDIA_FILES,
        CAPTURE_NOT_SUPPORTED
    }

    interface CaptureException {
        code: CaptureError;
    }

    interface ICapture {

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

    function isAvailable(): bool;
    function obtain(): ICapture;
}

/// Compass: http://docs.phonegap.com/en/2.5.0/cordova_compass_compass.md.html#Compass
module PhoneGap.Compass {

    interface Heading {
        magneticHeading: number;
        trueHeading: number;
        headingAccuracy: number;
        timestamp: number;
    }

    interface WatchID {}

    enum CompassError {
        COMPASS_INTERNAL_ERR,
        COMPASS_NOT_SUPPORTED
    }

    interface CompassException {
        code: CompassError;
    }

    interface Options {
        filter?: number;
        frequency?: number;
    }

    interface ICompass {

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

    function isAvailable(): bool;
    function obtain(): ICompass;
}

/// Connection: http://docs.phonegap.com/en/2.5.0/cordova_connection_connection.md.html
module PhoneGap.Connection {

    enum ConnectionType { UNKNOWN, ETHERNET, WIFI, CELL_2G, CELL_3G, CELL_4G, NONE }

    interface IConnection {
        type: ConnectionType;
    }

    function isAvailable(): bool;
    function obtain(): IConnection;
}

/// Contacts: http://docs.phonegap.com/en/2.5.0/cordova_contacts_contacts.md.html
module PhoneGap.Contacts {

    interface IContactName {
        formatted: string;
        familyName: string;
        givenName: string;
        middleName: string;
        honorifixPrefix: string;
        honorifixSuffix: string;
    }

    var ContactName: { new (): IContactName; };

    interface IContactAddress {
        pref: bool;
        type: string;
        formatted: string;
        streetAddress: string;
        locality: string;
        region: string;
        postalCode: string;
        country: string;
    }

    var ContactAddress: { new (): IContactAddress; };

    interface IContactOrganization {
        pref: bool;
        type: string;
        name: string;
        department: string;
        title: string;
    }

    var ContactOrganization: { new (): IContactOrganization; };

    interface IContactField {
        pref: bool;
        type: string;
        value: string;
    }

    var ContactField: { new (type: string, value: string, pref: bool): IContactField; }

    interface ContactProperties {
        id?: string;
        displayName?: string;
        name?: IContactName;
        nickname?: string;
        phoneNumbers?: IContactField[];
        emails?: IContactField[];
        addresses?: IContactAddress[];
        ims?: IContactField[];
        organizations?: IContactOrganization[];
        birthday?: Date;
        note?: string;
        photos: IContactField[];
        categories: IContactField[];
        urls: IContactField[];
    }

    enum ContactError {
        UNKNOWN_ERROR,
        INVALID_ARGUMENT_ERROR,
        TIMEOUT_ERROR,
        PENDING_OPERATION_ERROR,
        IO_ERROR,
        NOT_SUPPORTED_ERROR,
        PERMISSION_DENIED_ERROR
    }

    interface ContactException {
        code: ContactError;
    }

    interface Contact extends ContactProperties {

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

    interface ContactFindOptions {
        filter?: string;
        multiple?: bool;
    }

    interface IContacts {

        create(properties?: ContactProperties): Contact;

        find
        (
            fields: string[],
            onSuccess: (contacts: Contact[]) => void ,
            onError: (error: ContactException) => void ,
            options?: ContactFindOptions
        ): void;

    }

    function isAvailable(): bool;
    function obtain(): IContacts;
}

/// Device: http://docs.phonegap.com/en/2.5.0/cordova_device_device.md.html
module PhoneGap.Device {

    interface IDevice {
        cordova: string;
        platform: string;
        uuid: string;
        version: string;
    }

    function isAvailable(): bool;
    function obtain(): IDevice;

}

/// Events: http://docs.phonegap.com/en/2.5.0/cordova_events_events.md.html
module PhoneGap.Events {

    interface SimpleEvent {
        add(f: () => void ): void;
        name: string;
        remove(f: () => void ): void;
    }

    var deviceReady: SimpleEvent;
    var pause: SimpleEvent;
    var resume: SimpleEvent;
    var online: SimpleEvent;
    var offline: SimpleEvent;
    var backButton: SimpleEvent;
    var menuButton: SimpleEvent;
    var searchButton: SimpleEvent;
    var startCallButton: SimpleEvent;
    var endCallButton: SimpleEvent;
    var volumeDownButton: SimpleEvent;
    var volumeUpButton: SimpleEvent;

    interface BatteryEvent {
        add(f: (args: BatteryEventArgs) => void ): void;
        name: string;
        remove(f: (args: BatteryEventArgs) => void ): void;
    }

    /// Info object passed to battery event handlers
    interface BatteryEventArgs {
        level: number;
        isPlugged: bool;
    }

    var batteryCritical: BatteryEvent;
    var batteryLow: BatteryEvent;
    var batteryStatus: BatteryEvent;

}

/// File: http://docs.phonegap.com/en/2.5.0/cordova_file_file.md.html#File
/// Should be defined as W3C File API. TODO: verify.

/// Geolocation: http://docs.phonegap.com/en/2.5.0/cordova_geolocation_geolocation.md.html#Geolocation
/// Should be defined as W3C Geolocation API. TODO: verify.

/// Globalization: http://docs.phonegap.com/en/2.5.0/cordova_globalization_globalization.md.html
module PhoneGap.Globalization {

    enum DateSelector { Date, DateAndTime, Time }
    enum DateNameVariant { Days, Months }
    enum DateWidth { Narrow, Wide }
    enum FormatLength { Long, Medium, Short }
    enum NumberFormatType { Currency, Decimal, Percent }

    enum GlobalizationError {
        UNKNOWN_ERROR,
        FORMATTING_ERROR,
        PARSING_ERROR,
        PATTERN_ERROR
    };

    interface DateOptions {
        formatLength?: FormatLength;
        selector?: DateSelector;
    }

    interface DateObject {
        year: number;
        month: number;
        day: number;
        hour: number;
        minute: number;
        second: number;
        millisecond: number;
    }

    interface DatePattern {
        pattern: string;
        timezone: string;
        utc_offset: number;
        dst_offset: number;
    }

    interface GlobalizationException {
        code: GlobalizationError;
        message: string;
    }

    interface DateNameOptions {
        type: DateWidth;
        item: DateNameVariant;
    }

    interface NumberFormat {
        type: NumberFormatType;
    }

    interface NumberPattern {
        pattern: string;
        symbol: string;
        fraction: number;
        rounding: number;
        positive: string;
        negative: string;
        decimal: string;
        grouping: string;
    }

    interface CurrencyPattern {
        pattern: string;
        code: string;
        fraction: number;
        rounding: number;
        decimal: string;
        grouping: string;
    }

    interface IGlobalization {

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

    function isAvailable(): bool;
    function obtain(): IGlobalization;

}

/// InAppBrowser: http://docs.phonegap.com/en/2.5.0/cordova_inappbrowser_inappbrowser.md.html
module PhoneGap.InAppBrowser {

    enum EventType { Exit, LoadStart, LoadStop }
    enum PresentationStyle { FormSheet, FullScreen, PageSheet };
    enum Target { Blank, Self, System };
    enum TransitionStyle { CoverVertical, CrossDissolve, FlipHorizontal };

    interface Options {
        location?: bool;
        enableViewportScale?: bool;
        mediaPlaybackRequiresUserAction?: bool;
        allowInlineMediaPlayback?: bool;
        keyboardDisplayRequiresUserAction?: bool;
        suppressesIncrementalRendering?: bool;
        presentationStyle?: PresentationStyle;
        transitionStyle?: TransitionStyle;
    }

    interface EventArgs {
        type: EventType;
        url: string;
    }

    interface Window {
        close(): void;
        addEventListener(event: EventType, handler: (args: EventArgs) => void );
        removeEventListener(event: EventType, handler: (args: EventArgs) => void );
    }

    function open(url: string, target?: Target, options?: Options): Window;

}

/// Media: http://docs.phonegap.com/en/2.5.0/cordova_media_media.md.html
module PhoneGap.Media {

    enum MediaError {
        MEDIA_ERR_ABORTED,
        MEDIA_ERR_NETWORK,
        MEDIA_ERR_DECODE,
        MEDIA_NONE_SUPPORTED
    }

    enum MediaStatus {
        MEDIA_NONE,
        MEDIA_STARTING,
        MEDIA_RUNNING,
        MEDIA_PAUSED,
        MEDIA_STOPPED
    }

    interface MediaException {
        code: MediaError;
        message: string;
    }

    interface IMedia {

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

    function create
    (
        src: string,
        mediaSuccess?: () => void ,
        mediaError?: (error: MediaException) => void ,
        mediaStatus?: (status: MediaStatus) => void
    ): IMedia;

}

/// Notification: http://docs.phonegap.com/en/2.5.0/cordova_notification_notification.md.html
module PhoneGap.Notification {

    interface INotification {

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

    function isAvailable(): bool;
    function obtain(): INotification;

}

/// Splashscreen: http://docs.phonegap.com/en/2.5.0/cordova_splashscreen_splashscreen.md.html
module PhoneGap.Splashscreen {

    interface Splashscreen {
        hide(): void;
        show(): void;
    }

    function isAvailable(): bool;
    function obtain(): Splashscreen;
}

/// Storage: http://docs.phonegap.com/en/2.5.0/cordova_storage_storage.md.html
module PhoneGap.Storage {

    enum SQLError {
        UNKNOWN_ERR,
        DATABASE_ERR,
        VERSION_ERR,
        TOO_LARGE_ERR,
        QUOTA_ERR,
        SYNTAX_ERR,
        CONSTRAINT_ERR,
        TIMEOUT_ERR
    }

    interface SQLException {
        code: SQLError;
        message: string;
    }

    interface SQLDatabase {

        changeVersion(oldVersion: number, newVersion: number): void;

        transaction
        (
            populateDB: (tx: SQLTransaction) => void ,
            onError: (tx: SQLTransaction, error: SQLException) => void ,
            onSuccess: () => void
        ): void;

    }

    interface SQLResultSet {
        insertId: number;
        rowsAffected: number;
        rows: SQLResultSetRowList;
    }

    interface SQLResultSetRowList {
        length: number;
        [index: number]: any;
    }

    interface SQLTransaction {

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

    function openDatabase
    (
        database_name: string,
        database_version: string,
        database_displayname: string,
        database_size: number
    ): SQLDatabase;

}
