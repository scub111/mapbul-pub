import fs from 'fs-extra';
import appRootPath from 'app-root-path';

console.log('test');
const srcDir = `${appRootPath.path}/src`;
const distDir = `${appRootPath.path}/dist3`;
fs.copyFileSync(`${srcDir}/server/views/api.hbs`, `${distDir}/api.hbs`);
