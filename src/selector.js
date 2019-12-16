const getFrom = (object, selector) => {
  // console.log(object, selector);
  if (selector.length === 0) return object;
  const [currentSelector, ...newSelector] = selector;
  return getFrom(object[currentSelector], newSelector);
};

export default getFrom;
