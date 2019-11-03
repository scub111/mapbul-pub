"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_root_path_1 = __importDefault(require("app-root-path"));
const common_1 = require("@mapbul-pub/common");
exports.deployServer = () => {
    console.log('Stoping site...');
    let output = common_1.runSync(`%WINDIR%/system32/inetsrv/appcmd stop site /site.name:"mapbul.pub"`);
    console.log('Building...');
    output = common_1.runSync(`npm run server-build`);
    console.log(output);
    console.log('Copying Web.config...');
    common_1.copyFileSync(`${app_root_path_1.default.path}/iis/Web.config`, `${app_root_path_1.default.path}/Web.config`);
    console.log('Starting site...');
    output = common_1.runSync(`%WINDIR%/system32/inetsrv/appcmd start site /site.name:"mapbul.pub"`);
};
exports.deployServer();
