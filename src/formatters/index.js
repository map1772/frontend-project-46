import stylish from './stylish.js';

const getFormatter = (format) => {
  switch (format) {
    case 'stylish':
      return stylish;
    default:
      throw new Error(`Unknown format: ${format}`);
  }
};

export default getFormatter;
