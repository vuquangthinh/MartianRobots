const robot = require('./robot');

const input = `
5 3
1 1 E
RFRFRFRF
3 2 N
FRRFLLFFRRFLL
0 3 W
LLFFFLFLFL
`.trim();

const inputs = input.split('\n');
const map = inputs[0].split(' ').map(s => parseInt(s));

const outputs = [];
const scents = [];
for (let i = 1; i < inputs.length; i += 2) {
  const [x, y, t] = inputs[i].split(' ');
  const ins = inputs[i + 1];

  const res = robot(map, [ parseInt(x), parseInt(y), t], ins, scents);

  outputs.push(res);
}

// OUTPUT
console.log(outputs.map(s => s.join(' ')).join('\n'));