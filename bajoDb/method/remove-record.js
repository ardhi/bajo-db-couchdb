import getRecord from './get-record.js'

async function removeRecord ({ schema, id, options = {} } = {}) {
  const { getInfo } = this.bajoDb.helper
  const { instance } = await getInfo(schema)
  const { thrownNotFound = true } = options
  const rec = await getRecord.call(this, { schema, id, options: { thrownNotFound } })
  const coll = instance.client.use(schema.collName)
  await coll.destroy(id, rec._rev)
  return rec
}

export default removeRecord
