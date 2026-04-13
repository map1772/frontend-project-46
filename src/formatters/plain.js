import _ from 'lodash'

const formatValue = value => {
  if (_.isPlainObject(value)) {
    return '[complex value]'
  }
  if (typeof value === 'string') {
    return `'${value}'`
  }
  return String(value)
}

const formatPlain = (diff, path = '') => {
  const lines = diff
    .filter(node => node.type !== 'unchanged')
    .map(node => {
      const fullPath = path ? `${path}.${node.key}` : node.key

      switch (node.type) {
        case 'nested':
          return formatPlain(node.children, fullPath)
        case 'added':
          return `Property '${fullPath}' was added with value: ${formatValue(node.value)}`
        case 'removed':
          return `Property '${fullPath}' was removed`
        case 'changed':
          return `Property '${fullPath}' was updated. From ${formatValue(node.value1)} to ${formatValue(node.value2)}`
        default:
          throw new Error(`Unknown type: ${node.type}`)
      }
    })

  return lines.join('\n')
}

export default formatPlain
