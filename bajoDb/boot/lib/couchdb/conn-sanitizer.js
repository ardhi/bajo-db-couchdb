async function connSanitizer (conn) {
  const { cloneDeep } = this.app.bajo.lib._
  if (!conn.url) {
    conn.proto = conn.proto ?? 'http'
    conn.host = conn.host ?? 'localhost'
    conn.port = conn.port ?? 5984
  }
  return cloneDeep(conn)
}

export default connSanitizer
