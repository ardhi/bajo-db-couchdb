async function drop (schema) {
  const { getInfo } = this.bajoDb.helper
  const { instance } = await getInfo(schema)
  await instance.client.db.destroy(schema.collName)
}

export default drop
