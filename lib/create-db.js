async function createDb ({ instance, schema, connection }) {
  const { log, importPkg } = this.bajo.helper
  const { map, filter } = await importPkg('lodash-es')
  try {
    await instance.client.db.create(schema.collName)
    const coll = instance.client.use(schema.collName)
    const fields = map(filter(schema.properties, p => !!p.index), 'name')
    if (fields.length > 0) {
      await coll.createIndex({
        index: { fields }
      })
    }
    log.trace('Model \'%s@%s\' successfully built on the fly', schema.name, connection.name)
  } catch (err) {
    log.error('Error on \'%s\': %s', connection.name, err.message)
  }
}

export default createDb
