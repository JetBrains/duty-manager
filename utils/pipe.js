export default (arg, ...functions) =>
  functions.reduce((acc, fn) => fn(acc), arg)
