const config = require('../knexfile.js')
const knex = require('knex')(config)

// knex.migrate.latest([config]) // TALVEZ NAO SEJA UMA BOA IDEIA
module.exports = knex