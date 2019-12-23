module.exports = {
   "moduleFileExtensions": [
      "js",
      "json",
      "ts"
    ],
    "rootDir": ".",
    // "testRegex": ".spec.ts$",
    "testRegex": "/src/common.controller.spec",
    "transform": {
      "^.+\\.(t|j)s$": "ts-jest"
    },
    "coverageDirectory": "../coverage",
    "testEnvironment": "node",
    "moduleNameMapper": {
      "serverSrc/(.*)": "<rootDir>/src/$1"
    }
}


