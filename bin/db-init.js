#!/usr/bin/env node

/* eslint-disable no-console */

const path = require('path');
const { exec } = require('child_process');

const sequelizeCliBin = path.join(__dirname, '..', 'node_modules', 'sequelize-cli', 'lib', 'sequelize');

function execShellCommand(cmd) {
  return new Promise((resolve) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.error(error);
      }

      resolve(stdout || stderr);
    });
  });
}

(async () => {
  console.log(await execShellCommand(`${sequelizeCliBin} db:create`));
  console.log(await execShellCommand(`${sequelizeCliBin} db:migrate`));
})();
