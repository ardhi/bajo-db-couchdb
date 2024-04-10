import getRecord from './get.js'

async function remove ({ schema, id, options = {} } = {}) {
  const { getInfo } = this.bajoDb.helper
  const { noResult } = options
  const { instance } = await getInfo(schema)
  const rec = noResult ? undefined : await getRecord.call(this, { schema, id, options: { thrownNotFound: true } })
  const coll = instance.client.use(schema.collName)
  const resp = await coll.destroy(id, rec._rev)
  if (noResult) return
  return { oldData: rec.data, oldRev: rec.rev, newRev: resp._rev }
}

export default remove
