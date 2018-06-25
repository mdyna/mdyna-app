export default function unNest(object, properties) {
  const propsArray = properties.split('.');
  let result;
  for (let i = 0; i < propsArray.length; i += 1) {
    const prop = propsArray[i];
    if (object[prop]) {
      result = object[prop];
    }
    if (result[prop]) {
      result = result[prop];
    }
  }
  return result;
}
