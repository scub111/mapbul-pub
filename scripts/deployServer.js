"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scub111_common_1 = require("scub111-common");
exports.deployServer = () => {
    console.log('Stoping site mapbul.pub...');
    let output = scub111_common_1.runSync(`%WINDIR%/system32/inetsrv/appcmd stop site /site.name:"mapbul.pub"`);
    console.log('Building...');
    output = scub111_common_1.runSync(`npm run build:deploy`);
    console.log(output);
    console.log('Starting site mapbul.pub...');
    output = scub111_common_1.runSync(`%WINDIR%/system32/inetsrv/appcmd start site /site.name:"mapbul.pub"`);
};
exports.deployServer();
