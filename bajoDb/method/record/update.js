import getRecord from './get.js'

async function update ({ schema, id, body, options } = {}) {
  const { importPkg } = this.bajo.helper
  const { noResult } = options
  const { getInfo } = this.bajoDb.helper
  const { merge, omit } = await importPkg('lodash-es')
  const { instance } = await getInfo(schema)
  const old = noResult ? undefined : await getRecord.call(this, { schema, id, options: { thrownNotFound: true } })
  const coll = instance.client.use(schema.collName)
  await coll.insert(merge({ _id: id, _rev: old.data._rev }, omit(old.data, ['_id', '_rev']), body))
  if (noResult) return
  const result = await getRecord.call(this, { schema, id, options: { thrownNotFound: true } })
  return { oldData: old.data, oldRev: old.rev, data: result.data, rev: result.rev }
}

export default update
