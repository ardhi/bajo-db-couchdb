async function exists (schema) {
  const { getInfo } = this.bajoDb.helper
  const { instance } = await getInfo(schema)
  try {
    await instance.client.db.get(schema.repoName)
  } catch (err) {
    if (err.statusCode === 404) return false
  }
  return true
}

export default exists
