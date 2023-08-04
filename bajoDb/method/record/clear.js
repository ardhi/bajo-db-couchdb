import create from '../repo/create.js'
import drop from '../repo/drop.js'

async function clear ({ schema, options = {} } = {}) {
  await drop.call(this, schema)
  await create.call(this, schema)
  return true
}

export default clear
