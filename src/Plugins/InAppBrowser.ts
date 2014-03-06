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

/// org.apache.cordova.inappbrowser plugin:
/// https://github.com/apache/cordova-plugin-inappbrowser

module TypedPhoneGap.InAppBrowser {

    export interface Plugin {
        openWindow(url: string, target?: Target, options?: Options): Window;
    }

    export interface EventType { }

    export module EventType {
        export var exit: EventType = "exit";
        export var loadError: EventType = "loaderror";
        export var loadStart: EventType = "loadstart";
        export var loadStop: EventType = "loadstop";
    }

    export interface PresentationStyle { }

    export module PresentationStyle {
        export var formSheet: PresentationStyle = "formsheet";
        export var fullScreen: PresentationStyle = "fullscreen";
        export var pageSheet: PresentationStyle = "pagesheet";
    }

    export interface ToolbarPosition { }

    export module ToolbarPosition {
        export var bottom: ToolbarPosition = "bottom";
        export var top: ToolbarPosition = "top";
    }

    export interface TransitionStyle { }

    export module TransitionStyle {
        export var coverVertical: TransitionStyle = "coververtical";
        export var crossDissolve: TransitionStyle = "crossdissolve";
        export var flipHorizontal: TransitionStyle = "fliphorizontal";
    }

    export interface Options {
        location?: boolean;

        closeButtonCaption?: string;
        hidden?: boolean;
        clearCache?: boolean;
        clearSessionCache?: boolean;

        disallowOverScroll?: boolean;
        toolbar?: boolean;
        enableViewportScale?: boolean;
        mediaPlaybackRequiresUserAction?: boolean;
        allowInlineMediaPlayback?: boolean;
        keyboardDisplayRequiresUserAction?: boolean;
        suppressesIncrementalRendering?: boolean;
        presentationStyle?: PresentationStyle;
        transitionStyle?: TransitionStyle;
        toolbarPosition?: ToolbarPosition;
    }

    function optionsToString(options: Options): string {
        var r = "";
        function bp(name: string, printName?: string): void {
            if (!printName) { printName = name; }
            if (options.hasOwnProperty(name)) {
                r += printName + "=" + (options[name] ? "yes" : "no");
            }
        }
        function sp(name: string, printName?: string): void {
            if (!printName) { printName = name; }
            if (options.hasOwnProperty(name)) {
                r += printName + "=" + String(options[name]);
            }
        }
        if (options) {
            bp("location");

            sp("closeButtonCaption", "closebuttoncaption");
            bp("hidden");
            bp("clearCache", "clearcache");
            bp("clearSessionCache", "clearsessioncache");

            bp("disallowOverScroll", "disallowoverscroll");
            bp("toolbar");
            bp("enableViewportScale");
            bp("mediaPlaybackRequiresUserAction");
            bp("allowInlineMediaPlayback");
            bp("keyboardDisplayRequiresUserAction");
            bp("suppressesIncrementalRendering");
            sp("presentationStyle", "presentationstyle");
            sp("transitionStyle", "transitionstyle");
            sp("toolbarPosition", "toolbarposition");
            return r;
        } else {
            return "location=yes";
        }
    }

    export interface InAppBrowserEvent {
        type: EventType;
        url: string;
        code: number;
        message: string;
    }

    export interface Window {
        addEventListener(event: EventType, handler: (evt: InAppBrowserEvent) => void);
        removeEventListener(event: EventType, handler: (evt: InAppBrowserEvent) => void);
        close(): void;
        show(): void;
        executeScript(script: { code: string }, callback: (result: any) => void);
        executeScript(script: { file: string }, callback: (result: any) => void);
        insertCSS(css: { code: string }, callback: () => void);
        insertCSS(css: { file: string }, callback: () => void);
    }

    export interface Target { }

    export module Target {
        export function custom(target: string): Target { return target; }
        export var blank: Target = "_blank";
        export var self: Target = "_self";
        export var system: Target = "_system";
    }

    function doOpen(url: string, target?: Target, options?: Options): Window {
        if (!target) { target = Target.self; }
        var w: any = window.open(url, String(target), optionsToString(options));
        return w;
    }

    var p = Utility.definePlugin<Plugin>({
        id: "org.apache.cordova.inappbrowser",
        name: "TypedPhoneGap.InAppBrowser",
        def: function () {
            var x: Plugin = { openWindow: doOpen };
            return x;
        }
    });;

    export function getPlugin() {
        return p.getPlugin();
    }
}
