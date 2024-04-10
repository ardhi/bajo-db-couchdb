import getRecord from './get.js'

async function create ({ schema, body, options = {} } = {}) {
  const { getInfo } = this.bajoDb.helper
  const { instance } = await getInfo(schema)
  const { noResult } = options
  const bodyId = body.id
  delete body.id
  const coll = instance.client.use(schema.collName)
  await coll.insert(body, bodyId)
  if (noResult) return
  return await getRecord.call(this, { schema, id: bodyId })
}

export default create
