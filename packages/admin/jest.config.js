module.exports = {
   "roots": [
      "<rootDir>/src"
   ],
   "transform": {
      "^.+\\.tsx?$": "ts-jest"
   },
   //"testRegex": "(/__tests23__/.*|(\\.|/)(test|spec))\\.tsx?$",
   //"testRegex": "/__tests__/render/app/components/Posts/.*",
   "testRegex": "/__tests__/auto/.*",
   //"testRegex": "/__tests__/render/app/container/.*",
   //"testRegex": "/__tests__/.*",
   "moduleFileExtensions": [
      "ts",
      "tsx",
      "js",
      "jsx",
      "json",
      "node"
   ],
   "moduleNameMapper": {
      "src/(.*)": "<rootDir>/src/$1",
      "app/(.*)": "<rootDir>/src/app/$1",
      "\\.(css|less)$": "identity-obj-proxy"
   }
}
