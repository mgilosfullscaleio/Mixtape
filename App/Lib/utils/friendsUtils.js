const countMarked = list =>
  list.reduce((total, current) => (current.marked ? total + 1 : total), 0);

export default { countMarked };
