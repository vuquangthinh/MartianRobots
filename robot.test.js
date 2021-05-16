const execute = require('./robot');

describe('turn left', () => {
  test('orientation is West', () => {
    const position = execute([5, 3], [1,1,'W'], 'L');
    expect(position.join(' ')).toBe('1 1 S');
  });

  test('orientation is East', () => {
    const position = execute([5, 3], [1,1,'E'], 'L');
    expect(position.join(' ')).toBe('1 1 N');
  });

  test('orientation is South', () => {
    const position = execute([5, 3], [1,1,'S'], 'L');
    expect(position.join(' ')).toBe('1 1 E');
  });

  test('orientation is North', () => {
    const position = execute([5, 3], [1,1,'N'], 'L');
    expect(position.join(' ')).toBe('1 1 W');
  });
});

describe('turn right', () => {
  test('orientation is West', () => {
    const position = execute([5, 3], [1,1,'W'], 'R');
    expect(position.join(' ')).toBe('1 1 N');
  });

  test('orientation is East', () => {
    const position = execute([5, 3], [1,1,'E'], 'R');
    expect(position.join(' ')).toBe('1 1 S');
  });

  test('orientation is South', () => {
    const position = execute([5, 3], [1,1,'S'], 'R');
    expect(position.join(' ')).toBe('1 1 W');
  });

  test('orientation is North', () => {
    const position = execute([5, 3], [1,1,'N'], 'R');
    expect(position.join(' ')).toBe('1 1 E');
  });
});


describe('forward', () => {
  test('orientation is West', () => {
    const position = execute([5, 3], [1,1,'W'], 'F');
    expect(position.join(' ')).toBe('0 1 W');
  });

  test('orientation is East', () => {
    const position = execute([5, 3], [1,1,'E'], 'F');
    expect(position.join(' ')).toBe('2 1 E');
  });

  test('orientation is South', () => {
    const position = execute([5, 3], [1,1,'S'], 'F');
    expect(position.join(' ')).toBe('1 0 S');
  });

  test('orientation is North', () => {
    const position = execute([5, 3], [0, 0,'N'], 'F');
    expect(position.join(' ')).toBe('0 1 N');
  });
});

describe('bounds', () => {
  test('can move up to north', () => {
    const position = execute([5, 3], [0, 2, 'N'], 'F');
    expect(position.join(' ')).toBe('0 3 N');
  });

  test('lost when exceedes north boundary', () => {
    const position = execute([5, 3], [0, 3, 'N'], 'F');
    expect(position.join(' ')).toBe('0 3 N LOST');
  });

  test('lost when exceedes east boundary', () => {
    const position = execute([5, 3], [5, 0, 'E'], 'F');
    expect(position.join(' ')).toBe('5 0 E LOST');
  });

  test('lost when exceedes west boundary', () => {
    const position = execute([5, 3], [0, 0, 'W'], 'F');
    expect(position.join(' ')).toBe('0 0 W LOST');
  });

  test('cannot turn left once it is lost', () => {
    const position = execute([5, 4], [0, 0, 'W'], 'FL');
    expect(position.join(' ')).toBe('0 0 W LOST');
  });

  test('robot cannot move forward once it is lost', () => {
    const position = execute([5,4], [0, 0, 'W'], 'FF');
    expect(position.join(' ')).toBe('0 0 W LOST');
  });

  test('robot cannot turn right once it is lost', () => {
    const position = execute([5,4], [0, 0, 'W'], 'FR');
    expect(position.join(' ')).toBe('0 0 W LOST');
  });
});