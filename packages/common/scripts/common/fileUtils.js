"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fsExtra = __importStar(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const mkdirp_1 = __importDefault(require("mkdirp"));
exports.makeSureSync = (filePath) => {
    const dir = path_1.default.dirname(filePath);
    if (!fs_1.default.existsSync(filePath)) {
        mkdirp_1.default.sync(dir);
    }
};
exports.removeFileSync = (filePath) => {
    if (fs_1.default.existsSync(filePath)) {
        fs_1.default.unlinkSync(filePath);
    }
};
exports.removeDirSync = (dirPath) => {
    fsExtra.removeSync(dirPath);
};
exports.readFileSync = (filePath) => {
    if (fs_1.default.existsSync(filePath)) {
        return fs_1.default.readFileSync(filePath, 'utf-8');
    }
};
exports.writeFileSync = (filePath, data) => {
    exports.makeSureSync(filePath);
    fs_1.default.writeFileSync(filePath, data, { encoding: 'utf8', flag: 'w' });
};
exports.appendFileSync = (filePath, data) => {
    exports.makeSureSync(filePath);
    fs_1.default.appendFileSync(filePath, data, { encoding: 'utf8' });
};
exports.copyFileSync = (source, destination, flags) => {
    exports.makeSureSync(destination);
    fs_1.default.copyFileSync(source, destination, flags);
};
//# sourceMappingURL=fileUtils.js.map