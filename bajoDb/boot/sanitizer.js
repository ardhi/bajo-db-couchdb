async function sanitizer (conn) {
  const { importPkg } = this.bajo.helper
  const { cloneDeep } = await importPkg('lodash-es')
  if (!conn.url) {
    conn.proto = conn.proto ?? 'http'
    conn.host = conn.host ?? 'localhost'
    conn.port = conn.port ?? 5984
  }
  return cloneDeep(conn)
}

export default sanitizer
