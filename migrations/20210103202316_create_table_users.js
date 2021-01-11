
exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
      table.increments('id').primary()
      table.string('name').notNull()
      table.string('agencia').notNull().unique()
      table.string('conta').notNull()
      table.decimal('saldo', 10, 2).defaultTo(0)
      table.string('password').notNull()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users')
};
