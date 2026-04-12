import _ from 'lodash';

const indent = (depth, shifter = 0) => ' '.repeat(depth * 4 - shifter);

const stringify = (value, depth) => {
  if (!_.isPlainObject(value)) {
    return String(value);
  }

  const lines = Object.entries(value).map(
    ([key, val]) => `${indent(depth + 1)}${key}: ${stringify(val, depth + 1)}`,
  );

  return `{\n${lines.join('\n')}\n${indent(depth)}}`;
};

const formatStylish = (diff, depth = 1) => {
  const lines = diff.map((node) => {
    switch (node.type) {
      case 'nested':
        return `${indent(depth)}${node.key}: {\n${formatStylish(node.children, depth + 1)}\n${indent(depth)}}`;
      case 'added':
        return `${indent(depth, 2)}+ ${node.key}: ${stringify(node.value, depth)}`;
      case 'removed':
        return `${indent(depth, 2)}- ${node.key}: ${stringify(node.value, depth)}`;
      case 'changed':
        return `${indent(depth, 2)}- ${node.key}: ${stringify(node.value1, depth)}\n${indent(depth, 2)}+ ${node.key}: ${stringify(node.value2, depth)}`;
      case 'unchanged':
        return `${indent(depth)}${node.key}: ${stringify(node.value, depth)}`;
      default:
        throw new Error(`Unknown type: ${node.type}`);
    }
  });

  return lines.join('\n');
};

export default (diff) => `{\n${formatStylish(diff)}\n}`;
