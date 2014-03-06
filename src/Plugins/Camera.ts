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

/// org.apache.cordova.camera plugin:
/// https://github.com/apache/cordova-plugin-camera

module TypedPhoneGap.Camera {

    export interface Plugin {
        cleanup(onSuccess: () => void,
            onError: (message: string) => void): void;
        getPicture(cameraSuccess: (data: string) => void,
            cameraError: (message: string) => void,
            cameraOptions?: Options): PopoverHandle;
    }

    export enum DestinationType {
        DATA_URL = 0,
        FILE_URI = 1,
        NATIVE_URI = 2
    }

    export enum Direction {
        BACK = 0,
        FRONT = 1
    }

    export enum EncodingType {
        JPEG = 0,
        PNG = 1
    }

    export enum MediaType {
        PICTURE = 0,
        VIDEO = 1,
        ALLMEDIA = 2
    }

    export enum PictureSourceType {
        PHOTOLIBRARY = 0,
        CAMERA = 1,
        SAVEDPHOTOALBUM = 2
    }

    export enum PopoverArrowDirection {
        ARROW_UP = 1,
        ARROW_DOWN = 2,
        ARROW_LEFT = 4,
        ARROW_RIGHT = 8,
        ARROW_ANY = 15
    }

    export interface Options {
        quality?: number;
        destinationType?: DestinationType;
        sourceType?: PictureSourceType;
        allowEdit?: boolean;
        encodingType?: EncodingType;
        targetWidth?: number;
        targetHeight?: number;
        mediaType?: MediaType;
        correctOrientation?: boolean;
        saveToPhotoAlbum?: boolean;
        popoverOptions?: PopoverOptions;
        cameraDirection?: Direction;
    }

    export interface PopoverHandle {
        setPosition(position: PopoverOptions): void;
    }

    export interface PopoverOptions {
        x?: number;
        y?: number;
        width?: number;
        height?: number;
        arrowDir?: PopoverArrowDirection;
    }

    var p = Utility.definePlugin<Plugin>({
        id: "org.apache.cordova.camera",
        name: "TypedPhoneGap.Camera",
        def: function () {
            return Utility.field<Plugin>(navigator, "camera");
        }
    });

    export function getPlugin() {
        return p.getPlugin();
    }
}
