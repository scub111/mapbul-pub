import * as childProcess from 'child_process';

export const runSync = (command: string) => {
  return childProcess.execSync(command).toString();
};

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
};
