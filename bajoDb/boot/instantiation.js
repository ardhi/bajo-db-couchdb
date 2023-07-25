import nano from 'nano'
import createDb from '../../lib/create-db.js'

async function instancing ({ connection, schemas, noRebuild }) {
  const { importPkg, log } = this.bajo.helper
  const { pick } = await importPkg('lodash-es')
  this.bajoDbCouchdb.instances = this.bajoDbCouchdb.instances || []
  const instance = pick(connection, ['name', 'type'])
  let url = connection.url
  if (!url) {
    url = `${connection.proto}://`
    if (connection.user) url += `${connection.user}:${connection.password}@`
    url += `${connection.host}:${connection.port}`
  }
  instance.client = nano(url)
  this.bajoDbCouchdb.instances.push(instance)
  if (noRebuild) return
  for (const schema of schemas) {
    try {
      await instance.client.db.get(schema.collName)
    } catch (err) {
      if (err.statusCode === 404) await createDb.call(this, { instance, schema, connection })
      else log.error('Error on \'%s\': %s', connection.name, err.message)
    }
  }
}

export default instancing
