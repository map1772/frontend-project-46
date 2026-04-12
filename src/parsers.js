import fs from 'fs';
import path from 'path';

const getAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);

const readFile = (filepath) => fs.readFileSync(getAbsolutePath(filepath), 'utf-8');

const parse = (filepath) => {
  const data = readFile(filepath);
  const ext = path.extname(filepath);

  if (ext === '.json') {
    return JSON.parse(data);
  }

  throw new Error(`Unknown file extension: ${ext}`);
};

export default parse;
