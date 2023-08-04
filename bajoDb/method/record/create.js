import getRecord from './get.js'

async function create ({ schema, body, options = {} } = {}) {
  const { getInfo } = this.bajoDb.helper
  const { instance } = await getInfo(schema)
  const bodyId = body.id
  delete body.id
  const coll = instance.client.use(schema.repoName)
  await coll.insert(body, bodyId)
  return await getRecord.call(this, { schema, id: bodyId })
}

export default create
