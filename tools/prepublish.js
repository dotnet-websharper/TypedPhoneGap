var fs = require("fs");
var proc = require("child_process");
var u = require("uglify-js");

function compile(k) {
    console.log("==> COMPILING");
    proc.exec("tsc src/TypedPhoneGap.ts -d --out build/TypedPhoneGap.js",
              function (error, stdout, stderr) {
                  if (stdout) {
                      console.log(stdout);
                  }
                  if (stderr) {
                      console.log(stderr);
                  }
                  if (error !== null) {
                      console.log('exec error: ' + error);
                  } else {
                      console.log("==> COMPILED OK");
                      k();
                  }
              }); 
}

function compress(k) {
    console.log("==> COMPRESSING");
    var code = u.minify("build/TypedPhoneGap.js").code;
    fs.writeFile("build/TypedPhoneGap.min.js", code, function (err) {
        if (err) {
            onsole.log(err);
        } else {
            console.log("==> COMPRESSED OK");
            k();
        }
    });
}

compile(function () {
    compress(function () {
        console.log("==> DONE");
    });
});
