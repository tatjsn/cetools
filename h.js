function shouldSkip(value) {
  return value === null || value === undefined;
}

function isObjectLiteral(value) {
  return Object.getPrototypeOf(value) === Object.prototype;
}

export default new Proxy(
  {},
  {
    get(target, prop, receiver) {
      return (...args) => {
        const elem = document.createElement(prop);
        for (const arg of args) {
          if (shouldSkip(arg)) {
            // do nothing
          } else if (isObjectLiteral(arg)) {
            for (const key of Object.keys(arg)) {
              if (!shouldSkip(arg[key])) {
                elem.setAttribute(key, arg[key]);
              }
            }
          } else if (arg instanceof Node) {
            elem.appendChild(arg);
          } else {
            elem.appendChild(document.createTextNode(arg));
          }
        }
        return elem;
      };
    },
  },
);
