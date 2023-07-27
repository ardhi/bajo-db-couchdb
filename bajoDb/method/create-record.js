import getRecord from './get-record.js'

async function createRecord ({ schema, body, options = {} } = {}) {
  const { getInfo } = this.bajoDb.helper
  const { instance } = await getInfo(schema)
  const bodyId = body.id
  delete body.id
  const coll = instance.client.use(schema.collName)
  await coll.insert(body, bodyId)
  return await getRecord.call(this, { schema, id: bodyId, options: { dataOnly: false } })
}

export default createRecord
