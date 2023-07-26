import nano from 'nano'
import createDb from '../../lib/create-db.js'
import collExists from '../method/coll-exists.js'

async function instantiation ({ connection, schemas, noRebuild }) {
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
    const exists = await collExists.call(this, schema)
    if (exists) continue
    try {
      await createDb.call(this, { instance, schema, connection })
    } catch (err) {
      log.error('Error on \'%s\': %s', connection.name, err.message)
    }
  }
}

export default instantiation
