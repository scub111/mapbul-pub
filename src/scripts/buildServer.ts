import appRootPath from 'app-root-path';
import { copyFileSync, removeDirSync } from '../common/fileUtils';
import { runSync, runAsync } from '../common/processUtils';

const bootstrap = async () => {
  console.log('Build was started');
  const srcDir = `${appRootPath.path}/src`;
  const distDir = `${appRootPath.path}/dist`;
  console.log('Dist folder is removing...');
  removeDirSync(distDir);
  console.log('Files are copying...');
  copyFileSync(`${srcDir}/server/views/api.hbs`, `${distDir}/api.hbs`);
  // const output = await runAsync('npm -v');
  console.log('Compiling...');
  const output = await runAsync(`tsc -p ${appRootPath.path}/tsconfig.server-build.json --diagnostics`);
  console.log(output);
};

bootstrap();
