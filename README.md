# concat-spread-vs-array-concat

A benchmark comparing the performance of Array#concat to concatenation via the spread operator (`[...a, ...b]`).

## Results

> Results performed on a 2023 MacBook Pro running macOS with an Apple M3 Pro chip.

`Array#concat` is faster for _most arrays_ (length > 100) in Node and Deno, except for the very small arrays with double/single digit elements. For Bun, `Array#concat` is also faster in most cases, except for very large arrays with more than 50,000 elements.

### Deno

_Version: Deno 2.6.10 (v8 v14.5.201.2)_

Array#concat faster for arrays with more than 100 elements, with the spread operator being just a bit faster for the smallest of arrays.

<details>
    <summary>Full results</summary>

```
$ deno src/quickbench.js
┌───────┬─────────────────────┬─────────┬───────────────────┬───────────┬─────────┐
│ (idx) │ Task Name           │ ops/sec │ Average Time (ns) │ Margin    │ Samples │
├───────┼─────────────────────┼─────────┼───────────────────┼───────────┼─────────┤
│     0 │ "Array#concat"      │ "1,912" │ 522786.654127485  │ "±0.53%"  │ 957     │
│     1 │ "<spread operator>" │ "182"   │ 5473694.440860218 │ "±11.55%" │ 93      │
└───────┴─────────────────────┴─────────┴───────────────────┴───────────┴─────────┘
Fastest function for resource 'array of size 1000000' was 'Array#concat'.
┌───────┬─────────────────────┬──────────┬───────────────────┬──────────┬─────────┐
│ (idx) │ Task Name           │ ops/sec  │ Average Time (ns) │ Margin   │ Samples │
├───────┼─────────────────────┼──────────┼───────────────────┼──────────┼─────────┤
│     0 │ "Array#concat"      │ "14,610" │ 68443.56515193079 │ "±2.30%" │ 7306    │
│     1 │ "<spread operator>" │ "5,768"  │ 173348.2055459275 │ "±2.18%" │ 2885    │
└───────┴─────────────────────┴──────────┴───────────────────┴──────────┴─────────┘
Fastest function for resource 'array of size 50000' was 'Array#concat'.
┌───────┬─────────────────────┬──────────┬────────────────────┬──────────┬─────────┐
│ (idx) │ Task Name           │ ops/sec  │ Average Time (ns)  │ Margin   │ Samples │
├───────┼─────────────────────┼──────────┼────────────────────┼──────────┼─────────┤
│     0 │ "Array#concat"      │ "47,966" │ 20847.810498667142 │ "±4.11%" │ 23984   │
│     1 │ "<spread operator>" │ "30,369" │ 32928.25426407616  │ "±2.72%" │ 15185   │
└───────┴─────────────────────┴──────────┴────────────────────┴──────────┴─────────┘
Fastest function for resource 'array of size 10000' was 'Array#concat'.
┌───────┬─────────────────────┬─────────────┬───────────────────┬──────────┬─────────┐
│ (idx) │ Task Name           │ ops/sec     │ Average Time (ns) │ Margin   │ Samples │
├───────┼─────────────────────┼─────────────┼───────────────────┼──────────┼─────────┤
│     0 │ "Array#concat"      │ "1,323,963" │ 755.3080657781996 │ "±0.68%" │ 661982  │
│     1 │ "<spread operator>" │ "314,455"   │ 3180.102825196909 │ "±1.64%" │ 157228  │
└───────┴─────────────────────┴─────────────┴───────────────────┴──────────┴─────────┘
Fastest function for resource 'array of size 1000' was 'Array#concat'.
┌───────┬─────────────────────┬─────────────┬───────────────────┬──────────┬─────────┐
│ (idx) │ Task Name           │ ops/sec     │ Average Time (ns) │ Margin   │ Samples │
├───────┼─────────────────────┼─────────────┼───────────────────┼──────────┼─────────┤
│     0 │ "Array#concat"      │ "7,049,009" │ 141.8638954972576 │ "±0.14%" │ 3524505 │
│     1 │ "<spread operator>" │ "3,094,166" │ 323.1887874221444 │ "±0.32%" │ 1547084 │
└───────┴─────────────────────┴─────────────┴───────────────────┴──────────┴─────────┘
Fastest function for resource 'array of size 100' was 'Array#concat'.
┌───────┬─────────────────────┬──────────────┬───────────────────┬──────────┬─────────┐
│ (idx) │ Task Name           │ ops/sec      │ Average Time (ns) │ Margin   │ Samples │
├───────┼─────────────────────┼──────────────┼───────────────────┼──────────┼─────────┤
│     0 │ "<spread operator>" │ "14,617,189" │ 68.4126029695764  │ "±0.48%" │ 7308595 │
│     1 │ "Array#concat"      │ "11,949,587" │ 83.6848977552155  │ "±0.39%" │ 5974794 │
└───────┴─────────────────────┴──────────────┴───────────────────┴──────────┴─────────┘
Fastest function for resource 'array of size 10' was '<spread operator>'.
```

