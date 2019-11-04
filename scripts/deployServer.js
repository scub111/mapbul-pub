"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@mapbul-pub/common");
exports.deployServer = () => {
    console.log('Stoping site mapbul.pub...');
    let output = common_1.runSync(`%WINDIR%/system32/inetsrv/appcmd stop site /site.name:"mapbul.pub"`);
    console.log('Building...');
    output = common_1.runSync(`npm run server-build`);
    console.log(output);
    console.log('Starting site mapbul.pub...');
    output = common_1.runSync(`%WINDIR%/system32/inetsrv/appcmd start site /site.name:"mapbul.pub"`);
};
exports.deployServer();
