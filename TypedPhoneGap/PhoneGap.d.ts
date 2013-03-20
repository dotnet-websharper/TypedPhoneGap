// TypeScript definitions for PhoneGap (Cordova) 2.5.0 <http://phonegap.com>
// Source (Bitbucket): http://bitbucket.org/IntelliFactory/typedphonegap
// Source (GitHub): http://github.com/intellifactory/typedphonegap
//
// See also: the currently more complete PhoneGap 2.3.0 TypeScript definitions
// by DefinitelyTyped < http://github.com/borisyankov/DefinitelyTyped>

// Accelerometer: http://docs.phonegap.com/en/2.5.0/cordova_accelerometer_accelerometer.md.html

interface Acceleration {
    x: number;
    y: number;
    z: number;

    // DOMTimeStamp
    timestamp: number;
}

interface AccelerometerOptions { frequency?: number; }
interface AccelerometerWatchID {}

interface Accelerometer {

    getCurrentAcceleration
    (
        accelerometerSuccess: (acceleration: Acceleration) => void ,
        accelerometerError: () => void
    ): void;

    watchAcceleration
    (
        accelerometerSuccess: (acceleration: Acceleration) => void ,
        accelerometerError: () => void ,
        accelerometerOptions?: AccelerometerOptions
    ): AccelerometerWatchID;

    clearWatch(watchID: AccelerometerWatchID): void;
}

// Camera: http://docs.phonegap.com/en/2.5.0/cordova_camera_camera.md.html

module Camera {

    enum DestinationType { DATA_URL = 0, FILE_URI = 1 }
    enum EncodingType { JPEG = 0, PNG = 1 }
    enum MediaType { PICTURE = 0, VIDEO = 1, ALLMEDIA = 2 }
    enum PictureSourceType { PHOTOLIBRARY = 0, CAMERA = 1, SAVEDPHOTOALBUM = 2 }

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
        popoverOptions?: PopoverOptions;
    }

    enum PopoverArrowDirection {
        ARROW_UP = 1,
        ARROW_DOWN = 2,
        ARROW_LEFT = 4,
        ARROW_RIGHT = 8,
        ARROW_ANY = 15
    }

    interface PopoverOptions {
        x?: number;
        y?: number;
        width?: number;
        height?: number;
        arrowDir?: PopoverArrowDirection;
    }

}

interface Camera {

    getPicture
    (
        cameraSuccess: (imageData: string) => void ,
        cameraError: (message: string) => void ,
        cameraOptions?: Camera.Options
    ): void;

    cleanup
    (
        cameraSuccess: (imageData: string) => void ,
        cameraError: (message: string) => void
    ): void;

}

var CameraPopoverOptions: {
    new (
        x: number,
        y: number,
        width: number,
        height: number,
        dir: Camera.PopoverArrowDirection
    ): Camera.PopoverOptions;
}

// Capture: http://docs.phonegap.com/en/2.5.0/cordova_media_capture_capture.md.html

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

interface Capture {

    supportedAudioModes: ConfigurationData[];
    supportedImageModes: ConfigurationData[];
    supportedVideoModes: ConfigurationData[];

    captureAudio
    (
        onSuccess: (mediaFiles: MediaFile[]) => void ,
        onError: (captureError: { code: CaptureError; }) => void ,
        options?: CaptureAudioOptions
    ): void;

    captureImage
    (
        onSuccess: (mediaFiles: MediaFile[]) => void ,
        onError: (captureError: { code: CaptureError; }) => void ,
        options?: CaptureImageOptions
    ): void;

    captureVideo
    (
        onSuccess: (mediaFiles: MediaFile[]) => void ,
        onError: (captureError: { code: CaptureError; }) => void ,
        options?: CaptureVideoOptions
    ): void;

}

// Compass: http://docs.phonegap.com/en/2.5.0/cordova_compass_compass.md.html#Compass

interface CompassHeading {
    magneticHeading: number;
    trueHeading: number;
    headingAccuracy: number;
    timestamp: number;
}

interface CompassWatchID {}

enum CompassError {
    COMPASS_INTERNAL_ERR,
    COMPASS_NOT_SUPPORTED
}

interface CompassOptions {
    filter?: number;
    frequency?: number;
}

interface Compass {

