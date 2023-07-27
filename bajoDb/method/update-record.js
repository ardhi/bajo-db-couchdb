import getRecord from './get-record.js'

async function updateRecord ({ schema, id, body, options } = {}) {
  const { importPkg } = this.bajo.helper
  const { getInfo } = this.bajoDb.helper
  const { merge, omit } = await importPkg('lodash-es')
  const { instance } = await getInfo(schema)
  const { thrownNotFound = true } = options
  const old = await getRecord.call(this, { schema, id, options: { thrownNotFound, dataOnly: false } })
  const coll = instance.client.use(schema.collName)
  await coll.insert(merge({ _id: old.data._id, _rev: old.data._rev }, omit(old.data, ['_id', '_rev']), body))
  const result = await getRecord.call(this, { schema, id, options: { thrownNotFound, dataOnly: false } })
  return { old: old.data, oldRev: old.rev, new: result.data, newRev: result.rev }
}

export default updateRecord
