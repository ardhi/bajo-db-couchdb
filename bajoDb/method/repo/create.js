async function create (schema) {
  const { getInfo } = this.bajoDb.helper
  const { instance } = await getInfo(schema)
  await instance.client.db.create(schema.repoName)
  const coll = instance.client.use(schema.repoName)
  for (const p of schema.properties) {
    if (p.index || p.unique) await coll.createIndex({ index: { fields: [p.name] } })
  }
}

export default create
