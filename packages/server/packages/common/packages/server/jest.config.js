module.exports = {
   "roots": [
      "<rootDir>/src/__tests__"
   ],
   "transform": {
      "^.+\\.tsx?$": "ts-jest"
   },
   //"testRegex": "/__tests__/apiTests/vst-bb-rn/contracts/main.test.ts",
   "testRegex": "/__tests__/.*",
   "moduleFileExtensions": [
      "ts",
      "tsx",
      "js",
      "jsx",
   ],
   "moduleNameMapper": {
      "src/(.*)": "<rootDir>/src/$1",
      "app/(.*)": "<rootDir>/src/app/$1",
   },
}