</details>

### Node.js

_Version: Node.js v25.7.0 (v8 v14.1.146.11)_

(Similar results to Deno, both are using v8@v14).
Array#concat faster for arrays with more than 100 elements, with the spread operator being just a bit faster for the smallest of arrays.

<details>
    <summary>Full results</summary>

```
$ node src/quickbench.js
┌─────────┬─────────────────────┬─────────┬───────────────────┬──────────┬─────────┐
│ (index) │ Task Name           │ ops/sec │ Average Time (ns) │ Margin   │ Samples │
├─────────┼─────────────────────┼─────────┼───────────────────┼──────────┼─────────┤
│ 0       │ 'Array#concat'      │ '535'   │ 1866045.089219327 │ '±3.09%' │ 269     │
│ 1       │ '<spread operator>' │ '132'   │ 7524654.253731346 │ '±9.09%' │ 67      │
└─────────┴─────────────────────┴─────────┴───────────────────┴──────────┴─────────┘
Fastest function for resource 'array of size 1000000' was 'Array#concat'.
┌─────────┬─────────────────────┬──────────┬────────────────────┬──────────┬─────────┐
│ (index) │ Task Name           │ ops/sec  │ Average Time (ns)  │ Margin   │ Samples │
├─────────┼─────────────────────┼──────────┼────────────────────┼──────────┼─────────┤
│ 0       │ 'Array#concat'      │ '10,938' │ 91416.48886048442  │ '±4.79%' │ 5476    │
│ 1       │ '<spread operator>' │ '3,637'  │ 274932.41726223356 │ '±5.07%' │ 1819    │
└─────────┴─────────────────────┴──────────┴────────────────────┴──────────┴─────────┘
Fastest function for resource 'array of size 50000' was 'Array#concat'.
┌─────────┬─────────────────────┬──────────┬────────────────────┬──────────┬─────────┐
│ (index) │ Task Name           │ ops/sec  │ Average Time (ns)  │ Margin   │ Samples │
├─────────┼─────────────────────┼──────────┼────────────────────┼──────────┼─────────┤
│ 0       │ 'Array#concat'      │ '41,110' │ 24324.394142829773 │ '±6.22%' │ 20556   │
│ 1       │ '<spread operator>' │ '24,151' │ 41405.723583966625 │ '±5.30%' │ 12076   │
└─────────┴─────────────────────┴──────────┴────────────────────┴──────────┴─────────┘
Fastest function for resource 'array of size 10000' was 'Array#concat'.
┌─────────┬─────────────────────┬─────────────┬────────────────────┬──────────┬─────────┐
│ (index) │ Task Name           │ ops/sec     │ Average Time (ns)  │ Margin   │ Samples │
├─────────┼─────────────────────┼─────────────┼────────────────────┼──────────┼─────────┤
│ 0       │ 'Array#concat'      │ '1,406,089' │ 711.19213706122    │ '±0.58%' │ 703045  │
│ 1       │ '<spread operator>' │ '313,070'   │ 3194.1681721784043 │ '±2.42%' │ 156536  │
└─────────┴─────────────────────┴─────────────┴────────────────────┴──────────┴─────────┘
Fastest function for resource 'array of size 1000' was 'Array#concat'.
┌─────────┬─────────────────────┬─────────────┬────────────────────┬──────────┬─────────┐
│ (index) │ Task Name           │ ops/sec     │ Average Time (ns)  │ Margin   │ Samples │
├─────────┼─────────────────────┼─────────────┼────────────────────┼──────────┼─────────┤
│ 0       │ 'Array#concat'      │ '7,169,301' │ 139.48359701305955 │ '±1.13%' │ 3584652 │
│ 1       │ '<spread operator>' │ '3,321,003' │ 301.1137939008227  │ '±3.15%' │ 1660502 │
└─────────┴─────────────────────┴─────────────┴────────────────────┴──────────┴─────────┘
Fastest function for resource 'array of size 100' was 'Array#concat'.
┌─────────┬─────────────────────┬──────────────┬───────────────────┬──────────┬─────────┐
│ (index) │ Task Name           │ ops/sec      │ Average Time (ns) │ Margin   │ Samples │
├─────────┼─────────────────────┼──────────────┼───────────────────┼──────────┼─────────┤
│ 0       │ '<spread operator>' │ '15,155,413' │ 65.98302164490782 │ '±2.86%' │ 7577707 │
│ 1       │ 'Array#concat'      │ '12,030,978' │ 83.11876106556262 │ '±2.29%' │ 6015490 │
└─────────┴─────────────────────┴──────────────┴───────────────────┴──────────┴─────────┘
Fastest function for resource 'array of size 10' was '<spread operator>'.
```

