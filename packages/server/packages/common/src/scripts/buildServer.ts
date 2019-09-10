import appRootPath from 'app-root-path';
import { copyFileSync, removeDirSync } from '../common/utils';

console.log('test');
const srcDir = `${appRootPath.path}/src`;
const distDir = `${appRootPath.path}/dist`;
removeDirSync(distDir);
copyFileSync(`${srcDir}/server/views/api.hbs`, `${distDir}/api.hbs`);
