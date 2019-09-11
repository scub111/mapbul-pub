"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_root_path_1 = __importDefault(require("app-root-path"));
const fileUtils_1 = require("../common/fileUtils");
const processUtils_1 = require("../common/processUtils");
const main = () => {
    console.log('Stoping site...');
    const output = processUtils_1.runSync(`%WINDIR%\system32\inetsrv\appcmd stop site /site.name:"mapbul.pub"`);
    console.log('Building...');
    output = processUtils_1.runSync(`npm run server-build`);
    console.log(output);
    console.log('Copying Web.config...');
    fileUtils_1.copyFileSync(`${app_root_path_1.default.path}/iis/Web.config`, `${app_root_path_1.default.path}/Web.config`);
    console.log('Starting site...');
    output = processUtils_1.runSync(`%WINDIR%\system32\inetsrv\appcmd start site /site.name:"mapbul.pub"`);
};
main();
//# sourceMappingURL=deployServer.js.map