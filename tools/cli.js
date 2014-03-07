var fs = require('fs');

function Task(f) {
    this.start = f;
    this.then = function (task) {
        return Task.define(function (onOk, onError) {
            f(function () { task.start(onOk, onError); }, onError);
        });
    }
}

Task.pure = function (v) {
    return Task.define(function (onOk, onError) {
        onOk(v);
    });
}

Task.chain = function (tasks) {
    var t = Task.pure(null);
    for (var i = 0; i < tasks.length; i++) {
        t = t.then(tasks[i]);
    }
    return t;
}

Task.define = function (f) {
    return new Task(f);
}

function copyFile(source, target) {
    return Task.define(function (onOk, onError) {
        console.log("==> writing " + target);
        var cbCalled = false;
        var rd = fs.createReadStream(source);
        rd.on("error", function(err) { done(err); });
        var wr = fs.createWriteStream(target);
        wr.on("error", function(err) { done(err); });
        wr.on("close", function(ex) { done(); });
        rd.pipe(wr);
        function done(err) {
            if (!cbCalled) {
                if (err) { onErr(err); } else { onOk(); }
                cbCalled = true;
            }
        }
    });
}

function makeDir(path) {
    return Task.define(function (onOk, onError) {
        fs.exists(path, function (y) {
            if (y) {
                onOk();
            } else {
                console.log("==> mkdir " + path);
                fs.mkdir(path, function () {
                    onOk();
                });
            }
        });
    });
}

function install() {
    var src = __dirname + "/../build";
    function ok() {
        console.log("==> DONE");
    }
    function err() {
        console.log("==> STOPPED");
    }
    Task.chain([
        makeDir("www"),
        makeDir("www/js"),
        makeDir("www/typings"),
        copyFile(src + "/TypedPhoneGap.d.ts", "www/typings/TypedPhoneGap.d.ts"),
        copyFile(src + "/TypedPhoneGap.js", "www/js/TypedPhoneGap.js"),
        copyFile(src + "/TypedPhoneGap.min.js",  "www/js/TypedPhoneGap.min.js")
    ]).start(ok, err);   
}

function usage() {
    console.log("USAGE: typedphonegap install");
}

function main(argv) {
    if ((argv.length >= 3) && argv[2] == "install") {
        install();
    } else {
        usage();
    }
}

main(process.argv);

