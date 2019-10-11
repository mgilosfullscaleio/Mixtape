const mergeArrays = (arrayOfArrays = []) =>
  arrayOfArrays.reduce((array, current) => [...array, ...current], []);

export default { mergeArrays };
