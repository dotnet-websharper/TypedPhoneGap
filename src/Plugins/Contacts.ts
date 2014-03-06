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

/// org.apache.cordova.contacts plugin:
/// https://github.com/apache/cordova-plugin-contacts

module TypedPhoneGap.Contacts {

    export interface Plugin {
        create(properties?: Properties): Contact;
        find(fields: string[],
            onSuccess: (contacts: Contact[]) => void,
            onError: (error: Error) => void,
            options?: FindOptions): void;
    }

    export interface Properties {
        id?: string;
        displayName?: string;
        name?: Name;
        nickname?: string;
        phoneNumbers?: Field[];
        emails?: Field[];
        addresses?: Address[];
        ims?: Field[];
        organizations?: Organization[];
        birthday?: Date;
        note?: string;
        photos: Field[];
        categories: Field[];
        urls: Field[];
    }

    export interface Error {
        code: ErrorCode;
        message: string;
    }

    export interface Name {
        formatted?: string;
        familyName?: string;
        givenName?: string;
        middleName?: string;
        honorifixPrefix?: string;
        honorifixSuffix?: string;
    }

    export interface Field {
        pref: boolean;
        type: string;
        value: string;
    }

    export interface Address {
        pref?: boolean;
        type?: string;
        formatted?: string;
        streetAddress?: string;
        locality?: string;
        region?: string;
        postalCode?: string;
        country?: string;
    }

    export interface Organization {
        pref?: boolean;
        type?: string;
        name?: string;
        department?: string;
        title?: string;
    }

    export interface FindOptions {
        filter?: string;
        multiple?: boolean;
    }

    export interface Contact extends Properties {
        clone(): Contact;
        remove(onSuccess: () => void,
            onError: (error: Error) => void): void;
        save(onSuccess: (contact: Contact) => void,
            onError: (error: Error) => void): void;
    }

    export interface ErrorCode { }

    export module ErrorCode {
        var errorCodes = Utility.field<any>(window, "ContactError", {});
        export var UnknownError = errorCodes.UNKNOWN_ERROR;
        export var InvalidArgumentError = errorCodes.INVALID_ARGUMENT_ERROR;
        export var TimeoutError = errorCodes.TIMEOUT_ERROR;
        export var PendingOperationError = errorCodes.PENDING_OPERATION_ERROR;
        export var IOError = errorCodes.IO_ERROR;
        export var NotSupportedError = errorCodes.NOT_SUPPORTED_ERROR;
        export var PermissionDeniedError = errorCodes.PERMISSION_DENIED_ERROR;
    }

    var p = Utility.definePlugin({
        id: "org.apache.cordova.contacts",
        name: "TypedPhoneGap.Contacts",
        def: function () {
            return Utility.field<Plugin>(navigator, "contacts");
        }
    });

    export function getPlugin() {
        return p.getPlugin();
    }
}
