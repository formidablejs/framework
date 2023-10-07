const { existsSync } = require('fs-extra')
const { join } = require('path')

const getExt = () => {
  const appPackage = join(process.cwd(), 'package.json')

  if (!existsSync(appPackage)) {
    return '.imba'
  }

  return (require(appPackage).language || 'imba').toLowerCase() == 'typescript' ?
    '.ts' :
    '.imba'
}

module.exports = { getExt }
