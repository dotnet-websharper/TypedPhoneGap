/// Provides extra code for accessing PhoneGap Cordova API in a type-safe manner.
module TypedPhoneGap {

    // InAppBrowser: http://docs.phonegap.com/en/2.5.0/cordova_inappbrowser_inappbrowser.md.html

    export module InAppBrowser {

        export enum EventType { EXIT = 1, LOAD_START = 2, LOAD_STOP = 3 }
        export enum PresentationStyle { FORMSHEET = 1, FULLSCREEN = 2, PAGESHEET = 3 }
        export enum Target { BLANK = 1, SELF = 2, SYSTEM = 3 }
        export enum TransitionStyle { FLIP_HORIZONTAL = 1, COVER_VERTICAL = 2, CROSS_DISSOLVE = 3 }

        export interface Event {
            type: EventType;
            url: string;
        }

        export interface Window {
            addListener(eventType: EventType, f: (e: Event) => void ): void;
            removeListener(eventType: EventType, f: (e: Event) => void ): void;
            close(): void;
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

        export function open(url: string, target?: Target, options?: Options): Window {
            var rawWindow: any = window.open(url, targetToString(target), optionsToString(options));
            var w: RawWindow = rawWindow;
            return {
                addListener: function (e, f) {
                    function g(x: RawEvent): void {
                        f(parseEvent(x));
                    }
                    var h: any = expando(f, "handler", g)
                    w.addEventListener(eventTypeToString(e), h);
                },
                removeListener: function (e, f) {
                    var h: any = f;
                    var hr: any = h.handler;
                    if (hr) {
                        w.removeEventListener(eventTypeToString(e), hr);
                    }
                },
                close: function () { w.close(); }
            };
        }

        function expando(x: Object, key: string, value: Object): Object {
            if (x.hasOwnProperty(key)) {
                return x[key];
            } else {
                x[key] = value;
                return value;
            }
        }

        function parseEvent(r: RawEvent): Event {
            return {
                type: eventTypeFromString(r.type),
                url: r.url
            }
        }

        function eventTypeToString(e: EventType): string {
            switch (e) {
                case EventType.LOAD_START: return "loadstart";
                case EventType.LOAD_STOP: return "loadstop";
                case EventType.EXIT: default: return "exit";
            }
        }

        function eventTypeFromString(s: string): EventType {
            switch (s) {
                case "loadstart": return EventType.LOAD_START;
                case "loadstop": return EventType.LOAD_STOP;
                case "exit": default: return EventType.LOAD_STOP;
            }
        }

        interface RawEvent {
            type: string;
            url: string;
        }

        interface RawWindow {

            addEventListener
            (
                eventName: string,
                callback: (x: RawEvent) => void
            ): void;

            close(): void;

            removeEventListener(
                eventName: string,
                callback: (x: RawEvent) => void
            ): void;

        }

        function presentationStyleToString(p: PresentationStyle) {
            switch (p) {
                case PresentationStyle.PAGESHEET:
                    return "pagesheet";
                case PresentationStyle.FORMSHEET:
                    return "formsheet";
                case PresentationStyle.FULLSCREEN: default:
                    return "fullscreen";
            }
        }

        function targetToString(t: Target): string {
            switch (t) {
                case Target.BLANK:
                    return "_blank";
                case Target.SYSTEM:
                    return "_system";
                case Target.SELF:
                default:
                    return "_self";
            }
        }

        function transitionStyleToString(t: TransitionStyle) {
            switch (t) {
                case TransitionStyle.FLIP_HORIZONTAL:
                    return "fliphorizontal";
                case TransitionStyle.CROSS_DISSOLVE:
                    return "crossdissolve";
                case TransitionStyle.COVER_VERTICAL: default:
                    return "coververtical";
            }
        }

        function optionsToString(options: Options) {
            var r = [];
            function bp(name: string): void {
                if (options.hasOwnProperty(name)) {
                    r.push(name + "=" + (options[name] ? "yes" : "no"));
                }
            }
            function sp(name: string, f: (x: any) => string): void {
                if (options.hasOwnProperty(name)) {
                    r.push(name + "=" + f(options[name]));
                }
            }
            if (options) {
                bp("location");
                bp("enableViewportScale");
                bp("mediaPlaybackRequiresUserAction");
                bp("allowInlineMediaPlayback");
                bp("keyboardDisplayRequiresUserAction");
                bp("suppressesIncrementalRendering");
                sp("presentationStyle", presentationStyleToString);
                sp("transitionStyle", transitionStyleToString);
                return r.join(",");
            } else {
                return "location=yes";
            }
        }
    }

}
