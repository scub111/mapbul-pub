"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_root_path_1 = __importDefault(require("app-root-path"));
const common_1 = require("@mapbul-pub/common");
exports.buildServer = () => {
    console.log('Start compiling...');
    // const output = common_1.runSync(`npm run prebuild`);
    // console.log(output);
    // const srcDir = `${app_root_path_1.default.path}/src`;
    // const distDir = `${app_root_path_1.default.path}/dist`;
    // console.log('Files are copying...');
    // common_1.copyFileSync(`${srcDir}/.env`, `${distDir}/.env`);
    // common_1.copyFileSync(`${srcDir}/views/api.hbs`, `${distDir}/views/api.hbs`);
    // common_1.copyFileSync(`${srcDir}/api.txt`, `${distDir}/api.txt`);
    // console.log('Cleaning...');
    // common_1.removeFileSync(`${distDir}/tsconfig.server-build.tsbuildinfo`);
};
exports.buildServer();
