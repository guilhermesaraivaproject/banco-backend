
exports.up = function(knex) {
    return knex.schema.createTable('transacoes', table => {
        table.increments('id').primary()
        table.string('agencia')
        table.string('conta')
        table.string('nome')
        table.string('tipo').notNull()
        table.decimal('valor', 10, 2).notNull()
        table.datetime('doneAt')
        table.integer('userId').references('id').inTable('users').notNull()
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('transacoes')
};
