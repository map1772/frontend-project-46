import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const getAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);

const readFile = (filepath) => fs.readFileSync(getAbsolutePath(filepath), 'utf-8');

const getFormat = (filepath) => path.extname(filepath).slice(1);

const parse = (data, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
    case 'yaml':
      return yaml.load(data);
    default:
      throw new Error(`Unknown format: ${format}`);
  }
};

const getData = (filepath) => {
  const data = readFile(filepath);
  const format = getFormat(filepath);
  return parse(data, format);
};

export default getData;
