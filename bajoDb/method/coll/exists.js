async function exists ({ schema, options }) {
  const { getInfo } = this.app.bajoDb
  const { instance } = getInfo(schema)
  try {
    await instance.client.db.get(schema.collName)
  } catch (err) {
    if (err.statusCode === 404) return false
  }
  return true
}

export default exists
