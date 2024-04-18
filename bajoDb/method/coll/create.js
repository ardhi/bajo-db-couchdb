async function create (schema) {
  const { getInfo } = this.bajoDb.helper
  const { instance } = getInfo(schema)
  await instance.client.db.create(schema.collName)
  const coll = instance.client.use(schema.collName)
  for (const p of schema.properties) {
    if (p.index || p.unique) await coll.createIndex({ index: { fields: [p.name] } })
  }
}

export default create
