import create from './create.js'
import drop from './drop.js'

async function clear ({ schema, options = {} } = {}) {
  await drop.call(this, schema)
  await create.call(this, schema)
  return true
}

export default clear
