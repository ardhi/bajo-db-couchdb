async function drop ({ schema, options }) {
  const { getInfo } = this.bajoDb.helper
  const { instance } = getInfo(schema)
  await instance.client.db.destroy(schema.collName)
}

export default drop
