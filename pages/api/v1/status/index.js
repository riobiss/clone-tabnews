import database from "infra/database.js"

async function status(request, response) {
  const updatedAt = new Date().toISOString()

  const databaseVersion = await database.query("SHOW server_version;")
  const databaseVersionValue = databaseVersion.rows[0].server_version

  const maxConnection = await database.query("SHOW max_connections;")
  const maxConnectionValue = maxConnection.rows[0].max_connections

  const databaseOpenedConnectionResult = await database.query(
    "SELECT * FROM pg_stat_activity WHERE datname = 'local_db';"
  )

  const databaseOpenedConnectionValue =
    databaseOpenedConnectionResult.rows.length

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: databaseVersionValue,
        max_connections: parseInt(maxConnectionValue),
        opened_connections: databaseOpenedConnectionValue,
      },
    },
  })
}

export default status
