import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import buildDiff from './buildDiff.js';
import getFormatter from './formatters/index.js';

const readFile = (filepath) => fs.readFileSync(path.resolve(process.cwd(), filepath), 'utf-8');

const getFormat = (filepath) => path.extname(filepath).slice(1);

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = parse(readFile(filepath1), getFormat(filepath1));
  const data2 = parse(readFile(filepath2), getFormat(filepath2));
  const diff = buildDiff(data1, data2);
  const format = getFormatter(formatName);
  return format(diff);
};

export default genDiff;
