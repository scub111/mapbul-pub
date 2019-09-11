import * as childProcess from 'child_process';

export const runSync = (command: string) => {
  childProcess.execSync(command);
};

// export const runAsync = async (command: string) => {
//   return new Promise(async (resolve, reject) => {
//       const process = childProcess.spawn(command);
//       process.on('data', data => resolve(data));
//       process.on('error', err => reject(err));
//       process.on('close', err => reject(err));
//   });
// };

export const runAsync = async (command: string) => {
  const exec = childProcess.exec;
  return new Promise((resolve, reject) => {
   exec(command, (error, stdout, stderr) => {
    if (error) {
     console.warn(error);
    }
    resolve(stdout ? stdout : stderr);
   });
  });
 }