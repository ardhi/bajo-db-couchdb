async function findRecord ({ schema, filter = {}, options = {} } = {}) {
  const { importPkg } = this.bajo.helper
  const { forOwn, set } = await importPkg('lodash-es')
  const { getInfo } = this.bajoDb.helper
  const { instance } = await getInfo(schema)
  const { prepPagination } = this.bajoDb.helper
  const { limit, skip, query, sort } = await prepPagination(filter, schema)
  const selector = query ? query.toJSON() : {}
  const coll = instance.client.use(schema.collName)
  const sorts = []
  forOwn(sort, (v, k) => {
    sorts.push(set({}, k, v < 0 ? 'desc' : 'asc'))
  })
  const q = {
    selector,
    limit,
    skip,
    sort: sorts
  }
  const resp = await coll.find(q)
  return resp.docs
}

export default findRecord
