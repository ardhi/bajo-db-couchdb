async function getRecord ({ schema, id, options = {} } = {}) {
  const { error } = this.bajo.helper
  const { getInfo } = this.bajoDb.helper
  const { instance } = await getInfo(schema)
  const { thrownNotFound = true } = options
  const coll = instance.client.use(schema.collName)
  let result
  try {
    result = await coll.get(id)
  } catch (err) {
    if (thrownNotFound) throw error('Record \'%s@%s\' not found!', id, schema.name)
  }
  return result
}

export default getRecord
