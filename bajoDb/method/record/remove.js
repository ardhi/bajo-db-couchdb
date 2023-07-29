import getRecord from './get.js'

async function remove ({ schema, id, options = {} } = {}) {
  const { getInfo } = this.bajoDb.helper
  const { instance } = await getInfo(schema)
  const rec = await getRecord.call(this, { schema, id, options: { thrownNotFound: true } })
  const coll = instance.client.use(schema.collName)
  const resp = await coll.destroy(id, rec._rev)
  return { old: rec.data, oldRev: rec.rev, newRev: resp._rev }
}

export default remove
