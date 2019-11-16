const scub111_common = require("scub111-common");

const port = process.env.PORT || 3000;
const output = scub111_common.runSync(`next start -p ${port}`);
console.log(output);