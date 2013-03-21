/// <reference path="PhoneGap.d.ts" />

import A = PhoneGap.Accelerometer;
import C = PhoneGap.Camera;

function main() {

    if (A.isAvailable()) {
        console.log("HAS Accelerometer");
    } else {
        console.log("NO Accelerometer");
    }

}
