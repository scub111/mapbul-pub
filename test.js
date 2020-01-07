const t0 = new Date();
let t = 0;
for (let i = 0; i < 1000000000; i++) {
	t++;
}
console.log(t);
const diff = new Date() - t0;
console.log(diff + ' ms');