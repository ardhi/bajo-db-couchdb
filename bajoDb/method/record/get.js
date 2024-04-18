async function get ({ schema, id, options = {} } = {}) {
  const { error } = this.bajo.helper
  const { getInfo } = this.bajoDb.helper
  const { instance } = getInfo(schema)
  const { thrownNotFound } = options
  const coll = instance.client.use(schema.collName)
  let result
  try {
    result = await coll.get(id)
  } catch (err) {
    if (thrownNotFound) throw error('Record \'%s@%s\' not found!', id, schema.name, { statusCode: 404 })
    throw err
  }
  return { data: result, rev: result ? result._rev : null }
}

export default get
