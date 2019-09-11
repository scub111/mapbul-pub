import appRootPath from 'app-root-path';
import { copyFileSync, removeDirSync, removeFileSync } from '../common/fileUtils';
import { runSync } from '../common/processUtils';

const main = () => {
  console.log('Build was started 2');
  const srcDir = `${appRootPath.path}/src/server`;
  const distDir = `${appRootPath.path}/dist/server`;
  console.log('Dist folder is removing...');
  removeDirSync(distDir);
  console.log('Files are copying...');
  copyFileSync(`${srcDir}/.env`, `${distDir}/.env`);
  copyFileSync(`${srcDir}/views/api.hbs`, `${distDir}/views/api.hbs`);
  copyFileSync(`${srcDir}/api.txt`, `${distDir}/api.txt`);
  console.log('Compiling...');
  const output = runSync(`tsc -p ${appRootPath.path}/tsconfig.server-build.json --diagnostics`);
  console.log(output);
  console.log('Cleaning...');
  removeFileSync(`${distDir}/tsconfig.server-build.tsbuildinfo`);
};

main();
