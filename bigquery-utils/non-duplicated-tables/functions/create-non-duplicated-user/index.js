/**
 * Responds to any HTTP request.
 *
 * @param {!Object} req HTTP request context.
 * @param {!Object} res HTTP response context.
 */
exports.handler = async (req, res) => {
  const PROJECT_ID = 'YOUR_PROJECT_ID'
  const TABLE = 'User'
  const FROM_DATASET = 'duplicated'
  const TO_DATASET = 'non-duplicated'

  const TABLE_NAME = `${TABLE}${new Date().getTime()}`

  const BigQuery = require('@google-cloud/bigquery')
  const bigquery = new BigQuery({ projectId: PROJECT_ID })
  const dataset = bigquery.dataset(TO_DATASET)

  try {
    const oldTablesOptions = defineOldTablesOptions()
    const oldTables = await bigquery.query(oldTablesOptions)
    const tablesToRemove = oldTables[0]

    const createTableOptions = defineCreateTableOptions()
    await dataset.createTable(TABLE_NAME, createTableOptions)

    const insertQueryOptions = defineInsertQueryOptions()
    const result = await bigquery.query(insertQueryOptions)

    await removeTables(tablesToRemove)
    return res.status(200).send({result})
  } catch (error) {
    await removeCreatedTable()
    return res.status(400).send({error})
  }

  function defineOldTablesOptions () {
    const query = `SELECT
        table_id
      FROM
        [${PROJECT_ID}:${TO_DATASET}.__TABLES__]
      WHERE
        table_id CONTAINS "${TABLE}"`.replace(/\s+/g, ' ')

    return { query, useLegacySql: true }
  }

  function defineCreateTableOptions () {
    const schema = `user_id:INTEGER, user_ts:TIMESTAMP, user_name:STRING`.replace(/\s+/g, ' ')
    return { schema }
  }

  function defineInsertQueryOptions () {
    const query = `INSERT \`${PROJECT_ID}.${TO_DATASET}.${TABLE_NAME}\` (
        user_id:INTEGER, user_ts:TIMESTAMP, user_name:STRING
      )
      SELECT
        * EXCEPT(row_number)
      FROM (
        SELECT
          *,
          ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY user_ts DESC) row_number
        FROM
          \`${PROJECT_ID}.${FROM_DATASET}.${TABLE}\`
      )
      WHERE
        row_number = 1`.replace(/\s+/g, ' ')
    return { query, useLegacySql: false }
  }

  async function removeTables (tables) {
    for (let table of tables) {
      const bigQueryTable = dataset.table(table.table_id)
      await bigQueryTable.delete()
    }
  }

  async function removeCreatedTable () {
    const bigQueryTable = dataset.table(TABLE_NAME)
    await bigQueryTable.delete()
  }
}