</details>

### Bun

_Version: Bun 1.3.9 (JavaScriptCore/WebKit)_

Showing the inverse results of Deno and Node, the spread operator is faster for arrays with more than 50,000 elements, with Array#concat being faster for the remaining arrays with less than 10,000 elements.

<details>
    <summary>Full results</summary>

```
$ bun src/quickbench.js
┌───┬───────────────────┬─────────┬────────────────────┬────────┬─────────┐
│   │ Task Name         │ ops/sec │ Average Time (ns)  │ Margin │ Samples │
├───┼───────────────────┼─────────┼────────────────────┼────────┼─────────┤
│ 0 │ <spread operator> │ 404     │ 2473878.724137933  │ ±8.73% │ 203     │
│ 1 │ Array#concat      │ 143     │ 6989439.7777777845 │ ±0.74% │ 72      │
└───┴───────────────────┴─────────┴────────────────────┴────────┴─────────┘
Fastest function for resource 'array of size 1000000' was '<spread operator>'.
┌───┬───────────────────┬─────────┬────────────────────┬────────┬─────────┐
│   │ Task Name         │ ops/sec │ Average Time (ns)  │ Margin │ Samples │
├───┼───────────────────┼─────────┼────────────────────┼────────┼─────────┤
│ 0 │ <spread operator> │ 13,962  │ 71618.3219707821   │ ±0.79% │ 6982    │
│ 1 │ Array#concat      │ 2,941   │ 339968.73351461557 │ ±0.30% │ 1471    │
└───┴───────────────────┴─────────┴────────────────────┴────────┴─────────┘
Fastest function for resource 'array of size 50000' was '<spread operator>'.
┌───┬───────────────────┬─────────┬────────────────────┬────────┬─────────┐
│   │ Task Name         │ ops/sec │ Average Time (ns)  │ Margin │ Samples │
├───┼───────────────────┼─────────┼────────────────────┼────────┼─────────┤
│ 0 │ Array#concat      │ 457,234 │ 2187.0622129490953 │ ±0.17% │ 228618  │
│ 1 │ <spread operator> │ 83,106  │ 12032.724262406662 │ ±0.91% │ 41554   │
└───┴───────────────────┴─────────┴────────────────────┴────────┴─────────┘
Fastest function for resource 'array of size 10000' was 'Array#concat'.
┌───┬───────────────────┬───────────┬────────────────────┬────────┬─────────┐
│   │ Task Name         │ ops/sec   │ Average Time (ns)  │ Margin │ Samples │
├───┼───────────────────┼───────────┼────────────────────┼────────┼─────────┤
│ 0 │ Array#concat      │ 1,143,958 │ 874.1577469315458  │ ±1.60% │ 572233  │
│ 1 │ <spread operator> │ 491,753   │ 2033.5376590730245 │ ±1.79% │ 245877  │
└───┴───────────────────┴───────────┴────────────────────┴────────┴─────────┘
Fastest function for resource 'array of size 1000' was 'Array#concat'.
┌───┬───────────────────┬────────────┬────────────────────┬────────┬─────────┐
│   │ Task Name         │ ops/sec    │ Average Time (ns)  │ Margin │ Samples │
├───┼───────────────────┼────────────┼────────────────────┼────────┼─────────┤
│ 0 │ Array#concat      │ 10,782,046 │ 92.74676870290922  │ ±1.08% │ 5391024 │
│ 1 │ <spread operator> │ 5,817,568  │ 171.89310554090133 │ ±1.21% │ 2908785 │
└───┴───────────────────┴────────────┴────────────────────┴────────┴─────────┘
Fastest function for resource 'array of size 100' was 'Array#concat'.
┌───┬───────────────────┬────────────┬───────────────────┬────────┬──────────┐
│   │ Task Name         │ ops/sec    │ Average Time (ns) │ Margin │ Samples  │
├───┼───────────────────┼────────────┼───────────────────┼────────┼──────────┤
│ 0 │ Array#concat      │ 25,028,357 │ 39.95467980774568 │ ±0.80% │ 12514179 │
│ 1 │ <spread operator> │ 22,904,617 │ 43.65931910181678 │ ±0.47% │ 11454634 │
└───┴───────────────────┴────────────┴───────────────────┴────────┴──────────┘
Fastest function for resource 'array of size 10' was 'Array#concat'.
```

</details>
