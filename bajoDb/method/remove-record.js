import getRecord from './get-record.js'

async function removeRecord ({ schema, id, options = {} } = {}) {
  const { getInfo } = this.bajoDb.helper
  const { instance } = await getInfo(schema)
  const { thrownNotFound = true } = options
  const rec = await getRecord.call(this, { schema, id, options: { thrownNotFound, dataOnly: false } })
  const coll = instance.client.use(schema.collName)
  await coll.destroy(id, rec._rev)
  return { old: rec.data, oldRev: rec.rev }
}

export default removeRecord
