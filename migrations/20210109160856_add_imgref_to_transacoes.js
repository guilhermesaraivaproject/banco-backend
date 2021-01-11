
exports.up = function(knex) {
    knex.schema.table('users', function (table) {
        table.text('imgRef');
      })
};

exports.down = function(knex) {
    knex.schema.table('users', function (table) {
        table.dropColumn('imgRef');
      })
};
