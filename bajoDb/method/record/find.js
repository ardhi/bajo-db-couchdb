async function find ({ schema, filter = {}, options = {} } = {}) {
  const { importPkg } = this.bajo.helper
  const { forOwn, set, map, omit } = await importPkg('lodash-es')
  const { getInfo } = this.bajoDb.helper
  const { instance } = await getInfo(schema)
  const { prepPagination } = this.bajoDb.helper
  const { limit, skip, query, sort, page } = await prepPagination(filter, schema)
  const selector = query ?? {}
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
  const count = 0 // couchdb doesn't support this
  const revs = map(resp.docs, '_rev')
  let result = { data: resp.docs, page, limit, count, pages: Math.ceil(count / limit), revs }
  if (options.count) result = omit(result, ['count', 'pages'])
  return result
}

export default find
