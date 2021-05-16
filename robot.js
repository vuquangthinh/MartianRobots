



function isOutSide(map, position) {
  const [ x, y ] = position;

  if (x >= 0 && x <= map[0] && y >= 0 && y <= map[1]) {
    return false;
  }
  
  return true;
}

const rules = { // direction logic
  N: {
    L: {
      x: 0,
      y: 0,
      o: 'W'
    },
    R: {
      x: 0,
      y: 0,
      o: 'E'
    },
    F: {
      x: 0,
      y: 1,
      o: 'N'
    }
  },
  E: {
    L: {
      x: 0,
      y: 0,
      o: 'N'
    },
    R: {
      x: 0,
      y: 0,
      o: 'S'
    },
    F: {
      x: 1,
      y: 0,
      o: 'E'
    }
  },
  S: {
    L: {
      x: 0,
      y: 0,
      o: 'E'
    },
    R: {
      x: 0,
      y: 0,
      o: 'W',
    },
    F: {
      x: 0,
      y: -1,
      o: 'S'
    }
  },
  W: {
    L: {
      x: 0,
      y: 0,
      o: 'S'
    },
    R: {
      x: 0,
      y: 0,
      o: 'N'
    },
    F: {
      x: -1,
      y: 0,
      o: 'W'
    }
  }
};

function next(position, instruction) {
  const [x, y, o] = position;
  return [
    x + rules[o][instruction].x,
    y + rules[o][instruction].y,
    rules[o][instruction].o
  ];
}

function execute(map, initial, instructions, scents) {
  let position = [...initial];

  for (let instruction of instructions) {
    const nextPosition = next(position, instruction);

    if (isOutSide(map, nextPosition)) {
      if (!scents) {
        position.push('LOST');
        break;
      }

      const pos = `${position[0]} ${position[1]}`;
      if (!scents.includes(pos)) {
        scents.push(pos);
        position.push('LOST');
        break;
      }

      continue; // ignore Front command
    }

    position = nextPosition;
  }

  return position;
}

module.exports = execute;