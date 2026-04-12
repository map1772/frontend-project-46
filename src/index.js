import _ from 'lodash';
import parse from './parsers.js';

const genDiff = (filepath1, filepath2) => {
  const data1 = parse(filepath1);
  const data2 = parse(filepath2);

  const keys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));

  const lines = keys.map((key) => {
    if (!(key in data2)) {
      return `  - ${key}: ${data1[key]}`;
    }
    if (!(key in data1)) {
      return `  + ${key}: ${data2[key]}`;
    }
    if (data1[key] === data2[key]) {
      return `    ${key}: ${data1[key]}`;
    }
    return `  - ${key}: ${data1[key]}\n  + ${key}: ${data2[key]}`;
  });

  return `{\n${lines.join('\n')}\n}`;
};

export default genDiff;
