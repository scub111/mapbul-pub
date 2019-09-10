"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_root_path_1 = __importDefault(require("app-root-path"));
const utils_1 = require("../common/utils");
console.log('test');
const srcDir = `${app_root_path_1.default.path}/src`;
const distDir = `${app_root_path_1.default.path}/dist4`;
utils_1.copyFileSync(`${srcDir}/server/views/api.hbs`, `${distDir}/api.hbs`);
//# sourceMappingURL=buildServer.js.map