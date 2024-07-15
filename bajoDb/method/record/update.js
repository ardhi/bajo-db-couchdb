import getRecord from './get.js'

async function update ({ schema, id, body, options } = {}) {
  const { noResult } = options
  const { getInfo } = this.app.bajoDb
  const { merge, omit } = this.app.bajo.lib._
  const { instance } = getInfo(schema)
  const old = noResult ? undefined : await getRecord.call(this, { schema, id, options: { thrownNotFound: true } })
  const coll = instance.client.use(schema.collName)
  await coll.insert(merge({ _id: id, _rev: old.data._rev }, omit(old.data, ['_id', '_rev']), body))
  if (noResult) return
  const result = await getRecord.call(this, { schema, id, options: { thrownNotFound: true } })
  return { oldData: old.data, oldRev: old.rev, data: result.data, rev: result.rev }
}

export default update
