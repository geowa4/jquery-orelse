#!/usr/bin/env node

var print = require("sys").print,
fs = require("fs"),
src = fs.readFileSync(process.argv[2], "utf8"),
versionTmpl = "/*\njQuery Or Else v@VERSION\n",
versionText = fs.readFileSync("version.txt", "utf8"),
licenseTmpl = "@LICENSE*/\n",
licenseText = fs.readFileSync("license.txt", "utf8")
;

versionTmpl = versionTmpl.replace("@VERSION", versionText);
licenseTmpl = licenseTmpl.replace("@LICENSE", licenseText);
src = src.replace(/\/\*\s*HEADER\s*\*\//, versionTmpl + licenseTmpl) + ";";

print(src);
