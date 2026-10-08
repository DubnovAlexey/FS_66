import { add, subtract, multiply } from './math.js';

const result = add(5, 3);
console.log(`Addition: ${result}`);

const result2 = subtract(10, 4);
console.log(`Subtraction: ${result2}`);

const result3 = multiply(6, 7);
console.log(`Multiplication: ${result3}`);

// app.js uses math.js
//app.js dependency on math.js

import { PI } from './math.js';
console.log(`Value of PI: ${PI}`);