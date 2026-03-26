import { Bench } from "@uncenter/quickbench";

const bench = new Bench();

bench
	.addFunction("<spread operator>", function (input) {
		return [...input.a, ...input.b];
	})
	.addFunction("Array#concat", function (input) {
		return input.a.concat(input.b);
	});

for (let increment of [10, 100, 1_000, 10_000, 50_000, 1_000_000]) {
	let arr1 = Array.from({length: increment}, (_, i) => i + 1);
	let arr2 = arr1.map((x) => x * 2);
	bench.addResource("array of size " + increment, { a: arr1, b: arr2 });
}

bench.run();
