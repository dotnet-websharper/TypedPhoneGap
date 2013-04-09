module TypedPhoneGap {
    module Accelerometer {
        interface Acceleration {
            x: number;
            y: number;
            z: number;
            timestamp: number;
        }
        interface Options {
            frequency?: number;
        }
        interface WatchID {
        }
        interface IAccelerometer {
            getCurrentAcceleration(accelerometerSuccess: (acceleration: Acceleration) => void, accelerometerError: () => void): void;
            watchAcceleration(accelerometerSuccess: (acceleration: Acceleration) => void, accelerometerError: () => void, accelerometerOptions?: Options): WatchID;
            clearWatch(watchID: WatchID): void;
        }
        function isAvailable(glob: any): bool;
        function obtain(glob: any): IAccelerometer;
    }
    module Camera {
        interface DestinationType {
        }
        interface DestinationTypes {
            DATA_URL: DestinationType;
            FILE_URL: DestinationType;
        }
        interface EncodingType {
        }
        interface EncodingTypes {
            JPEG: EncodingType;
            PNG: EncodingType;
        }
        interface MediaType {
        }
        interface MediaTypes {
            ALLMEDIA: MediaType;
            PICTURE: MediaType;
            VIDEO: MediaType;
        }
        interface PictureSourceType {
        }
        interface PictureSourceTypes {
            CAMERA: PictureSourceType;
            PHOTOLIBRARY: PictureSourceType;
            SAVEDPHOTOALBUM: PictureSourceType;
        }
        interface PopoverArrowDirection {
        }
        interface PopoverArrowDirections {
            ARROW_UP: PopoverArrowDirection;
            ARROW_DOWN: PopoverArrowDirection;
            ARROW_LEFT: PopoverArrowDirection;
            ARROW_RIGHT: PopoverArrowDirection;
            ARROW_ANY: PopoverArrowDirection;
        }
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
        interface PopoverOptions {
            x?: number;
            y?: number;
            width?: number;
            height?: number;
            arrowDir?: PopoverArrowDirection;
        }
        interface ICamera {
            getPicture(cameraSuccess: (imageData: string) => void, cameraError: (message: string) => void, cameraOptions?: Options): void;
            cleanup(cameraSuccess: (imageData: string) => void, cameraError: (message: string) => void): void;
            DestinationType: DestinationTypes;
            EncodingType: EncodingTypes;
            MediaType: MediaTypes;
            PictureSourceType: PictureSourceTypes;
            PopoverArrowDirection: PopoverArrowDirections;
        }
        interface CameraCapability {
            camera: ICamera;
            createPopoverOptions(x: number, y: number, width: number, height: number, dir: PopoverArrowDirection): PopoverOptions;
        }
        function isAvailable(glob: any): bool;
        function obtain(glob: any): CameraCapability;
    }
    module Capture {
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
            getFormatData(successCallback: (data: MediaFileData) => void, errorCallback?: () => void);
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
        interface CaptureError {
        }
        interface CaptureErrors {
            CAPTURE_INTERNAL_ERR: CaptureError;
            CAPTURE_APPLICATION_BUSY: CaptureError;
            CAPTURE_INVALID_ARGUMENT: CaptureError;
            CAPTURE_NO_MEDIA_FILES: CaptureError;
            CAPTURE_NOT_SUPPORTED: CaptureError;
        }
        interface CaptureException {
            code: CaptureError;
        }
        interface ICapture {
            supportedAudioModes: ConfigurationData[];
            supportedImageModes: ConfigurationData[];
            supportedVideoModes: ConfigurationData[];
            captureAudio(onSuccess: (mediaFiles: MediaFile[]) => void, onError: (error: CaptureException) => void, options?: CaptureAudioOptions): void;
            captureImage(onSuccess: (mediaFiles: MediaFile[]) => void, onError: (error: CaptureException) => void, options?: CaptureImageOptions): void;
            captureVideo(onSuccess: (mediaFiles: MediaFile[]) => void, onError: (error: CaptureException) => void, options?: CaptureVideoOptions): void;
        }
        interface CaptureCapability {
            capture: ICapture;
            errors: CaptureErrors;
        }
        function isAvailable(glob: any): bool;
        function obtain(glob: any): CaptureCapability;
    }
    module Compass {
        interface Heading {
            magneticHeading: number;
            trueHeading: number;
            headingAccuracy: number;
            timestamp: number;
        }
        interface WatchID {
        }
        interface CompassError {
        }
        interface CompassErrors {
            COMPASS_INTERNAL_ERR: CompassError;
            COMPASS_NOT_SUPPORTED: CompassError;
        }
        interface CompassException {
            code: CompassError;
        }
        interface Options {
            filter?: number;
            frequency?: number;
        }
        interface ICompass {
            getCurrentHeading(onSuccess: (heading: Heading) => void, onError: (error: CompassException) => void, options?: Options): void;
            watchHeading(onSuccess: (heading: Heading) => void, onError: (error: CompassException) => void, options?: Options): WatchID;
            clearWatch(id: WatchID): void;
        }
        interface CompassCapability {
            compass: ICompass;
            errors: CompassErrors;
        }
        function isAvailable(glob: any): bool;
        function obtain(glob: any): CompassCapability;
    }
    module Connection {
        interface ConnectionType {
        }
        interface ConnectionTypes {
            UNKNOWN: ConnectionType;
            ETHERNET: ConnectionType;
            WIFI: ConnectionType;
            CELL_2G: ConnectionType;
            CELL_3G: ConnectionType;
            CELL_4G: ConnectionType;
            NONE: ConnectionType;
        }
        interface IConnection {
            type: ConnectionType;
        }
        interface ConnectionCapability {
            connection: IConnection;
            types: ConnectionTypes;
        }
        function isAvailable(glob: any): bool;
        function obtain(glob: any): ConnectionCapability;
    }
    module Contacts {
        interface ContactName {
            formatted: string;
            familyName: string;
            givenName: string;
            middleName: string;
            honorifixPrefix: string;
            honorifixSuffix: string;
        }
        interface ContactAddress {
            pref: bool;
            type: string;
            formatted: string;
            streetAddress: string;
            locality: string;
            region: string;
            postalCode: string;
            country: string;
        }
        interface ContactOrganization {
            pref: bool;
            type: string;
            name: string;
            department: string;
            title: string;
        }
        interface ContactField {
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
        interface ContactError {
        }
        interface ContactErrors {
            UNKNOWN_ERROR: ContactError;
            INVALID_ARGUMENT_ERROR: ContactError;
            TIMEOUT_ERROR: ContactError;
            PENDING_OPERATION_ERROR: ContactError;
            IO_ERROR: ContactError;
            NOT_SUPPORTED_ERROR: ContactError;
            PERMISSION_DENIED_ERROR: ContactError;
        }
        interface ContactException {
            code: ContactError;
        }
        interface Contact extends ContactProperties {
            clone(): Contact;
            remove(onSuccess: (contact: Contact) => void, onError: (error: ContactException) => void): void;
            save(onSuccess: (contact: Contact) => void, onError: (error: ContactException) => void): void;
        }
        interface ContactFindOptions {
            filter?: string;
            multiple?: bool;
        }
        interface IContacts {
            create(properties?: ContactProperties): Contact;
            find(fields: string[], onSuccess: (contacts: Contact[]) => void, onError: (error: ContactException) => void, options?: ContactFindOptions): void;
        }
        interface ContactsCapability {
            contacts: IContacts;
            errors: ContactErrors;
            createContactName(): ContactName;
            createContactAddress(): ContactAddress;
            createContactOrganization(): ContactOrganization;
            createContactField(type: string, value: string, pref: bool): ContactField;
        }
        function isAvailable(glob: any): bool;
        function obtain(glob: any): ContactsCapability;
    }
    module Device {
        interface IDevice {
            cordova: string;
            platform: string;
            uuid: string;
            version: string;
        }
        function isAvailable(glob: any): bool;
        function obtain(glob: any): IDevice;
    }
    module Events {
        interface SimpleEvent {
            add(f: () => void): void;
            name: string;
            remove(f: () => void): void;
        }
        interface BatteryEvent {
            add(f: (args: BatteryEventArgs) => void): void;
            name: string;
            remove(f: (args: BatteryEventArgs) => void): void;
        }
        interface BatteryEventArgs {
            level: number;
            isPlugged: bool;
        }
        interface IEvents {
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
        function obtain(glob: Window): IEvents;
    }
    module Globalization {
        interface DateSelector {
        }
        module DateSelectors {
            var Date: DateSelector;
            var DateAndTime: DateSelector;
            var Time: DateSelector;
        }
        interface DateNameVariant {
        }
        module DateNameVariants {
            var Days: DateNameVariant;
            var Months: DateNameVariant;
        }
        interface DateWidth {
        }
        module DateWidths {
            var Narrow: DateWidth;
            var Wide: DateWidth;
        }
        interface FormatLength {
        }
        module FormatLengths {
            var Long: FormatLength;
            var Medium: FormatLength;
            var Short: FormatLength;
        }
        interface NumberFormatType {
        }
        module NumberFormatTypes {
            var Currency: NumberFormatType;
            var Decimal: NumberFormatType;
            var Percent: NumberFormatType;
        }
        interface GlobalizationError {
        }
        interface GlobalizationErrors {
            UNKNOWN_ERROR: GlobalizationError;
            FORMATTING_ERROR: GlobalizationError;
            PARSING_ERROR: GlobalizationError;
            PATTERN_ERROR: GlobalizationError;
        }
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
            getPreferredLanguage(onSuccess: (language: {
                    value: string;
                }) => void, onError: (error: GlobalizationException) => void): void;
            getLocaleName(onSuccess: (locale: {
                    value: string;
                }) => void, onError: (error: GlobalizationException) => void): void;
            dateToString(date: Date, onSuccess: (date: {
                    value: string;
                }) => void, onError: (error: GlobalizationException) => void, options?: DateOptions): void;
            stringToDate(dateString: string, onSuccess: (date: DateObject) => void, onError: (error: GlobalizationException) => void, options?: DateOptions): void;
            getDatePattern(onSuccess: (datePattern: DatePattern) => void, onError: (error: GlobalizationException) => void, options?: DateOptions): void;
            getDateNames(onSuccess: (names: {
                    value: string[];
                }) => void, onError: (error: GlobalizationException) => void, options?: DateNameOptions): void;
            isDaylightSavingsTime(date: Date, onSuccess: (result: {
                    dst: bool;
                }) => void, onError: (error: GlobalizationException) => void): void;
            getFirstDayOfWeek(onSuccess: (day: {
                    value: number;
                }) => void, onError: (error: GlobalizationException) => void): void;
            nubmerToString(value: number, onSuccess: (result: {
                    value: string;
                }) => void, onError: (error: GlobalizationException) => void, format?: NumberFormat): void;
            stringToNumber(value: string, onSuccess: (result: {
                    value: number;
                }) => void, onError: (error: GlobalizationException) => void, format?: NumberFormat): void;
            getNumberPattern(onSuccess: (result: NumberPattern) => void, onError: (error: GlobalizationException) => void, format?: NumberFormat): void;
            getCurrencyPattern(currencyCode: string, onSuccess: (result: CurrencyPattern) => void, onError: (error: GlobalizationException) => void): void;
        }
        interface GlobalizationCapability {
            globalization: IGlobalization;
            errors: GlobalizationErrors;
        }
        function isAvailable(glob: any): bool;
        function obtain(glob: any): GlobalizationCapability;
    }
    module InAppBrowser {
        interface EventType {
        }
        module EventTypes {
            var Exit: EventType;
            var LoadStart: EventType;
            var LoadStop: EventType;
        }
        interface PresentationStyle {
        }
        module PresentationStyles {
            var FormSheet: PresentationStyle;
            var FullSheet: PresentationStyle;
            var PageSheet: PresentationStyle;
        }
        interface Target {
        }
        module Targets {
            var Blank: Target;
            var Self: Target;
            var System: Target;
        }
        interface TransitionStyle {
        }
        module TransitionStyles {
            var CoverVertical: TransitionStyle;
            var CrossDissolve: TransitionStyle;
            var FlipHorizontal: TransitionStyle;
        }
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
        interface IWindow {
            close(): void;
            addEventListener(event: EventType, handler: (args: EventArgs) => void);
            removeEventListener(event: EventType, handler: (args: EventArgs) => void);
        }
        interface InAppBrowserCapability {
            open(url: string, target?: Target, options?: Options): IWindow;
        }
        function obtain(glob: Window): InAppBrowserCapability;
    }
    module Media {
        interface MediaError {
        }
        interface MediaErrors {
            MEDIA_ERR_ABORTED: MediaError;
            MEDIA_ERR_NETWORK: MediaError;
            MEDIA_ERR_DECODE: MediaError;
            MEDIA_NONE_SUPPORTED: MediaError;
        }
        interface MediaStatus {
        }
        interface MediaStatuses {
            MEDIA_NONE: MediaStatus;
            MEDIA_STARTING: MediaStatus;
            MEDIA_RUNNING: MediaStatus;
            MEDIA_PAUSED: MediaStatus;
            MEDIA_STOPPED: MediaStatus;
        }
        interface MediaException {
            code: MediaError;
            message: string;
        }
        interface IMedia {
            getCurrentPosition(onSuccess: (position: number) => void, onError?: (error: MediaException) => void): void;
            getDuration(): number;
            play(): void;
            pause(): void;
            release(): void;
            seekTo(position: number): void;
            startRecord(): void;
            stopRecord(): void;
            stop(): void;
        }
        interface MediaCapability {
            createMedia(src: string, mediaSuccess?: () => void, mediaError?: (error: MediaException) => void, mediaStatus?: (status: MediaStatus) => void): IMedia;
            errors: MediaErrors;
            statuses: MediaStatuses;
        }
        function isAvailable(glob: any): bool;
        function obtain(glob: any): MediaCapability;
    }
    module Notification {
        interface INotification {
            alert(message: string, alertCallack: () => void, title?: string, buttonName?: string): void;
            beep(times: number): void;
            confirm(message: string, confirmCallback: (choice: number) => void, title?: string, buttonNames?: string): void;
            vibrate(milliseconds: number): void;
        }
        function isAvailable(glob: any): bool;
        function obtain(glob: any): INotification;
    }
    module Splashscreen {
        interface ISplashscreen {
            hide(): void;
            show(): void;
        }
        function isAvailable(glob: any): bool;
        function obtain(glob: any): ISplashscreen;
    }
    module Storage {
        interface SQLError {
        }
        interface SQLErrors {
            UNKNOWN_ERR: SQLError;
            DATABASE_ERR: SQLError;
            VERSION_ERR: SQLError;
            TOO_LARGE_ERR: SQLError;
            QUOTA_ERR: SQLError;
            SYNTAX_ERR: SQLError;
            CONSTRAINT_ERR: SQLError;
            TIMEOUT_ERR: SQLError;
        }
        interface SQLException {
            code: SQLError;
            message: string;
        }
        interface SQLDatabase {
            changeVersion(oldVersion: number, newVersion: number): void;
            transaction(populateDB: (tx: SQLTransaction) => void, onError: (tx: SQLTransaction, error: SQLException) => void, onSuccess: () => void): void;
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
            executeSql(sql: string, onSuccess: (result: SQLResultSet) => void, onError: (error: SQLException) => void): void;
            executeSql(sql: string, parameters: any[], onSuccess: (result: SQLResultSet) => void, onError: (error: SQLException) => void): void;
        }
        interface IStorage {
            errors: SQLErrors;
            openDatabase(database_name: string, database_version: string, database_displayname: string, database_size: number): SQLDatabase;
        }
        function isAvailable(glob: any): bool;
        function obtain(glob: any): IStorage;
    }
}
