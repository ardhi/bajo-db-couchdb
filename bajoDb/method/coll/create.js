async function create (schema) {
  const { getInfo } = this.bajoDb.helper
  const { instance } = await getInfo(schema)
  await instance.client.db.create(schema.collName)
}

export default create
