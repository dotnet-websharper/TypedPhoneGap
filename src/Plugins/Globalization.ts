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

/// org.apache.cordova.globalization plugin:
/// https://github.com/apache/cordova-plugin-globalization/

module TypedPhoneGap.Globalization {

    export interface Plugin {
        getPreferredLanguage(onSuccess: (language: { value: string; }) => void,
            onError: (error: Error) => void): void;
        getLocaleName(onSuccess: (locale: { value: string; }) => void,
            onError: (error: Error) => void): void;
        dateToString(date: Date,
            onSuccess: (date: { value: string; }) => void,
            onError: (error: Error) => void,
            options?: DateOptions): void;
        stringToDate(dateString: string,
            onSuccess: (date: DateObject) => void,
            onError: (error: Error) => void,
            options?: DateOptions): void;
        getDatePattern(onSuccess: (datePattern: DatePattern) => void,
            onError: (error: Error) => void,
            options?: DateOptions): void;
        getDateNames(onSuccess: (names: { value: string[]; }) => void,
            onError: (error: Error) => void,
            options?: DateNameOptions): void;
        isDaylightSavingsTime(date: Date,
            onSuccess: (result: { dst: boolean; }) => void,
            onError: (error: Error) => void): void;
        getFirstDayOfWeek(onSuccess: (day: { value: number; }) => void,
            onError: (error: Error) => void): void;
        nubmerToString(value: number,
            onSuccess: (result: { value: string; }) => void,
            onError: (error: Error) => void,
            format?: NumberFormat): void;
        stringToNumber(value: string,
            onSuccess: (result: { value: number; }) => void,
            onError: (error: Error) => void,
            format?: NumberFormat): void;
        getNumberPattern(
            onSuccess: (result: NumberPattern) => void,
            onError: (error: Error) => void,
            format?: NumberFormat): void;
        getCurrencyPattern(
            currencyCode: string,
            onSuccess: (result: CurrencyPattern) => void,
            onError: (error: Error) => void): void;
    }

    export interface DateOptions {
        formatLength?: FormatLength;
        selector?: DateSelector;
    }

    export interface FormatLength { }

    export module FormatLength {
        export var long: FormatLength = "long";
        export var medium: FormatLength = "medium";
        export var short: FormatLength = "short";
    }

    export interface DateSelector { }

    export module DateSelector {
        export var date: DateSelector = "date";
        export var dateAndTime: DateSelector = "date and time";
        export var time: DateSelector = "time";
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

    export interface NumberFormat {
        type: NumberFormatType;
    }

    export interface NumberFormatType { }

    export module NumberFormatType {
        export var currency: NumberFormatType = "currency";
        export var decimal: NumberFormatType = "decimal";
        export var percent: NumberFormatType = "percent";
    }

    export interface DatePattern {
        pattern: string;
        timezone: string;
        utc_offset: number;
        dst_offset: number;
    }

    export interface DateNameOptions {
        type: DateWidth;
        item: DateNameVariant;
    }

    export interface DateNameVariant { }

    export module DateNameVariant {
        export var days: DateNameVariant = "days";
        export var months: DateNameVariant = "months";
    }

    export interface DateWidth { }

    export module DateWidth {
        export var narrow: DateWidth = "narrow";
        export var wide: DateWidth = "wide";
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

    export enum ErrorCode {
        UnknownError = 0,
        FormattingError = 1,
        ParsingError = 2,
        PatternError = 3
    }

    export interface Error {
        code: ErrorCode;
        message: string;
    }

    var p = Utility.definePlugin<Plugin>({
        id: "org.apache.cordova.globalization",
        name: "TypedPhoneGap.Globalization",
        def: function () {
            return Utility.field<Plugin>(navigator, "globalization");
        }
    });

    export function getPlugin() {
        return p.getPlugin();
    }
}