    getCurrentHeading
    (
        onSuccess: (heading: CompassHeading) => void ,
        onError: (error: { code: CompassError; }) => void ,
        options?: CompassOptions
    ): void;

    watchHeading
    (
        onSuccess: (heading: CompassHeading) => void ,
        onError: (error: { code: CompassError; }) => void ,
        options?: CompassOptions
    ): CompassWatchID;

    clearWatch(id: CompassWatchID): void;
}

// Connection: http://docs.phonegap.com/en/2.5.0/cordova_connection_connection.md.html

enum Connection {
    UNKNOWN,
    ETHERNET,
    WIFI,
    CELL_2G,
    CELL_3G,
    CELL_4G,
    NONE
}

// Contacts: http://docs.phonegap.com/en/2.5.0/cordova_contacts_contacts.md.html

class ContactName {
    constructor();
    formatted: string;
    familyName: string;
    givenName: string;
    middleName: string;
    honorifixPrefix: string;
    honorifixSuffix: string;
}

class ContactAddress {
    constructor();
    pref: bool;
    type: string;
    formatted: string;
    streetAddress: string;
    locality: string;
    region: string;
    postalCode: string;
    country: string;
}

class ContactOrganization {
    constructor();
    pref: bool;
    type: string;
    name: string;
    department: string;
    title: string;
}

class ContactField {
    constructor(type: string, value: string, pref: bool);
    pref: bool;
    type: string;
    value: string;
}

interface ContactProperties {
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

enum ContactError {
    UNKNOWN_ERROR,
    INVALID_ARGUMENT_ERROR,
    TIMEOUT_ERROR,
    PENDING_OPERATION_ERROR,
    IO_ERROR,
    NOT_SUPPORTED_ERROR,
    PERMISSION_DENIED_ERROR
}

interface Contact extends ContactProperties {

    clone(): Contact;

    remove
    (
        onSuccess: (contact: Contact) => void ,
        onError: (error: { code: ContactError; }) => void
    ): void;

    save
    (
        onSuccess: (contact: Contact) => void ,
        onError: (error: { code: ContactError; }) => void
    ): void;

}

interface ContactFindOptions {
    filter?: string;
    multiple?: bool;
}

interface Contacts {

    create(properties?: ContactProperties): Contact;

    find
    (
        fields: string[],
        onSuccess: (contacts: Contact[]) => void ,
        onError: (error: { code: ContactError; }) => void ,
        options?: ContactFindOptions
    ): void;

}

// Device: http://docs.phonegap.com/en/2.5.0/cordova_device_device.md.html

module device {
    var cordova: string;
    var platform: string;
    var uuid: string;
    var version: string;
}

// Events: http://docs.phonegap.com/en/2.5.0/cordova_events_events.md.html

// Info object passed to "batterycritical", "batterylow", "batterystatus" handlers
interface BatteryEvent {
    level: number;
    isPlugged: bool;
}

// TODO: typed API for events in TypedPhoneGap.ts

// File: http://docs.phonegap.com/en/2.5.0/cordova_file_file.md.html#File
// Should be defined as W3C File API. TODO: verify.

// Geolocation: http://docs.phonegap.com/en/2.5.0/cordova_geolocation_geolocation.md.html#Geolocation
// Should be defined as W3C Geolocation API. TODO: verify.

// Globalization: http://docs.phonegap.com/en/2.5.0/cordova_globalization_globalization.md.html

enum GlobalizationError {
    UNKNOWN_ERROR = 0,
    FORMATTING_ERROR = 1,
    PARSING_ERROR = 2,
    PATTERN_ERROR = 3
}

interface DateOptions {

    // TODO: formalize formatLength in ['short', 'medium', 'long']
    formatLength?: string;

    // TODO: formalize selector in ['date', 'time', 'date and time']
    selector?: string;
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
    type: string; // narrow or wide;
    item: string; // months or days;
}

interface NumberFormat {
    type: string; // 'decimal', 'percent', or 'currency'
}

interface NumberPattern {
    pattern: string;
    symbol: string;
    fraction: number;
    rounding: number;
    positive: string;
    negative; string;
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

interface Globalization {

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

/// InAppBrowser: See TypedPhoneGap.ts

/// TODO: Media
/// TODO: Notification
/// TODO: SplashScreen
/// TODO: Storage

