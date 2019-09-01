const fs = require('fs')
const path = require('path')
var currDir = path.dirname(fs.realpathSync(__filename))
var env = process.env.NODE_ENV
console.log(process.env.NODE_ENV);
const fileExists = filePath => {
  try {
    return fs.statSync(filePath).isFile()
  } catch (err) {
    return false
  }
}

if (env) {
  var currEnv = path.join(currDir, `.env`)
  var envPath = path.join(currDir, `.env.${env}`)
  if (fileExists(currEnv)) {
    fs.unlinkSync(currEnv)
  }
  if (fileExists(envPath)) {
    fs.createReadStream(envPath).pipe(fs.createWriteStream('.env'))
  }
}

console.log(process.env.NODE_ENV);
