import getRecord from './get-record.js'

async function updateRecord ({ schema, id, body, options } = {}) {
  const { importPkg } = this.bajo.helper
  const { getInfo } = this.bajoDb.helper
  const { merge, omit } = await importPkg('lodash-es')
  const { instance } = await getInfo(schema)
  const { thrownNotFound = true } = options
  const old = await getRecord.call(this, { schema, id, options: { thrownNotFound } })
  const coll = instance.client.use(schema.collName)
  await coll.insert(merge({ _id: old._id, _rev: old._rev }, omit(old, ['_id', '_rev']), body))
  const result = await getRecord.call(this, { schema, id, options: { thrownNotFound } })
  return { old, new: result }
}

export default updateRecord
